declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_PORT: string
            BASE_PATH: string
            ACCESS_TOKEN: string
            SECRET_TOKEN: string
            NGROK_AUTH_TOKEN: string
        }
    }
}

export { }