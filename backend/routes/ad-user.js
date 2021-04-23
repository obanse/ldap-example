const express = require('express');
const bodyParser = require('body-parser');

const LdapController = require('../controllers/ad-user');

// TODO: const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/all-users', LdapController.getAllUsers);

// TODO: add more functionality
// router.post('', checkAuth, LdapController.createUser);
// router.put('/:id', checkAuth, LdapController.updateUser);
// router.delete('/:bnr', checkAuth, LdapController.deleteUser);

module.exports = router;
