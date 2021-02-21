import { videoRoutes } from './topics/videos/videos.route';
import express from 'express';

const router = express.Router();

router.use('/videos', videoRoutes);

export default router;