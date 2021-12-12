import * as express from 'express'
import { Router, Request, Response, NextFunction } from 'express'
const app = express();
import * as path from 'path'
const router = Router()
import appRoutePrices from './config/RoutePrice'
import appRouteCost from './config/RouteCost'
import axios from 'axios';
var AWS = require('aws-sdk')

var bodyParser = require('body-parser');
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, 'views')))

app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }))
require('dotenv').config()

export const KEY_FIREBASE_DEFINE = process.env.KEY_FIREBASE_DEFINE?.split(',');
function updateAWS() {
    const arn = process.env.ROLEARN as string
    AWS.config.update({
        credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: process.env.IDENTYTYPOOLID,
            RoleArn: arn ,
        }, { region: process.env.REGION, })
    })
}
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
app.get('/users', async (req: Request, res: Response) => {
    updateAWS()
    const org = new AWS.Organizations({ apiVersion: '2016-11-28', region:  process.env.REGION, });
    org.listAccounts({}, function (err: any, data: any) {
        if (err) {
            res.status(400).json({ e: err })
        } else {
            org.describeOrganization({}, function (err2: any, data2: any) {
                if (err2) {
                    res.status(400).json({ e2: err2 })
                } else {
                    org.listOrganizationalUnitsForParent({ ParentId: 'r-r9va' }, function (err3, data3) {
                        if (err3) {
                            res.status(400).json({ err3: err3 })
                        }
                        else {
                            console.log({ data3: data3.OrganizationalUnits })
                            const url = "http://localhost:3000/"
                            res.render(path.join(__dirname, './views/users.ejs'), { URL: url, account: data.Accounts, orgData: data2.Organization, ouData: data3.OrganizationalUnits });
                        }
                    });
                }
            });
        }
    });
})
app.get('/users/:id', async (req: Request, res: Response) => {
    updateAWS()
    const usrId = req.params.id;
    const budgets = new AWS.Budgets({ apiVersion: '2016-10-20', region:  process.env.REGION, });
    var params = {
        AccountId: usrId
    };
    budgets.describeBudgetActionsForAccount(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);           // successful response
    });
    res.json("test")
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
app.get('/getInfoOrg/:type', async (req: Request, res: Response) => {
    // account_id
    // region
    // service
    try {
        const data = await axios.get('https://console.vantage.sh/reports/attribute_values?name=' + req.params.type, {
            headers: {
                cookie: 'intercom-session-gzqbquk3=bU9uVlVURFByOFgxU0JVTnAyMHZlK3Jid0l2SG9pNDhDQlYxbmVVak1lcHlWRUk5dEFPRExzVm45NVExcmdUZy0tTU1aeTZVMGR4V0xJNGVKZGUzN05YUT09--612da31b9bb42b5b576c6212fe8ade78d3973d28; _stratus_session=xXM3ujgFAk4K%2Bt5WLFEJ7XB7Wtg2f%2F6FgXGch4rocFNVteTWRVYc0lF2%2FXo337AIc%2Fe2x33cZ8e2A%2FvPQeQWWDTRViTUcVg5Y%2BvJW9X27P8xHAYZBdA%2F0CIrTVwPLpPuz7HGGJkHdyGdm8X1B7%2Ft%2FBVW2J1gBW7Rn5DLzFbhgwly9ggTApeI%2FtESm3ltfzZjBeQRdsFIw6NzVGA0cVYcXLr%2FK9VNT9yzT2OCtkn%2FazqzjUNiswbuvXmN%2FK0nACo8gFPMUH7ss2b1YrV0VGIjtL1YRSWWmdmd0zKAD6ri2OhkKNvIt8mWt9TIFRfdr3h8R1vEOCN6%2Fr2LoAOe6NkyAo7VB7gcfHg1KJnOYxHtfmPcmzawspa2JOUSwEvHSKvjdaPMx1kCAIOqMWAeTAaEC%2BzE130td%2F17KhlnkL%2Bcq6aD5hj5IhTnE0wbF5e%2BUWkk--F5ItBnzn%2Ba5TckN5--w8xrp1qY091e4iGuW9kaYw%3D%3D'
            }
        })
        res.json(data.data)
    } catch (e) {
        res.status(400).json({ e: e })
    }
})

// alexa skills + GA fullfillment + OAUTH2
app.use('/prices', appRoutePrices)
app.use('/costs', appRouteCost)
app.listen(3000, () => {
    return console.log(`SERVER IS LISTENING ON DEVELOP at port 3000`)
})

// exports.appGA = functions.https.onRequest(app);
