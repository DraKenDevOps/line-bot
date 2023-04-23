import { config } from "dotenv";

config()

const env = {
    NODE_PORT: parseInt(process.env.NODE_PORT),
    BASE_PATH: process.env.BASE_PATH,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    SECRET_TOKEN: process.env.SECRET_TOKEN,
    NGROK_AUTH_TOKEN: process.env.NGROK_AUTH_TOKEN
}

export default env