import axios from 'axios';
import { Router, Request, Response } from 'express'
const router = Router()
router.get('/reports', async (req: Request, res: Response) => {
    try {
        const reports = await axios.get('https://api.vantage.sh/v1/reports', {
            headers: {
                Authorization: "Bearer EfE0kQM8GaUbhyG7VealM71MiyoGl_Ld41qDhrc3RWA"
            }
        })
        console.log(reports.data)
        res.status(200).json(reports.data)
    } catch (e) {
        res.status(400).json({ e: e })
    }
})
router.get('/reports/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const reports = await axios.get('https://api.vantage.sh/v1/reports/' + id, {
            headers: {
                Authorization: "Bearer EfE0kQM8GaUbhyG7VealM71MiyoGl_Ld41qDhrc3RWA"
            }
        })
        console.log(reports.data)
        res.status(200).json(reports.data)
    } catch (e) {
        res.status(400).json({ e: e })
    }
})
router.get('/reports/:id/costs', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const reports = await axios.get('https://api.vantage.sh/v1/reports/' + id + '/costs', {
            headers: {
                Authorization: "Bearer EfE0kQM8GaUbhyG7VealM71MiyoGl_Ld41qDhrc3RWA"
            }
        })
        console.log(reports.data)
        res.status(200).json(reports.data)
    } catch (e) {
        res.status(400).json({ e: e })
    }
})
export default router
