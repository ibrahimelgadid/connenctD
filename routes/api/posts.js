const express = require('express');
const router = express.Router();
const passport = require('passport');
// Post model
const Post = require('../../model/Post');
// Profile model
const Profile = require('../../model/Profile');

// Validation
const validatePostInput = require('../../validation/post');

const validateCommentInput = require('../../validation/comment');



// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get('/', (req, res) => {
    Post.find()
      .sort({ date: -1 })
      .then(posts => {
        res.json(posts)
      })
      .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
  });


// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
      .then(post => res.json(post))
      .catch(err =>
        res.status(404).json({ nopostfound: 'No post found with that ID' })
      );
  });


// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validatePostInput(req.body);
  
      // Check Validation
      if (!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
      }
  
      const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      });
  
      newPost.save().then(post => res.json(post));
    }
  );

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }),
(req, res) =>{
   Profile.findOne({user:req.user.id})
    .then(profile=>{
        Post.findById(req.params.id)
            .then(post=>{
                if(post.user.toString() !== req.user.id){
                   res.status(400).json('You are not authorized'); 
                }
                post.remove().then(
                    res.json({success:true})
                )
            }).catch(err=>res.status(400).json(err))
    })
})



// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post('/like/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
  Profile.findOne({user:req.user.id}).then(profile=>{
    Post.findById({_id:req.params.id}).then(post=>{
      if(post.likes.filter(like=>like.user.toString() === req.user.id).length > 0){
        post.likes.shift({user:req.user.id});
        post.save().then(post=>res.json(post));
      }else{
        if(post.dislikes.filter(dislike=>dislike.user.toString() === req.user.id).length > 0){
          post.dislikes.shift({user:req.user.id});
        }
        post.likes.unshift({user:req.user.id});
        post.save().then(post=>res.json(post));
      }
    }).catch(err=>res.status(404).json({post:'No post found'}))
  })
})



// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post('/dislike/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
  Profile.findOne({user:req.user.id}).then(profile=>{
    Post.findById({_id:req.params.id}).then(post=>{
      if(post.dislikes.filter(dislike=>dislike.user.toString() === req.user.id).length > 0){
        post.dislikes.shift({user:req.user.id});
        post.save().then(post=>res.json(post));
      }else{
        if(post.likes.filter(like=>like.user.toString() === req.user.id).length > 0){
          post.likes.shift({user:req.user.id});
        }
        post.dislikes.unshift({user:req.user.id});
        post.save().then(post=>res.json(post));
      }
    }).catch(err=>res.status(404).json({post:'No post found'}))
  })
})

// @route   POST api/posts/comment/:postId
// @desc    comment post
// @access  Private

router.post(
  '/comment/:postId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Post.findById({_id:req.params.postId},(err,post)=>{
      if(err){console.log(err)}
      const newComment = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      });
      post.comments.unshift(newComment)
  
      post.save().then(post => res.json(post))
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    })
    
  }
);



// @route   DELETE api/posts/comment/:postId/:commentId
// @desc    delete comment
// @access  Private

router.delete('/comment/:postId/:commentId',(req,res)=>{
  Post.findById(req.params.postId)
    .then(post=>{
      if(post.comments.filter(comment=>
        comment._id.toString() === req.params.commentId)
      .length === 0){
        return res
            .status(404)
            .json({ commentnotexists: 'Comment does not exist' });
      }
      const removeIndex = post.comments.map(comment=>comment._id.toString())
        .indexOf(req.params.commentId);

        post.comments.splice(removeIndex, 1)
        post.save().then(post => res.json(post))
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));

    })
})

module.exports = router;