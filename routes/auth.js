/*
User Routes / Auth
host + /api/auth
*/
const {Router} = require('express');
const {check} = require("express-validator");
const router = Router();
const {fieldValidator} = require('../middlewares/field-validator');
const {createUser,loginUser,revalidateToken} = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validate-jwt');

router.post(
'/new',
[
 check('name','name is required').not().isEmpty(),
 check('email','email is required').isEmail(),
 check('password','password must be at least 6 characters').isLength({min:6}),
 fieldValidator
],
createUser
);

router.post(
    '/',
    [
     check('email','email is required').isEmail(),
     check('password','password must be at least 6 characters').isLength({min:6}),
     fieldValidator
    ],
    loginUser
    );

router.get('/renew',validateJWT,revalidateToken);

module.exports = router;