import { Router, RequestHandler } from 'express';
import { findPackageById } from '../controllers/package';

const router = Router();

router.get("/:_id", findPackageById as RequestHandler);
export default router;