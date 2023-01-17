'use strict';

const firebase = require('../database');
const Document = require('../models/document');
const firestore = firebase.firestore();


const addDocument = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('documents').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllDocuments = async (req, res, next) => {
    try {
        const documents = await firestore.collection('documents');
        const data = await documents.get();
        const documentsArray = [];
        if(data.empty) {
            res.status(404).send('No Document record found');
        }else {
            data.forEach(doc => {
                const document = new Document(
                    doc.id,
                    doc.data().location,
                    doc.data().name,
                    doc.data().photo,
                );
                documentsArray.push(document);
            });
            res.send(documentsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getDocument = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log(id);
        const document = await firestore.collection('documents').doc(id);
        const data = await document.get();
        if(!data.exists) {
            res.status(404).send('Document with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateDocument = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const document =  await firestore.collection('documents').doc(id);
        await document.update(data);
        res.send('Document record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteDocument = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('documents').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addDocument,
    getAllDocuments,
    getDocument,
    updateDocument,
    deleteDocument
}