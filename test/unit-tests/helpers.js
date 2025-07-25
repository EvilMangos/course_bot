function createMockCtx(overrides = {}) {
    return {
        chat: { id: 123 },
        wizard: {
            next: jest.fn(),
            back: jest.fn(),
            leave: jest.fn(),
            state: {},
            cursor: 0,
            steps: [],
        },
        message: { text: '' },
        callbackQuery: null,
        reply: jest.fn(),
        telegram: { sendMessage: jest.fn() },
        scene: { leave: jest.fn() },
        ...overrides
    };
}

module.exports = {
    createMockCtx,
};