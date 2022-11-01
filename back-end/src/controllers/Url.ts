import { Request, Response, NextFunction } from 'express';
import { nanoid } from 'nanoid';
import { validateUrl } from '../common/commonFunction';
import Url from '../models/Url';
require('dotenv').config()


const createShortUrl = async (req: Request, res: Response, next: NextFunction) => {
  const { origUrl } = req.body;
  const base = process.env.BASE;

  const urlId = nanoid(8);
  if (validateUrl(origUrl)) {
    try {
      let url = await Url.findOne({ origUrl });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = `${base}/${urlId}`;

        url = new Url({
          origUrl,
          shortUrl,
          urlId,
          created_at: new Date(),
        });

        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json('Server Error');
    }
  } else {
    res.status(400).json('Invalid Original Url');
  }
};

const getShortUrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const url = await Url.findOne({ urlId: req.params.urlId });
    if (url) {
      await Url.updateOne(
        {
          urlId: req.params.urlId,
        },
        { $inc: { clicks: 1 } }
      );
      return res.redirect(url.origUrl);
    } else res.status(404).json('Not found');
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error');
  }
};

export default { createShortUrl, getShortUrl };
