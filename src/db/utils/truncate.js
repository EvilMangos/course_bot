require('../../loadEnv');

const BaseModel = require('../baseModel');

(async () => {
    const baseModel = new BaseModel();
    await baseModel.sequelize.truncate({
        cascade: true,
        restartIdentity: true,
        force: true
    })
        .then(async () => {
            console.info('All tables truncated');
            await baseModel.sequelize.close();
            process.exit(0);
        })
        .catch(err => console.error(err));
})();
