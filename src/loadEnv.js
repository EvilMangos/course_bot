const dotenv = require('dotenv');
const path = require('path');

const loadEnv = () => {
    let env = '';
    switch (process.env.NODE_ENV) {
        case 'development':
            env = '';
            break;
        case 'dev':
            env = 'dev';
            break;
        case 'stage':
            env = 'stage';
            break;
        case 'prod':
            env = 'prod';
            break;
        case 'testing_local':
            env = 'testing_local';
            break;
    }

    dotenv.config({
        path: path.resolve(process.cwd(), `./configs/environments/common.env`)
    });

    dotenv.config({
        path: path.resolve(process.cwd(), `./configs/environments/${env}.env`)
    });
}
loadEnv();
module.exports = loadEnv;
