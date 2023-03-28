import express, { type Router, type Request, type Response } from 'express';
import handleError from '@/utils/handleError';
import { body, validationResult } from 'express-validator';
import handleMessage from '@/utils/handleMessage';

const router: Router = express.Router();

export const messageRoute = router.post(
  '/message',
  body('conversationId').isString().isLength({ min: 1 }),
  body('message').isString().isLength({ min: 2 }),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { conversationId, message } = req.body;

      return res.status(200).json({
        response_id: conversationId,
        response: handleMessage(message),
      });
    } catch (evt: unknown) {
      handleError({ evt, res });
    }
  }
);
