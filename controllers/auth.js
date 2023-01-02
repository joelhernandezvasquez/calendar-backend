const {response} = require('express');
const  bcrypt  = require('bcryptjs');
const User = require('../models/Users');
const {generateJWT} = require('../helpers/jwt');
const {validateJWT} = require('../middlewares/validate-jwt');

const createUser = async (req,res = response)=>{
  const {email,password} = req.body;

  try{

    let user = await User.findOne({email});

     if(user){
      return res.status(400).json({
        ok:false,
        msg:'User already exist with this email'
      })
     }

    
     user = new User(req.body);

     // Encrypt password
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password,salt);
     
    await user.save();

    // Generate JWT

    const token = await generateJWT(user.id,user.name);

  
    res.status(201).json({
      ok:true,
      uid:user.id,
      name:user.name,
      token
    })
  } 

  catch(error){
    console.log(error);
   res.status(500).json({
    ok:false,
    msg:'Please contact Admin'
   })
  }
    
  }

  const loginUser = async (req,res = response)=>{
    const {email,password} =  req.body;
 
    try{
      const user = await User.findOne({email});

      if(!user){
       return res.status(400).json({
         ok:false,
         msg:'User does not exist with this email'
       })
      }

        // check passwords
        const validPassword = bcrypt.compareSync(password,user.password);

        if(!validPassword){
          return res.status(400).json({
              ok:false,
              msg:'Password incorrect'
          });
        }
        const token = await generateJWT(user.id,user.name);
        res.json({
          ok:true,
          uid:user.id,
          name:user.name,
          token
        })
      }   
    
 catch(error){
  console.log(error);
  res.status(500).json({
   ok:false,
   msg:'Please contact Admin'
  })
 }

     
  }

  const revalidateToken = async (req,res = response)=>{

    const{uid,name} = req;

    // generate a new token
    const token = await generateJWT(uid,name);

     res.json({
      ok:true,
      uid,
      name,
      token
      
    })
  }

  module.exports = {
    createUser,
    loginUser,
    revalidateToken
  }