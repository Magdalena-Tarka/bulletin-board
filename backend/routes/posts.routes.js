const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({ status: 'active' })
      .select('title price image publicationDate')
      .sort({ publicationDate: -1 });

    if(!result) res.status(404).json({ post: 'Not found...' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id);

    if(!result) res.status(404).json({ post: 'Not found...' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;