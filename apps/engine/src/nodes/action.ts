import type { Job, JobNotification, TODO } from "@repo/definitions/types";
/**
 Contains utility functions for executing different types of jobs.
 
 */








export async function executeGmailJob(job: Job):Promise<TODO> {
  console.log("Executing Gmail job:", job.id);

  // logic here
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log("Gmail job completed:", job.id);
  return {
    "message": job
  }
}


// create a wraper for ai here to handle different ai providers like openai , cohere , etc
