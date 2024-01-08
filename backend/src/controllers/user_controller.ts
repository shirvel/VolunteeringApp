import User from '../models/user_model';
import { Request, Response } from 'express';

// TODO: why Property 'query' does not exist on type 'Request' ?
// TODO: Maybe delete this file?

const getAllUsers = async (req, res) => {
    console.log("getAllUsers");
    try {
        let users;
        // if (req.query.name) {
        //     users = await User.find( { name: req.query.name } );
        // }
        // else if (req.query.id) {
        //     users = await User.find( { _id: req.query._id } );
        // }
        // else {
            users = await User.find();
       // }
        res.send(users);
    } catch (err) {
        res.status(500).json( {message: err.message} );
    }
  
};

const getUserById = async (req, res) => {
    console.log("getUserById");
    try {
        const users = await User.findById(req.params.id);
        res.send(users);
    } catch (err) {
        res.status(500).json( {message: err.message} );
    }
};

const postUser = async (req, res) => {
    console.log("postUser");
    const user = new User(req.body);
    try {
        await user.save();
        res.send("OK");
    } catch (err) {
        console.log(err);
        res.send("fail: " + err.message);
    }
};

const putUserById = async (req, res) => {
       res.send("put user by id: " + req.params.id);
   
    //    console.log("putUserById");
    //    try {
    //        const users = await User.findByIdAndUpdate(req.params.id, {
    //            name: req.params.name
    //        });
    //        res.send(users);
    //    } catch (err) {
    //        res.status(500).json( {message: err.message} );
    //    }
   };

   const deleteUserById = async (req, res) => {
    console.log("deleteUserById");
    try {
        const users = await User.findByIdAndDelete(req.params.id);
        res.send(users);
    } catch (err) {
        res.status(500).json( {message: err.message} );
    }
};

export default { getAllUsers, getUserById, postUser, putUserById, deleteUserById };