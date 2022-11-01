/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/Url';
const router = express.Router();

router.post('/create', controller.createShortUrl);
router.get('/:urlId', controller.getShortUrl);

export = router;