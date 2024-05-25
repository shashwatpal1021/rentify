const cloudinary = require("../config/cloudinary");
const Property = require("../models/property.model");

const multer = require('multer');
const mongoose = require('mongoose');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json({ success: true, properties })
  } catch (error) {
    console.log("error", error)
  }
}

exports.getPropertiesById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found.' });
    }
    res.json({ success: true, property });
  } catch (error) {
    console.log("error", error)
  }
}

exports.createProperty = async (req, res) => {
  try {
    const {
      type,
      name,
      description,
      location,
      beds,
      baths,
      square_feet,
      amenities,
      rates,
      seller_info,
      images,
    } = req.body;

    const owner = req.user; // Assuming userId is available in req.user after authentication

    const propertyData = {
      type,
      name,
      description,
      location,
      beds,
      baths,
      square_feet,
      amenities,
      rates,
      seller_info,
      owner,
    };

    // If handling image uploads, you can include image upload logic here


    // console.log(propertyData)
    const newProperty = new Property(propertyData);
    await newProperty.save();
    res.status(201).json({ success: true, message: 'Property created successfully.', property: newProperty });
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};



exports.updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, name, description, location, beds, baths, square_feet, amenities, rates, seller_info, images } = req.body;
    const property = await Property.findByIdAndUpdate(id, { type, name, description, location, beds, baths, square_feet, amenities, rates, seller_info, }, { new: true });
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found.' });
    }
    res.json({ success: true, message: 'Property updated successfully.', property });
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

exports.deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findByIdAndDelete(id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found.' });
    }
    res.json({ success: true, message: 'Property deleted successfully.' });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

exports.userProperties = async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user });
    res.json({ success: true, properties })
  } catch (error) {
    console.log("error", error)
  }
}

exports.search = async (req, res) => {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");

    const locationPattern = new RegExp(location, "i");

    // Match location pattern against database fields
    let query = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { "location.street": locationPattern },
        { "location.city": locationPattern },
        { "location.state": locationPattern },
        { "location.zipcode": locationPattern },
      ],
    };

    // Only check for property if its not 'All'
    if (propertyType && propertyType !== "All") {
      const typePattern = new RegExp(propertyType, "i");
      query.type = typePattern;
    }

    const properties = await Property.find(query);

    res.json({ success: true, properties })
  } catch (error) {
    console.log("error", error)
  }
}