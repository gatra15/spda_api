'use strict';

const firebase = require('../database');
const firestore = firebase.firestore();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = process.env;

const register = async (req, res) => 
{
    const { name, email, username, password, role_id} = req.body;

    try {
    
        // Existing User Check
        const user = await firestore.collection('users').get();
        const userExisting = [];
        if(!user.empty) {
            user.forEach(doc => {
                const data = doc.data().email;
                userExisting.push(data);
            });
            
            if(userExisting.indexOf({email}))
            {
                return res.send({message: "User already exist"})
            }
        } else {
            // Hashed Password
            const hashedPasword = await bcrypt.hash(password, 10);

            // User Creation
            const data = {
                name: name,
                email: email,
                username: username,
                password: hashedPasword,
                role_id: role_id
            }

            const storeData = await firestore.collection('users').doc().set(data);
            const result = await firestore.collection('users').where('username', '==', data.username).get();
            const results = [];
            result.forEach(doc => {
                const id = doc.id;
                results.push(id);
            });

            // Token Generate
            const token = jwt.sign({id: results[0].id}, TOKEN_SECRET);
            res.status(200).json({user: data, token: token})
        }

        
        
    } catch (error)
    {
        console.log(error);
        res.status(500).json({ message: error.message })
    }

}

const login = async (req, res) => {
    const {username, password} = req.body;

    try {
        // Existing User Check
        const user = await firestore.collection('users').where('username', '==', username).get();
        const userExisting = [];

        if(!user.empty) {
            user.forEach(doc => {
                const data = new User(
                    doc.id,
                    doc.data().name,
                    doc.data().email,
                    doc.data().username,
                    doc.data().password,
                    doc.data().role_id
                )
                userExisting.push(data);
            });
            
            if(!userExisting)
            {
                return res.status(401).json({message: "User not found!"})
            } else {
                const matchPassword = await bcrypt.compare(password, userExisting[0].password);

                if(!matchPassword) {
                    return res.status(401).json({message: "Invalid username or password!"})
                } else {
                    delete userExisting[0].password
                    const token = jwt.sign({id: userExisting[0].id}, TOKEN_SECRET);
                    return res.status(200).json({data: userExisting[0], token: token})
                }
            }
        } else {
            return res.status(401).json({message: "User not found!"})
        }
    } catch (error)
    {

    }
}

const logout = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    jwt.sign(authHeader, "", { expiresIn: 1 } , (logout, err) => {
        if (logout) {
            res.send({msg :'You have been Logged Out' });
        } else {
            res.send({msg :'Error'});
        }
    });
}
module.exports = { register, login, logout }