// const request = require('request');
// const path = require('path');
import axios from 'axios';
import { Router, Request, Response } from 'express'
const router = Router()

router.get('/providers', async (req: Request, res: Response) => {
    try {
        const providers = await axios.get('https://api.vantage.sh/v1/providers', {
            headers: {
                Authorization: "Bearer EfE0kQM8GaUbhyG7VealM71MiyoGl_Ld41qDhrc3RWA"
            }
        })
        console.log(providers.data)
        res.status(200).json(providers.data)
    } catch (e) {
        res.status(400).json({ e: e })
    }
})
router.get('/services', async (req: Request, res: Response) => {
    try {
        const services = await axios.get('https://api.vantage.sh/v1/services', {
            headers: {
                Authorization: "Bearer EfE0kQM8GaUbhyG7VealM71MiyoGl_Ld41qDhrc3RWA"
            }
        })
        console.log(services.data)
        res.status(200).json(services.data)
    } catch (e) {
        res.status(400).json({ e: e })
    }
})
router.get('/products', async (req: Request, res: Response) => {
    try {
        const products = await axios.get('https://api.vantage.sh/v1/products', {
            headers: {
                Authorization: "Bearer EfE0kQM8GaUbhyG7VealM71MiyoGl_Ld41qDhrc3RWA"
            }
        })
        console.log(products.data)
        res.status(200).json(products.data)
    } catch (e) {
        res.status(400).json({ e: e })
    }
})
router.get('/products/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const products = await axios.get('https://api.vantage.sh/v1/products/' + id, {
            headers: {
                Authorization: "Bearer EfE0kQM8GaUbhyG7VealM71MiyoGl_Ld41qDhrc3RWA"
            }
        })
        console.log(products.data)
        res.status(200).json(products.data)
    } catch (e) {
        res.status(400).json({ e: e })
    }
})
router.get('/products/:id/prices', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const products = await axios.get('https://api.vantage.sh/v1/products/' + id + "/prices" , {
            headers: {
                Authorization: "Bearer EfE0kQM8GaUbhyG7VealM71MiyoGl_Ld41qDhrc3RWA"
            }
        })
        console.log(products.data)
        res.status(200).json(products.data)
    } catch (e) {
        res.status(400).json({ e: e })
    }
})
router.get('/products/:id/prices/:id2', async (req: Request, res: Response) => {
    const id = req.params.id;
    const id2 = req.params.id2;
    try {
        const products = await axios.get('https://api.vantage.sh/v1/products/' + id + "/prices/" + id2 , {
            headers: {
                Authorization: "Bearer EfE0kQM8GaUbhyG7VealM71MiyoGl_Ld41qDhrc3RWA"
            }
        })
        console.log(products.data)
        res.status(200).json(products.data)
    } catch (e) {
        res.status(400).json({ e: e })
    }
})
export default router
