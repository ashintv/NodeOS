import axios from "axios";

async function sendBotMessage(chatId: string, text: string, token: string) {
	const url = `https://api.telegram.org/bot${token}/sendMessage`;
	const response = await axios.post(url, {
		chat_id: chatId,
		text: text,
	});
	return response.data;
}



