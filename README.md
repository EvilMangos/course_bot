# course_bot
Bot for programming course

# How to Set Up
1. Create a database.
2. Use @BotFather bot in Telegram to get BOT_ID token.
3. Use ngrok to get Public URL for the server. (Forward request to your server e.g. `ngrok http 5000`).
4. Create a copy of "example.env" file inside "configs/environments" directory and name it ".env".
5. Fill in all necessary environment variables inside ".env" (URL - url produced by the ngrok).
6. Run `npm i`. 
7. Run `npm run db:migrate` and then `npm run db:seeds`.
8. Run `npm start` to start the server.