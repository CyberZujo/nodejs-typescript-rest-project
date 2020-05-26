export default {
    database: {
        //CONNECTION_STRING: 'mongodb://root:password@mongodb:27018/shopify-db',
        CONNECTION_STRING: 'mongodb://127.0.0.1:27017/shopify-db',
        DATABASE: 'shopify-db'
    },
    app: {
        PORT: 4000
    },
    token: {
        SECRET: 'shopifySuperSecret'
    }
}