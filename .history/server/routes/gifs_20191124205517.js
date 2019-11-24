import express from 'express';
import fileUpload from 'express-fileupload';
import GifsController from '../controllers/gifs';
import auth from '../middlewares/auth';

const router = express.Router();

router.use(fileUpload({
  useTempFiles: true,
}));

router.post('/gifs', auth, GifsController.postGifs);
router.get('/gifs', auth, GifsController.getAllGifs);
router.get('/gifs/:gifId', auth, GifsController.getSingleGif);

module.exports = router;