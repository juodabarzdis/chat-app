import Message from "../model/messageModel.js";

export const addMessage = async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;
    const newMessage = new Message({
      sender: sender,
      users: [sender, receiver],
      message: { text: message },
    });
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { sender, receiver } = req.query;
    console.log(sender, receiver);
    const messages = await Message.find({
      users: { $all: [sender, receiver] },
    });
    console.log(messages);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
