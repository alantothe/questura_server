import { Router, RequestHandler } from 'express';
import { findLocationByName } from '../controllers/location';

const router = Router();

router.get('/:name', findLocationByName as RequestHandler);

export default router;