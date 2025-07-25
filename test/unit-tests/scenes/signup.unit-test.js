const { createMockCtx } = require('../helpers');
const signupScene = require('../../../src/scenes/signup');
const helpers = require('../../../src/scenes/helpers');
const User = require('../../../src/services/user');
const setKeyboard = require('../../../src/utils/setKeyboard');

jest.mock('../../../src/utils/authValidation');
jest.mock('../../../src/services/user/index');
jest.mock('../../../src/scenes/helpers/index');
jest.mock('../../../src/utils/setKeyboard');

afterEach(() => {
    jest.clearAllMocks();

    helpers.isCancelCommand.mockReturnValue(false);
    helpers.validateAndProceed.mockReturnValue(true);
    helpers.createCancelKeyboard.mockReturnValue({ reply_markup: { keyboard: [[{ text: 'Cancel' }]] } });
    helpers.createCourseKeyboard.mockReturnValue({ inline_keyboard: [] });
});

describe("Signup", () => {
    describe("Step 0", () => {
        it('sends SignUp message and prompts for first name', async () => {
            const ctx = createMockCtx();
            jest.spyOn(helpers, 'createCancelKeyboard').mockReturnValue({ reply_markup: {} });

            await signupScene.steps[0](ctx);

            expect(ctx.telegram.sendMessage).toHaveBeenCalledWith(123, 'SignUp', { reply_markup: {} });
            expect(ctx.reply).toHaveBeenCalledWith('Enter your first name:');
            expect(ctx.wizard.next).toHaveBeenCalled();
        });
    });

    describe("Step 1", () => {
        it('validates first name and prompts for last name', async () => {
            const ctx = createMockCtx({ message: { text: 'John' } });
            jest.spyOn(helpers, 'isCancelCommand').mockReturnValue(false);
            jest.spyOn(helpers, 'validateAndProceed').mockReturnValue(true);
            jest.spyOn(helpers, 'setTelegramId').mockImplementation(() => {});

            await signupScene.steps[1](ctx);

            expect(ctx.reply).toHaveBeenCalledWith('Enter your last name:');
            expect(ctx.wizard.next).toHaveBeenCalled();
        });

        it('invalid first name does not proceed', async () => {
            const ctx = createMockCtx({ message: { text: '' } });
            jest.spyOn(helpers, 'isCancelCommand').mockReturnValue(false);
            jest.spyOn(helpers, 'setTelegramId').mockImplementation(() => {});
            jest.spyOn(helpers, 'validateAndProceed').mockReturnValue(false);

            await signupScene.steps[1](ctx);

            expect(ctx.reply).not.toHaveBeenCalled();
            expect(ctx.wizard.next).not.toHaveBeenCalled();
        });

        it('cancel command exits the scene', async () => {
            const ctx = createMockCtx({ message: { text: '/cancel' } });
            jest.spyOn(helpers, 'isCancelCommand').mockReturnValue(true);
            const cancelSpy = jest.spyOn(helpers, 'cancelScene').mockResolvedValue();

            await signupScene.steps[1](ctx);

            expect(cancelSpy).toHaveBeenCalledWith(ctx, 'Sign up is canceled', expect.anything());
        });
    });

    describe("Step 2", () => {
        it('valid last name proceeds to next step', async () => {
            const ctx = createMockCtx({ message: { text: 'Doe' } });
            jest.spyOn(helpers, 'isCancelCommand').mockReturnValue(false);
            jest.spyOn(helpers, 'validateAndProceed').mockReturnValue(true);

            await signupScene.steps[2](ctx);

            expect(ctx.reply).toHaveBeenCalledWith('Enter you Microsoft Teams e-mail address:');
            expect(ctx.wizard.next).toHaveBeenCalled();
        });

        it('invalid last name does not proceed', async () => {
            const ctx = createMockCtx({ message: { text: '' } });
            jest.spyOn(helpers, 'isCancelCommand').mockReturnValue(false);
            jest.spyOn(helpers, 'validateAndProceed').mockReturnValue(false);

            await signupScene.steps[2](ctx);

            expect(ctx.reply).not.toHaveBeenCalled();
        });

        it('cancel command exits the scene', async () => {
            const ctx = createMockCtx({ message: { text: '/cancel' } });
            jest.spyOn(helpers, 'isCancelCommand').mockReturnValue(true);
            const cancelSpy = jest.spyOn(helpers, 'cancelScene').mockResolvedValue();

            await signupScene.steps[2](ctx);

            expect(cancelSpy).toHaveBeenCalledWith(ctx, 'Sign up is canceled', expect.anything());
        });
    });

    describe("Step 3", () => {
        it('valid email shows course keyboard', async () => {
            const ctx = createMockCtx({ message: { text: 'a@a.com' } });
            jest.spyOn(helpers, 'isCancelCommand').mockReturnValue(false);
            jest.spyOn(helpers, 'validateAndProceed').mockReturnValue(true);
            jest.spyOn(helpers, 'createCourseKeyboard').mockReturnValue({ reply_markup: {} });

            await signupScene.steps[3](ctx);

            expect(ctx.reply).toHaveBeenCalledWith('Choose a course', { reply_markup: {} });
            expect(ctx.wizard.next).toHaveBeenCalled();
        });

        it('invalid email does not proceed', async () => {
            const ctx = createMockCtx({ message: { text: 'invalid-email' } });
            jest.spyOn(helpers, 'isCancelCommand').mockReturnValue(false);
            jest.spyOn(helpers, 'validateAndProceed').mockReturnValue(false);

            await signupScene.steps[3](ctx);

            expect(ctx.reply).not.toHaveBeenCalled();
            expect(ctx.wizard.next).not.toHaveBeenCalled();
        });

        it('cancel command exits the scene', async () => {
            const ctx = createMockCtx({ message: { text: '/cancel' } });
            jest.spyOn(helpers, 'isCancelCommand').mockReturnValue(true);
            const cancelSpy = jest.spyOn(helpers, 'cancelScene').mockResolvedValue();

            await signupScene.steps[3](ctx);

            expect(cancelSpy).toHaveBeenCalledWith(ctx, 'Sign up is canceled', expect.anything());
        });
    });

    describe("Step 4", () => {
        it('registers user and exits scene', async () => {
            const ctx = createMockCtx({
                callbackQuery: { data: 'courseA' },
                wizard: {
                    next: jest.fn(),
                    back: jest.fn(),
                    leave: jest.fn(),
                    state: {
                        firstName: 'John',
                        lastName: 'Doe',
                        email: 'a@a.com'
                    },
                    cursor: 4,
                    steps: [],
                },
                scene: { leave: jest.fn() }
            });

            const signUpMock = jest.fn();
            User.mockImplementation(() => ({ signUp: signUpMock }));

            await signupScene.steps[4](ctx);

            expect(signUpMock).toHaveBeenCalledWith({
                firstName: 'John',
                lastName: 'Doe',
                email: 'a@a.com',
                course: 'courseA'
            });
            expect(setKeyboard).toHaveBeenCalled();
            expect(ctx.reply).toHaveBeenCalledWith('Thanks for registration');
            expect(ctx.scene.leave).toHaveBeenCalled();
        });

        it('cancel command exits the scene', async () => {
            const ctx = createMockCtx({ message: { text: '/cancel' }, wizard: { back: jest.fn() } });
            jest.spyOn(helpers, 'isCancelCommand').mockReturnValue(true);
            const cancelSpy = jest.spyOn(helpers, 'cancelScene').mockResolvedValue();

            await signupScene.steps[4](ctx);

            expect(cancelSpy).toHaveBeenCalledWith(ctx, 'Sign up is canceled', expect.anything());
        });
    });
});