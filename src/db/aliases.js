module.exports = {
    users: {
        tableName: 'users',
        id: 'id',
        firstName: 'first_name',
        lastName: 'last_name',
        email: 'email',
        telegramId: 'telegramId',
        course: 'course',
        balance: 'balance',
        isAdmin: 'is_admin'
    },
    transactions: {
        tableName: 'transactions',
        id: 'id',
        userId: 'user_id',
        amount: 'amount',
        payDate: 'pay_date'
    },
    lessons: {
        tableName: 'lessons',
        id: 'id',
        course: 'course',
        startedAt: 'started_at',
        theme: 'theme',
        number: 'number'
    }
}
