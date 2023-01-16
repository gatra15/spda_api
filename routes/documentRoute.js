const express = require('express');
const {addDocument, 
       getAllDocuments, 
       getDocument,
       updateDocument,
       deleteDocument
      } = require('../controllers/documentController');

const router = express.Router();

router.post('/documents', addDocument);
router.get('/documents', getAllDocuments);
router.get('/documents/:id', getDocument);
router.put('/documents/:id', updateDocument);
router.delete('/documents/:id', deleteDocument);


module.exports = {
    routes: router
}