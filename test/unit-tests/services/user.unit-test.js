const User = require('../../../src/services/user/index');
const BaseModel = require('../../../src/db/baseModel');

let createUser;

beforeEach(() => {
    createUser = {
        firstname: 'Tom',
        lastname: 'Smith',
        email: 'tomSmith@gmail.com',
        course: 'nodejs',
        telegramId: Math.round(Math.random() * 1000000),
        balance: 0,
        isAdmin: false
    };
});

describe('signUp', () => {
    it('success', async () => {
        const baseModel = new BaseModel();

        const users = new User();
        const userFromService = await users.signUp(createUser);
        const userFromDB = await baseModel.models.users.findOne({
            where: {
                telegramId: createUser.telegramId
            }
        });
        expect(userFromService).toEqual(await userFromDB.get({plain: true}));
    });

    it('fail firstname notNull validation', async () => {
        createUser.firstname = null;
        try {
            const users = new User();
            await users.signUp(createUser);
        } catch (err) {
            expect(err.message).toBe(`SequelizeValidationError: notNull Violation: users.firstName cannot be null`);
        }
    })
});

describe('auth', () => {
    it('success', async () => {
        const users = new User();
        await users.signUp(createUser);
        const result = await users.auth(createUser.telegramId);

        expect(result).toBe(true);
    });

    it('fail', async () => {
        const users = new User();
        const result = await users.auth(0);

        expect(result).toBe(false);
    })
});
