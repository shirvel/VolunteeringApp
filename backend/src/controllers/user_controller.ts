import User from '../models/user_model';

const getAllUsers = async (req, res) => {
    console.log("getAllUsers");
    try {
        let users;
        if (req.query.name) {
            users = await User.find( { name: req.query.name } );
        }
        else if (req.query.id) {
            users = await User.find( { _id: req.query._id } );
        }
        else {
            users = await User.find();
        }
        res.send(users);
    } catch (err) {
        res.status(500).json( {message: err.message} );
    }
  
};

const getUserById = (req, res) => {
    res.send("get user by id: " + req.params.id);
};

const postUser = async (req, res) => {
    console.log("postUser: " + req.body);
    const user = new User(req.body);
    try {
        await user.save();
        res.send("OK");
    } catch (err) {
        console.log(err);
        res.send("fail: " + err.message);
    }
};

const putUserById = (req, res) => {
    res.send("put user by id: " + req.params.id);
};

const deleteUserById = (req, res) => {
    res.send("delete user by id: " + req.params.id);
};

export default { getAllUsers, getUserById, postUser, putUserById, deleteUserById };