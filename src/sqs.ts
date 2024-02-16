import { SQS } from "aws-sdk";
import dotenv from 'dotenv';
dotenv.config()

const sqs = new SQS({
  accessKeyId: process.env.AWS_ACCESS_KEY_DEMO,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_DEMO,
  region: 'ap-southeast-1'
});




// Send the message to the queue


export function lpush(id: string) {
  sqs.sendMessage({

    QueueUrl: process.env.AWS_QUEUE_URL!!,
    MessageBody: JSON.stringify({ "build-queue": id }),
  }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Message sent successfully!', data);
  });
}