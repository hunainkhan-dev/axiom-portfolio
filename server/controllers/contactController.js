import mongoose from 'mongoose';
import Contact from '../models/Contact.js';

const memoryStore = [];

export const createContact = async (req, res, next) => {
  try {
    const data = req.body;

    if (mongoose.connection.readyState === 1) {
      const contact = await Contact.create(data);
      return res.status(201).json({ success: true, data: contact });
    }

    const entry = { ...data, id: Date.now(), createdAt: new Date() };
    memoryStore.push(entry);
    console.log('[Contact] Received (in-memory):', entry);
    res.status(201).json({ success: true, data: entry });
  } catch (err) {
    next(err);
  }
};

export const listContacts = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const contacts = await Contact.find().sort('-createdAt');
      return res.json({ success: true, count: contacts.length, data: contacts });
    }
    res.json({ success: true, count: memoryStore.length, data: memoryStore });
  } catch (err) {
    next(err);
  }
};
