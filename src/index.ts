import * as express from 'express'
import { Router, Request, Response, NextFunction } from 'express'
const app = express();
import * as path from 'path'
const router = Router()
import appRoutePrices from './config/RoutePrice'
import appRouteCost from './config/RouteCost'
import axios from 'axios';


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
app.get('/', function (req: Request, res: Response) {
    const url = "http://localhost:3000/"
    res.render(path.join(__dirname, './views/dashboard.ejs'), { URL: url });
})
app.get('/ping', async (req: Request, res: Response) => {
    try {
        const providers = await axios.get('https://api.vantage.sh/v1/ping', {
            headers: {
                Authorization: "Bearer EfE0kQM8GaUbhyG7VealM71MiyoGl_Ld41qDhrc3RWA"
            }
        })
       
        res.status(200).json(providers.data)
    } catch (e) {
        res.status(400).json({ e: e })
    }
})
// FPT server

// alexa skills + GA fullfillment + OAUTH2
app.use('/prices', appRoutePrices)
app.use('/costs', appRouteCost)
app.listen(3000, () => {
    return console.log(`SERVER IS LISTENING ON DEVELOP at port 3000`)
})

// exports.appGA = functions.https.onRequest(app);
