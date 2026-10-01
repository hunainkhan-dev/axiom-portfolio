import express from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.js';
import { createContact, listContacts } from '../controllers/contactController.js';

const router = express.Router();

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Valid email is required').max(200),
  company: z.string().max(100).optional().or(z.literal('')),
  projectType: z.string().max(50).optional().or(z.literal('')),
  budget: z.string().max(50).optional().or(z.literal('')),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
});

router.post('/', validate(contactSchema), createContact);
router.get('/', listContacts);

export default router;
