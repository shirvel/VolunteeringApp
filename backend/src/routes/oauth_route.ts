import express from "express";
const router = express.Router();
// TODO: Understand if the middleware affects here
//import authMiddleware from '../common/auth_middleware';
import dotenv from 'dotenv';
import { OAuth2Client } from "google-auth-library";
dotenv.config();

async function getUserData(access_token) {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token${access_token}`);
    const data = await response.json();
    console.log('data', data);
}

router.get('/', async function(req, res, next) {
    const code = req.query.code; // Google code
    try {
        const redirectUrl = 'http://127.0.0.1:3000/oath';
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectUrl
        );
        const res = await oAuth2Client.getToken(code);
        await oAuth2Client.setCredentials(res.tokens);
        console.log('Tokens acquired');
        const user = oAuth2Client.credentials;
        console.log('credentials', user);
        await getUserData(user.access_token);
    } catch(err) {
        console.log('Error with signing in with Google');
    }
})

export default router;