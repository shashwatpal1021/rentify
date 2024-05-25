const Message = require("../models/message.model");
exports.hello = (req, res) => {
  res.send("hello");
};

exports.getMessage = async (req, res) => {
  try {
    // const messages = await Message.find();

    const userId = req.user;

    const readMessages = await Message.find({ recipient: userId, read: true })
      .sort({ createdAt: -1 }) // Sort read messages in asc order
      .populate("sender", "username")
      .populate("property", "name");

    const unreadMessages = await Message.find({
      recipient: userId,
      read: false,
    })
      .sort({ createdAt: -1 }) // Sort read messages in asc order
      .populate("sender", "username")
      .populate("property", "name");

    const messages = [...unreadMessages, ...readMessages];
    res.json({ success: true, messages });
  } catch (error) {
    console.error("error", error);
  }
};

exports.createMessage = async (req, res) => {
  try {
    const { name, email, phone, message, property, recipient } = req.body;
    const userId = req.user;
    if (userId === recipient) {
      return new Response(
        JSON.stringify({ message: "Can not send a message to yourself" }),
        { status: 400 }
      );
    }

    const newMessage = new Message({
      sender: userId,
      recipient,
      property,
      name,
      email,
      phone,
      body: message,
    });
    await newMessage.save();
    res.json({ success: true, message: "Message sent successfully." });
  } catch (error) {
    console.error("error", error);
  }
};

exports.messageById = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findById(id);
    if (!message) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found." });
    }
    res.json({ success: true, message });
  } catch (error) {
    console.error("error", error);
  }
};

exports.deleteMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user;
    const message = await Message.findById(id);
    if (!message) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found." });
    }
    // Verify ownership
    if (message.recipient.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await message.deleteOne();
    res.json({ success: true, message: "Message deleted successfully." });
  } catch (error) {
    console.error("error", error);
  }
};
