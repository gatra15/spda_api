const express = require('express');
const auth = require('../middlewares/auth');
const {addDocument, 
       getAllDocuments, 
       getDocument,
       updateDocument,
       deleteDocument
      } = require('../controllers/documentController');

const router = express.Router();

router.post('/documents', auth, addDocument);
router.get('/documents', auth, getAllDocuments);
router.get('/documents/:id', auth, getDocument);
router.put('/documents/:id', auth, updateDocument);
router.delete('/documents/:id', auth, deleteDocument);


module.exports = {
    routes: router
}