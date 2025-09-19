import { CredentialModel } from "@repo/backend-core/db";
import { Noderesponse } from "@repo/definitions/types";
import axios from "axios";

export async function telegramExecuter(message: string, credential: string, id: string): Promise<Noderesponse> {
	try {
		const data = await CredentialModel.findById(credential);
		if (!data) throw new Error("Credential not found");
		const { chatId, token } = data.data;
		const url = `https://api.telegram.org/bot${token}/sendMessage`;
		const response = await axios.post(url, {
			chat_id: chatId,
			text: message,
		});
		return {
			status: "succes",
			node: id,
			message: "Telegram message  send succesfully",
			data: response,
		};
	} catch (error) {
		console.error("Error in telegramExecuter:", error);
		return {
			status: "fail",
			node: id,
			message: "Telegram message hasnt send succesfully",
			data:''
		};
	}
}
