var express = require('express');
var router = express.Router();

router.use('/signup', require('./signup'));
router.use('/login', require('./login'));
router.use('/userprofile', require('./authentication'), require('./userprofile'));
router.use('/logout', require('./logout'));
router.use('/welcome', require('./welcome')); //Main page After login or Registration
router.use('/data_notes',require('./authentication'),require('./data_notes')); //Api for saving data_notes in db
router.use('/get_data_notes',require('./authentication'),require('./get_data_notes'));//Api for fetching data_notes from db
router.use('/update_data_notes',require('./update_data_notes'));
router.use('/delete_data_notes',require('./delete_data_notes'));
router.use('/read_single_note',require('./read_single_note'));
module.exports = router;
