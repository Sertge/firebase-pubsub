import {Request, Response, NextFunction} from "express";

import {PubSub} from "@google-cloud/pubsub";


const pubMessage = (req: Request, res: Response, next: NextFunction) => {
  const TOPIC_NAME = "messages";
  const pubsub = new PubSub();
  const topic = pubsub.topic(TOPIC_NAME);
  const buffer = Buffer.from(req.socket.remoteAddress);
  topic.publish(buffer);
};

export = pubMessage
