import express from "express";
const router = express.Router();
// TODO: Understand if the middleware affects here
//import authMiddleware from '../common/auth_middleware';
import dotenv from 'dotenv';
dotenv.config();

import {OAuth2Client} from 'google-auth-library';

router.post("/", async function(req, res, next) {
    // TODO: Why 5173 and not 3000?
    res.header("Access-Control-Allow-Origin", 'http://localhost:5173');
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("Referrer-Policy","no-referrer-when-downgrade");

    const redirectUrl = 'http://127.0.0.1:3000/oauth';

    const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectUrl
    )

    // Genarate the url we goona use
    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline', // Force a refresh token to be created
        scope: 'https://www.googleapis.com/auth/userinfo.profile  openid ',
        prompt: 'consent' // Make sure the constent screen to stays open and they have to verify even if you signed in
    });

    res.json({url: authorizeUrl});
    
});

export default router;