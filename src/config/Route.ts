// const request = require('request');
const path = require('path');
import { Router, Request, Response } from 'express'
const router = Router()
router.get('/', function (req: Request, res: Response) {
    const url = process.env.NODE_ENV === "production" ? "https://mq-vnaa01.rogo.com.vn/v1/rogo" : "http://localhost:9000/v1/rogo"
    res.render(path.join(__dirname, '../views/login.ejs'), { URL: url, voice_system: process.env.VOICE_SYSTEM || "alexa", key: res.locals['key'] });
});
export default router
