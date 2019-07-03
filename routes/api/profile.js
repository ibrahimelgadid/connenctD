const express = require('express');
const router = express.Router();
const passport = require('passport');
const fileupload= require('express-fileupload');
const mkDir = require('mkdirp')
const fs = require('fs-extra')


const Profile = require('../../model/Profile');
const User = require('../../model/user');

const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');



// @route   Get api/profile
// @desc    Get user profile
// @access  Private

router.get('/', passport.authenticate('jwt', {session:false}), (req,res)=>{
    const errors = {};

    Profile.findOne({user:req.user.id}, (err,profile)=>{
        if(err){res.status(404).json(err)};
        if(!profile){
            (errors.profile) = 'no profile for this user';
            return res.status(404).json(errors)
        }
        res.json(profile);
    }).populate('user', 'name');
});


// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  '/',passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;


    if(req.files !== null){
      var imageFile = typeof req.files.avatar !== undefined ?req.files.avatar.name:'noimage'
      profileFields.avatar = imageFile;

    }

    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    
    // Skills - Spilt into array
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
 
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        let pimage = req.body.pimage;
        if(imageFile != ''){
          profile.avatar = imageFile
        }
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => {
          if(req.files !== null){
            if(pimage != '' || pimage!='noimage'){
              fs.remove(`public/images/${req.user._id}/${pimage}`,(err)=>{
                if(err)console.log(err);
              })
            }
  
            let UploadImage = req.files.avatar;
            let path = `public/images/${req.user._id}/${imageFile}`
            UploadImage.mv(path, (err)=>{
              if(err){console.log(err);
              }
            })}
          
          res.json(profile)
          });
      } else {

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }

          // Save Profile
          new Profile(profileFields).save().then(profile =>{
            if(req.files!== null){
              mkDir(`public/images/${req.user.id}`,(err)=>{
                if(err){res.json(err)}
              })
        
              if(imageFile != ''){
                let UploadImage = req.files.avatar;
                let path = `public/images/${req.user.id}/${imageFile}`
                UploadImage.mv(path,(err)=>{
                  if(err){res.json(err)}
                })
              }
            }
            res.json(profile)
          });
            
        });
      }
    });
  }
);


// @route   GET api/profile
// @desc    Get user profile By Handle
// @access  Public

router.get('/all',(req,res)=>{
  let errors = {};
  Profile.find({},(err,profiles)=>{
    if(err){throw err};
    if(profiles){
      res.json(profiles);
    }else{
      errors.profiles = 'no profiles yet'
      res.status(404).json(errors)
    }
    
  }).populate('user', 'name')
});

// @route   GET api/profile/:handle
// @desc    Get user profile By Handle
// @access  Public

router.get('/handle/:handle',(req,res)=>{
  let errors = {};
  Profile.findOne({handle:req.params.handle},(err,profile)=>{
    if(err){throw err};
    if(profile){
      res.json(profile);
    }else{
      errors.profiel = 'no profie for this handle'
      res.status(404).json(errors)
    }
    
  }).populate('user', 'name')
});


// @route   GET api/profile/:handle
// @desc    Get user profile By Handle
// @access  Public

router.get('/user/:user_id',(req,res)=>{
  let errors = {};
  Profile.findOne({user:req.params.user_id},(err,profile)=>{
    if(err){res.json({profile:'no profile for this user'})};
    if(profile){
      res.json(profile);
    }else{
      errors.profile = 'no profie for this user'
      res.status(404).json(errors)
    }
    
  }).populate('user', 'name')
});


// @route   POST api/profile/Experience
// @access  Private

router.post('/experience', passport.authenticate('jwt',{session:false}),(req,res)=>{
  const {isValid,errors } = validateExperienceInput(req.body);
  
  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }


  Profile.findOne({user:req.user.id},(err,profile)=>{
    if(err){res.status(400).json(err)}
    if(profile){

      const newExp = {
        title :req.body.title,
        company :req.body.company,
        location :req.body.location,
        from :req.body.from,
        to :req.body.to,
        current :req.body.current,
        description :req.body.description,
      }

      profile.experience.unshift(newExp);

      profile.save((err,profile)=>{
        if(err){res.status(400).json(err)}
        res.json(profile);
      })
    }else{
      errors.profile = 'You haven\'t  profile yet'
      res.json()
    }
  })
});




// @route   POST api/profile/Education
// @access  Private

router.post('/education', passport.authenticate('jwt',{session:false}),(req,res)=>{
  const {isValid,errors } = validateEducationInput(req.body);
  
  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }


  Profile.findOne({user:req.user.id},(err,profile)=>{
    if(err){res.status(400).json(err)}
    if(profile){

      const newEdu = {
        school :req.body.school,
        degree :req.body.degree,
        fieldofstudy :req.body.fieldofstudy,
        from :req.body.from,
        to :req.body.to,
        current :req.body.current,
        description :req.body.description,
      }

      profile.education.unshift(newEdu);

      profile.save((err,profile)=>{
        if(err){res.status(400).json(err)}
        res.json(profile);
      })
    }else{
      errors.profile = 'You haven\'t  profile yet'
      res.json()
    }
  })
});



// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // Splice out of array
        profile.experience.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);


// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        // Splice out of array
        profile.education.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);



// @route   DELETE api/profile
// @desc    Delete user profile
// @access  Private

router.delete('/',
  passport.authenticate('jwt',{session:false})
  ,(req,res)=>{
    Profile.findOneAndRemove({user:req.user.id},(err,profile)=>{
      if(err) {res.json(err);}
      User.findOneAndRemove({_id:req.user.id},(err,done)=>{
        if(err) {res.json(err);}
        res.json({success:true})
      })
    })
  })

module.exports = router;