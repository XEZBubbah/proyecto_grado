const config = {
    application: {
        cors: {
            server: [
                {
                    origin: "http://localhost:3000", //servidor que deseas que consuma o (*) en caso que sea acceso libre
                    credentials: true
                }
            ]
        }
}
}

export default config;