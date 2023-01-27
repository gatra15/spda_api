const express = require('express');
const {login, 
       register, 
       logout,
      } = require('../controllers/authController');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.put('/logout', logout)


module.exports = {
    routes: router
}