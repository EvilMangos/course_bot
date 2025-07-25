class EnvService {
    static get(key, defaultValue = null) {
        return process.env[key] || defaultValue;
    }

    static getDatabaseConfigs() {
        return {
            url: process.env.DATABASE_URL,
            port: process.env.DB_PORT,
            host: process.env.DB_HOST,
            name: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        };
    }

    static getBotConfigs() {
        return {
            token: process.env.BOT_TOKEN,
            url: process.env.URL
        };
    }

    static getServerConfigs() {
        return {
            port: process.env.PORT
        };
    }

    static getPaymentConfigs() {
        return {
            liqpayKey: process.env.LIQPAY_KEY,
            price: process.env.PRICE,
        }
    }
}

module.exports = EnvService;