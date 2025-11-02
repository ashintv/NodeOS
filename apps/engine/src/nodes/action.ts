import type { Job, TODO } from "@repo/definitions/types";
import { CredentialModel } from "@repo/backend-core/db";
import nodemailer from "nodemailer";
import mongoose from "mongoose";

/**
 * this file will contain all action node executors
 * GMAIL
 * TELEGRAM
 * MONGODB
 * API CALL
 *
 *
 * ai node is in a separate file apps/engine/src/nodes/ai.ts
 */

/**
 * Fetches a credential by its ID.
 * @param credentialId The ID of the credential to fetch.
 * @returns The fetched credential.
 */
async function fetchCredential(credentialId: string): Promise<TODO> {
  const credential = await CredentialModel.findById(credentialId);
  if (!credential) {
    throw new Error(`Credential not found: ${credentialId}`);
  }
  return credential;
}

/**
 * Executes a Gmail job.
 * @param job The job to execute.
 * @returns The result of the job execution.
 */
export async function executeGmailJob(job: Job): Promise<Job> {
  console.log("Executing Gmail job:", job.id);
  const credential = await fetchCredential(job.creadential as string);
  // mail using nodemailer or googleapis
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: credential.email,
      pass: credential.password,
    },
  });
  const mailOptions = {
    from: credential.email,
    to: job.payload.to,
    subject: job.payload.subject,
    text: job.payload.body,
  };
  await transporter.sendMail(mailOptions);
  job.result = { message: "Email sent successfully" };
  console.log("Gmail job completed:", job.id);
  return job;
}
/**
 *
 * @param job
 * @returns
 */
export async function executeTelegramJob(job: Job): Promise<Job> {
  console.log("Executing Telegram job:", job.id);
  const credential = await fetchCredential(job.creadential as string);
  // send message using telegram bot api
  const response = await fetch(`https://api.telegram.org/bot${credential.botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: job.payload.chatId,
      text: job.payload.message,
    }),
  });
  const data = await response.json();
  if (!data.ok) {
    throw new Error(`Failed to send Telegram message: ${data.description}`);
  }
  job.result = { message: "Message sent successfully" };
  console.log("Telegram job completed:", job.id);
  return job;
}

/**
 * mongo db job executor
 * @param job
 * @returns
 */
export async function excuteMongoDBJob(job: Job): Promise<Job> {
  console.log("Executing DB job:", job.id);
  const credential = await fetchCredential(job.creadential as string);
  mongoose.connect(credential.connectionString, { dbName: credential.dbName });
  const db = mongoose.connection;
  await new Promise((resolve, reject) => {
    db.on("error", (err) => reject(err));
    db.once("open", () => resolve(null));
  });
  const collection = db.collection(job.payload.collection);
  let result;

  switch (job.payload.operation) {
    case "insert":
      result = await collection.insertOne(job.payload.document);
      break;
    case "update":
      result = await collection.updateOne({ _id: job.payload.id }, { $set: job.payload.document });
      break;
    case "delete":
      result = await collection.deleteOne({ _id: job.payload.id });
      break;
    default:
      throw new Error(`Unknown operation: ${job.payload.operation}`);
  }
  job.result = result;
  console.log("DB job completed:", job.id);
  return job;
}

/**
 * api call job executor
 * @param job
 * @returns
 */
export async function ApiCallJob(job: Job): Promise<Job> {
  console.log("Executing API Call job:", job.id);
  const credential = await fetchCredential(job.creadential as string);
  let response = null;
  if (!credential.payload || !credential.payload.token) {
    response = await fetch(job.payload.url, {
      method: job.payload.method || "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    response = await fetch(job.payload.url, {
      method: job.payload.method || "GET",
      headers: {
        Authorization: credential.payload.token,
        "Content-Type": "application/json",
      },
    });
  }
  const data = await response.json();
  job.result = data;
  return job;
}
