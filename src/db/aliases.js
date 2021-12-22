module.exports = {
    users: {
        tableName: "users",
        id: 'id',
        firstName: 'first_name',
        lastName: 'last_name',
        course: 'course',
        balance: 'balance',
        isAdmin: 'is_admin',
        telegramId: 'telegram_id'
    },
    transactions: {
        tableName: "users",
        id: 'id',
        userId: 'user_id',
        amount: 'amount',
        payDate: 'pay_date'
    }
}