import User, { IUser } from '../models/user_model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { Document } from 'mongoose';

const register = async (req: Request, res: Response) => {

    // Check if the user is valid
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const imageUrl = req.body.imageUrl;

    if (email == null || password == null || name == null) {
        return res.status(400).send("Missing email, password or name!!!");
    }

   // Check if it not already registred
   try {
       const user = await User.findOne( {'email': email} );
       if (user != null) {
        return res.status(406).send("Email already exists");
       }
       const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({ 'email': email, 'password': encryptedPassword, 'name': name, 'imageUrl': imageUrl });
        return res.status(201).send(newUser);

   } catch(err) {
    return res.status(400).send("Error: Missing email or password");
   }
}

const login = async (req: Request, res: Response) => {
    console.log("Login");
    const email = req.body.email;
    const password = req.body.password;

    if (email == null || password == null) {
        return res.status(400).send("Error: Missing email or password");
    }

    try {
        const user = await User.findOne({ 'email': email});
        if (user == null) {
            return res.status(401).send("Error: Email or password incorrect");
        }
        // TODO: Check it's ok!!!!
        const match = await bcrypt.compare(password, (user.password) as unknown as string);
        if (!match) {
            return res.status(401).send("Error: Email or password incorrect");
        }
        const accessToken = await jwt.sign(
            { _id: user._id, name: user.name }, 
            process.env.JWT_ACCESS_TOKEN_SECRET, 
            { expiresIn: process.env.JWT_TOKEN_EXPIRATION });
        const refreshToken = jwt.sign({ _id: user._id }, process.env.JWT_REFRESH_SECRET);

        if (user.refreshTokens == null) {
            user.refreshTokens = [refreshToken];
        } else {
            user.refreshTokens.push(refreshToken);
        }
        await user.save();

        res.status(200).send({
            'accessToken': accessToken,
            'refreshToken': refreshToken
        });
    } catch(err) {
        return res.status(400).send("Error -  missing email or password"); 
    }
}

const refresh = async (req: Request, res: Response) => {
    const authHeader = req.headers['authorization'];
    const refreshToken = authHeader && authHeader.split(' ')[1]; // Bearer <token>
    if (refreshToken == null) return res.sendStatus(401);
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, user: { '_id': string }) => {
        if (err) {
            console.log(err);
            return res.sendStatus(401);
        }
        try {
            const userDb = await User.findOne({ '_id': user._id });
            if (!userDb.refreshTokens || !userDb.refreshTokens.includes(refreshToken)) {
                userDb.refreshTokens = [];
                await userDb.save();
                return res.sendStatus(401);
            }
            const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_TOKEN_EXPIRATION });
            const newRefreshToken = jwt.sign({ _id: user._id }, process.env.JWT_REFRESH_SECRET);
            userDb.refreshTokens = userDb.refreshTokens.filter(t => t !== refreshToken);
            userDb.refreshTokens.push(newRefreshToken);
            await userDb.save();
            return res.status(200).send({
                'accessToken': accessToken,
                'refreshToken': refreshToken
            });
        } catch (err) {
            res.sendStatus(401).send(err.message);
        }
    });
}

const logout = async (req: Request, res: Response) => {
    const authHeader = req.headers['authorization'];
    const refreshToken = authHeader && authHeader.split(' ')[1]; // Bearer <token>
    if (refreshToken == null) return res.sendStatus(401);
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, user: { '_id': string }) => {
        console.log(err);
        if (err) return res.sendStatus(401);
        try {
            const userDb = await User.findOne({ '_id': user._id });
            if (!userDb.refreshTokens || !userDb.refreshTokens.includes(refreshToken)) {
                userDb.refreshTokens = [];
                await userDb.save();
                return res.sendStatus(401);
            } else {
                userDb.refreshTokens = userDb.refreshTokens.filter(t => t !== refreshToken);
                await userDb.save();
                return res.sendStatus(200);
            }
        } catch (err) {
            res.sendStatus(401).send(err.message);
        }
    });
}

const client = new OAuth2Client();
const googleSignin = async (req: Request, res: Response) => {
    console.log(req.body);
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const email = payload?.email;
        if (email != null) {
            let user = await User.findOne({ 'email': email });
            if (user == null) {
                user = await User.create(
                    {
                        'email': email,
                        'password': 'pass',
                        'name': payload?.name,
                        'imageUrl': payload?.picture
                    });
            }
            const tokens = await generateTokens(user);
            res.status(200).send(
                {
                    email: user.email,
                    name: user.name,
                    _id: user._id,
                    imageUrl: user.imageUrl,
                    ...tokens
                })
        }
    } catch (err) {
        return res.status(400).send(err.message);
    }
}

const generateTokens = async (user: Document & IUser) => {
    const accessToken = await jwt.sign({ _id: user._id, name: user.name }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_TOKEN_EXPIRATION });
    const refreshToken = jwt.sign({ _id: user._id }, process.env.JWT_REFRESH_SECRET);
    if (user.refreshTokens == null) {
        user.refreshTokens = [refreshToken];
    } else {
        user.refreshTokens.push(refreshToken);
    }
    await user.save();

    return {
        'accessToken': accessToken,
        'refreshToken': refreshToken
    };
}

export default { register, login, logout, refresh, googleSignin};