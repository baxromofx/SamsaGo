require("dotenv").config();

const express = require("express");
const cors = require("cors");
const TelegramBot = require("node-telegram-bot-api");

const app = express();

app.use(cors());
app.use(express.json());

const bot = new TelegramBot(process.env.BOT_TOKEN);

const CHAT_ID = process.env.CHAT_ID;

app.get("/", (req, res) => {
    res.send("✅ SamsaGo Server is running");
});
app.post("/order", async (req, res) => {

    try {

        const {
            name,
            phone,
            address,
            comment,
            items,
            total
        } = req.body;

        let message =
🥟 Новый заказ SamsaGo

👤 Имя: ${name}
📞 Телефон: ${phone}
📍 Адрес: ${address}

💬 Комментарий:
${comment || "-"}

🛒 Заказ:
;

        items.forEach(item => {
            message += • ${item.name} × ${item.qty}\n;
        });

        message += \n💰 Итого: ${total} сум;

        await bot.sendMessage(CHAT_ID, message);

        res.json({
            success: true
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false
        });

    }

});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(🚀 Server started on port ${PORT});

});
