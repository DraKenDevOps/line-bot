import { Request, Response } from "express";
import * as line from '@line/bot-sdk'

import env from "../../env";

export const webHookController = async (req: Request, res: Response) => {
    try {
        const { events } = req.body

        if (events.length > 0) {
            await events.map((item: any) => eventHandler(item))
        } else {
            res.status(200).json({
                message: 'OK'
            })
        }
    } catch (e) {
        res.end()
        throw e
    }
}


const eventHandler = async (event: any) => {
    console.log(event)
}