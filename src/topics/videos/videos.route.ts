import { VideosController } from './videos.controller';
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello, we\'re gonna play a game..');
})


router.post('/download', VideosController.download);

export const videoRoutes = router;
