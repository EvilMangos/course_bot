module.exports = {
    users: {
        tableName: "users",
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
        tableName: "users",
        id: 'id',
        userId: 'user_id',
        amount: 'amount',
        payDate: 'pay_date'
    }
}