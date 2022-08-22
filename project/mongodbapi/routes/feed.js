const router = require("express").Router();
const User = require("../models/User");
const Share = require("../models/Share");

// Create Share
router.post("/", async (req,res)=>{
    const newShare = new Share(req.body);
    try{
        const savedShare = await newShare.save();
        res.status(200).json(savedShare);
    }catch(err){
        res.status(500).json(err);
    }
});

// Delete Share
router.delete("/:id", async (req, res) => {
    try{
        const post = await Share.findById(req.params.id);
    if (post.userId === req.body.userId) {
        await post.deleteOne();
        res.status(200).json("Post deleted");
    } else {
        res.status(403).json("you can't delete this post");
    }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get a post

router.get("/:id", async (req, res) => {
    try {
      const post = await Share.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
});

//Get library
router.get("/timeline/:userId", async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.userId);
      const userPosts = await Share.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
        currentUser.fetch.map((userId) => {       // Implementation for timeline posts would be
          return Share.find({ userId: userId });  // coded and corrected here
        })
      );
      res.status(200).json(userPosts.concat(...friendPosts));
    } catch (err) {
      res.status(500).json(err);
    }
  });

//Get user's posts
 router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Share.find({ userId: user._id });
    res.status(200).json(posts);
   } catch (err) {
      res.status(500).json(err);
   }
});
  
module.exports = router;