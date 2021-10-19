const { Router } = require("express");
const router = Router();
const authControllerr = require('../controllers/authControllerr')


router.get('/signup',authControllerr.signup_get);
router.post('/signup',authControllerr.signup_post);
router.get('/login',authControllerr.login_get);
router.post('/login',authControllerr.login_post);
router.get('/logout',authControllerr.logout_get);



module.exports = router;