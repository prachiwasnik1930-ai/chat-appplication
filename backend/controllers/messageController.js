import Message from "../models/Message.js";

// SEND MESSAGE
export const sendMessage = async (req, res) => {
  try {
    const { sender, receiver, text } = req.body;

    const message = await Message.create({
      sender,
      receiver,
      text
    });

    res.json(message);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET MESSAGES BETWEEN USERS
export const getMessages = async (req, res) => {
  try {
    const { sender, receiver } = req.query;

    const messages = await Message.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};