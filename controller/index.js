var express = require('express');
var router = express.Router();

router.use('/signup', require('./signup'));
router.use('/login', require('./login'));
router.use('/userProfile', require('./authentication'), require('./userProfile'));
router.use('/logout',require('./logout'));
// router.use('/welcome',require('./authentication'),require('./welcome')); //Main page After login or Registration
router.use('/saveNote',require('./authentication'),require('./saveNote')); //Api for saving data_notes in db
router.use('/getNotes',require('./authentication'),require('./getNotes'));//Api for fetching data_notes from db
router.use('/updateNote',require('./updateNote'));
router.use('/deleteNote',require('./deleteNote'));
router.use('/readSinglenote',require('./readSinglenote'));
router.use('/reminder',require('./reminder'));
router.use('/deleteReminder',require('./deleteReminder'));
router.use('/changebgcolor',require('./changebgcolor'));
router.use('/archive',require('./archive'));
router.use('/pinned',require('./pinned'));
router.use('/uploadImage',require('./uploadImage'));
router.use('/auth/facebook',require('./facebookLogin'));
router.use('/auth/google',require('./googleLogin'));
router.use('/activityLog',require('./activityLog'));
router.use('/scrape',require('./authentication'),require('./webpageScrapper'));




module.exports = router;
