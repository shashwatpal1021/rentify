const Property = require("../models/property.model");
const User = require("../models/user.model");
exports.getBookmarks = async (req, res) => {
  try {
    const userId = req.user;
    const user = await Property.find({ _id: userId });
    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });
    res.json({ success: true, bookmarks });
  } catch (error) {
    console.error("error", error);
  }
};

exports.createBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user;
    const property = await Property.findById(id);
    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found." });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    const isBookmarked = user.bookmarks.includes(property._id);
    if (isBookmarked) {
      return res
        .status(400)
        .json({ success: false, message: "Property already bookmarked." });
    }

    if (isBookmarked) {
      // If already bookmarked, remove it
      user.bookmarks.pull(propertyId);
      message = "Bookmark removed successfully";
      isBookmarked = false;
    } else {
      // If not bookmarked, add it
      user.bookmarks.push(propertyId);
      message = "Bookmark added successfully";
      isBookmarked = true;
    }

    await user.save();
    res.json({ success: true, message: isBookmarked });
  } catch (error) {
    console.error("error", error);
  }
};
