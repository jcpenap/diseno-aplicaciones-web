const config = {
    env: "development",
    database: {
        development:{
            host: "localhost", 
            name: "twitter"
        },
        production:{
            host: "", 
            name: "",
            user: "",
            password: "",
            port: 0
        }
    },
    server:{
        host: "localhost",
        port: 3000
    }
}

module.exports = config;