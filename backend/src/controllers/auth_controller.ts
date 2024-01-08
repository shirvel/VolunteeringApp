import User from '../models/user_model';
import bcrypt from 'bcrypt';

const register = async (req, res) => {
    console.log("Register");
    // Check if the user is valid
    const email = req.body.email;
    const password = req.body.password;

    if (email == null || password == null) {
        return res.status(400).send("missing email or password!!!");
    }

   // Check if it not already registred

   try {
       const user = await User.findOne( {'email': email} );
       if (user != null) {
        return res.status(406).send("Email already exists");
       }
       const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({ 'email': email, 'password': encryptedPassword });
        return res.status(201).send(newUser);

   } catch(err) {
    return res.status(400).send("Error missing email or password");
   }
}

const login = async (req, res, next) => {
    console.log("Login");
    res.status(400).send({
        'status': 'fail',
        'message': 'Not implemented'
    })
}

const logout = async (req, res, next) => {
    console.log("Logout");
    res.status(400).send({
        'status': 'fail',
        'message': 'Not implemented'
    })
}

export default { register, login, logout};