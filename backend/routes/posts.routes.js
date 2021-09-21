const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      //.find()
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

router.post('/post/add', async (req, res) => {
  try {
    const { title, content, price, image, status, email, phone, location, publicationDate, updateDate } = req.body;
    const newPost = new Post({ title, content, price, image, status, email, phone, location, publicationDate, updateDate });
    await newPost.save();
    res.json({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.put('/post/:id/edit', async (req, res) => {
  const { title, content, price, image, status, email, phone, location, publicationDate, updateDate } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if(post) {
      await Post.updateOne({ _id: req.params.id }, { $set: { title, content, price, image, status, email, phone, location, publicationDate, updateDate } });
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.delete('/post/:id/delete', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(post) {
      await Post.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
