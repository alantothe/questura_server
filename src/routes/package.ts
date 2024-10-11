import { Router, RequestHandler } from 'express';
import { findPackageById, createPackage } from '../controllers/package';

const router = Router();

router.get("/:_id", findPackageById as RequestHandler);
export default router;

router.post("/create", createPackage as RequestHandler);