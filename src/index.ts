import * as express from 'express'
import { Router, Request, Response, NextFunction } from 'express'
const app = express();
import * as path from 'path'
const router = Router()
import appRoute from './config/Route'


var bodyParser = require('body-parser');
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, 'views')))

app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }))
require('dotenv').config()

export const KEY_FIREBASE_DEFINE = process.env.KEY_FIREBASE_DEFINE?.split(',');

// server logger
function logOriginalUrl(req: Request, res: Response, next: NextFunction) {
    console.log('------')
    console.log('Environment: ', process.env.NODE_ENV)
    console.log('Request URL:', req.originalUrl)
    console.log('Request Type:', req.method)
    const timeElapsed = Date.now();
    const now = new Date(timeElapsed);
    console.log('At:', now.toUTCString())
    console.log('------')
    next()
}
const logStuff = [logOriginalUrl]
app.use('/', logStuff, router);

// FPT server

// alexa skills + GA fullfillment + OAUTH2
app.use('/api/v1', appRoute)

app.listen(3000, () => {
    return console.log(`SERVER IS LISTENING ON DEVELOP at port 3000`)
})

// exports.appGA = functions.https.onRequest(app);
