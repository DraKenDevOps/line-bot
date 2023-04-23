import express from 'express'
import {
    // main APIs
    Client,
    middleware,

    // exceptions
    // JSONParseError,
    // SignatureValidationFailed,

    // types
    // TemplateMessage,
    WebhookEvent,
} from "@line/bot-sdk";
import cors from 'cors'
// import bodyParser from 'body-parser'
// import apiRouter from './routes'
import axios from 'axios';

import env from './env'

const app = express()

app.use(cors())
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))

const lineConfig = {
    channelAccessToken: env.ACCESS_TOKEN,
    channelSecret: env.SECRET_TOKEN,
}

const client = new Client(lineConfig)

app.get('/', (_, res) => {
    res.send('127.0.0.1')
})

app.post('/webhook', middleware(lineConfig), async (req, res, next) => {

    const signature = req.headers["x-line-signature"] as string;

    if (!signature) {
        return res.status(401).json({
            status: 401,
            message: 'No signature'
        })
    }

    try {
        const { events } = req.body

        if (events.length > 0) {
            for (const event of events) {
                await eventHandler(event)
            }
        } else {
            res.status(200).send('OK')
        }
    } catch (e) {
        res.end()
        throw e
    }
})

const eventHandler = async (event: WebhookEvent) => {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return null
    }

    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${event.message.text}`)


    if (!response) {
        return client.replyMessage(event.replyToken, { type: 'text', text: `Failed!!` })
    } else {
        const { data } = response
        return client.replyMessage(event.replyToken, { type: 'text', text: `name: ${data.name},\nusername: ${data.username},\nemail: ${data.email},\nphone: ${data.phone}` })
    }




    // return client.replyMessage(event.replyToken, { type: 'text', text: event.message.text })
}

// app.use(`${env.BASE_PATH}`, apiRouter)

app.listen(env.NODE_PORT, '0.0.0.0', () => {
    console.log(`${new Date().toISOString()} - LINE bot server is running ...`)
    console.log(`${new Date().toISOString()} - PORT: ${env.NODE_PORT}`)
})
