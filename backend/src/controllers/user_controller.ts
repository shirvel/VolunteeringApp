import User, { IUser } from '../models/user_model';
//import { Request, Response } from 'express';

// TODO: why Property 'query' does not exist on type 'Request' ?


const getAllUsers = async (req, res) => {
    try {
        let users;
         if (req.params.email) {
             users = await User.find( { email: req.params.email } );
         }
         else if (req.params.id) {
             users = await User.find( { _id: req.params._id } );
         }
         else {
            users = await User.find();
        }
        res.send(users);
    } catch (err) {
        res.status(500).json( {message: err.message} );
    }
  
};

const getUserById = async (req, res) => {
    try {
        const users = await User.findById(req.params.id);
        res.send(users);
    } catch (err) {
        res.status(500).json( {message: err.message} );
    }
};

const putUserById = async (req, res) => {
       try {
           let user;
        if (req.body.email) {
             user = await User.findOneAndUpdate({_id: req.params.id}, {"email" :req.body.email});
        
        }
        res.status(204).json({"message": user});
            
    } catch (err) {
        res.status(500).json( {message: err.message} );
    }
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

export default { getAllUsers, getUserById, putUserById, deleteUserById };