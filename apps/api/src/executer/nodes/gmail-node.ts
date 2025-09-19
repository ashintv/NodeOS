import { CredentialModel } from "@repo/backend-core/db";
import { Resend } from "resend";
import { config } from "dotenv";
config();
import { Noderesponse } from "@repo/definitions/types";
export async function gmailExecuter(
	message: string,
	to: string[],
	id: string,
	credential?: string
): Promise<Noderesponse> {
	try {
		let key;
		if (credential) {
			key = (await CredentialModel.findById(credential))?.data;
		} else {
			key = process.env.RESEND_KEY;
		}
		const resend = new Resend(key);
		let data: any = [];
		to.forEach(async (e) => {
			console.log(e);

			// const data_ = await resend.emails.send({
			// 	from: "noreply@mails.ashin.live",
			// 	to: e,
			// 	subject: "Message from express",
			// 	html: getMailTemplate(message),
			// });
			data.push("data_");
		});
		return {
			status: "succes",
			node: id,
			message: "Mail send Successfully",
			data: data,
		};
	} catch (e) {
		console.log(e);
		return {
			status: "fail",
			node: id,
			message: "mail hasnt send succesfully",
			data: "",
		};
	}
}

function getMailTemplate(message: string) {
	return `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Workflow Notification</title>
			<style>
				body {
					margin: 0;
					padding: 0;
					font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
					background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
					min-height: 100vh;
				}
				.container {
					max-width: 600px;
					margin: 0 auto;
					padding: 40px 20px;
				}
				.email-card {
					background: white;
					border-radius: 16px;
					box-shadow: 0 20px 40px rgba(0,0,0,0.1);
					overflow: hidden;
					position: relative;
				}
				.header {
					background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
					padding: 40px 30px;
					text-align: center;
					color: white;
				}
				.header h1 {
					margin: 0;
					font-size: 28px;
					font-weight: 600;
					letter-spacing: -0.5px;
				}
				.header p {
					margin: 8px 0 0 0;
					opacity: 0.9;
					font-size: 16px;
				}
				.content {
					padding: 40px 30px;
				}
				.message-box {
					background: #f8fafc;
					border-left: 4px solid #667eea;
					border-radius: 8px;
					padding: 24px;
					margin: 24px 0;
				}
				.message-box p {
					margin: 0;
					font-size: 16px;
					line-height: 1.6;
					color: #334155;
				}
				.footer {
					text-align: center;
					padding: 24px 30px;
					border-top: 1px solid #e2e8f0;
					background: #f8fafc;
				}
				.footer p {
					margin: 0;
					color: #64748b;
					font-size: 14px;
				}
				.badge {
					display: inline-block;
					background: #10b981;
					color: white;
					padding: 6px 12px;
					border-radius: 20px;
					font-size: 12px;
					font-weight: 600;
					text-transform: uppercase;
					letter-spacing: 0.5px;
					margin-bottom: 16px;
				}
				@media (max-width: 640px) {
					.container {
						padding: 20px 10px;
					}
					.header, .content, .footer {
						padding-left: 20px;
						padding-right: 20px;
					}
				}
			</style>
		</head>
		<body>
			<div class="container">
				<div class="email-card">
					<div class="header">
						<h1>Workflow Notification</h1>
						<p>Your automation has been executed successfully</p>
					</div>
					<div class="content">
						<div class="badge">✨ Success</div>
						<h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 20px;">Message Details</h2>
						<div class="message-box">
							<p>${message}</p>
						</div>
						<p style="color: #64748b; font-size: 14px; margin: 24px 0 0 0;">
							This email was sent automatically by your workflow automation system.
						</p>
					</div>
					<div class="footer">
						<p>Powered by Super30 Workflow Engine</p>
					</div>
				</div>
			</div>
		</body>
		</html>
	`;
}

gmailExecuter("this is a sample mail", ["ashintv2003@gmail.com"], "asbfkjljs");
