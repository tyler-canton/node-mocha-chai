const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const InstitutionController = require('../controllers/institution.controller');
const BookController = require('../controllers/book.controller');

const custom = require('./../middleware/custom');

const passport = require('passport');
const path = require('path');


require('./../middleware/passport')(passport)
/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ status: "success", data: { "version_number": "v1.0.0", "message": "Parcel Pending API", } })
});

router.post('/users', UserController.create);
router.post('/users/seed', UserController.seed);

router.get('/users', passport.authenticate('jwt', { session: false }), UserController.get);
router.put('/users', passport.authenticate('jwt', { session: false }), UserController.update);
router.delete('/users', passport.authenticate('jwt', { session: false }), UserController.remove);
router.post('/users/signin', UserController.signin);


router.post('/books', passport.authenticate('jwt', { session: false }), BookController.create);
router.get('/books', passport.authenticate('jwt', { session: false }), BookController.getAll);

router.post('/institutions', InstitutionController.create);
router.get('/institutions',passport.authenticate('jwt',{session:false}), InstitutionController.getAll);
router.get('/institutions/:institutionid', passport.authenticate('jwt', {session:false}), custom.institution, InstitutionController.get);
router.put('/institutions/:institutionid', passport.authenticate('jwt', {session:false}), custom.institution, InstitutionController.update);
router.delete('/institutions/:institutionid', passport.authenticate('jwt', {session:false}), custom.institution, InstitutionController.remove);
module.exports = router;
