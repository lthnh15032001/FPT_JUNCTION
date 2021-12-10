// const request = require('request');
const path = require('path');
import { Router, Request, Response } from 'express'
const router = Router()
router.get('/', function (req: Request, res: Response) {
    const url = process.env.NODE_ENV === "production" ? "https://mq-vnaa01.rogo.com.vn/v1/rogo" : "http://localhost:3000/"
    res.render(path.join(__dirname, '../views/dashboard.ejs'), { URL: url, voice_system: process.env.VOICE_SYSTEM || "alexa", key: res.locals['key'] });
});
export default router
