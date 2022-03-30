import {Request, Response, NextFunction} from "express";

import {PubSub} from "@google-cloud/pubsub";
import {getClientIp} from "@supercharge/request-ip";

const pubMessage = (req: Request, res: Response, next: NextFunction) => {
  try {
    const TOPIC_NAME = "alert-messages";
    const pubsub = new PubSub();
    const topic = pubsub.topic(TOPIC_NAME);
    const buffer = Buffer.from(JSON.stringify({ip: getClientIp(req), ...res.locals}));
    topic.publishMessage({data: `New request to "users" API from IP ${buffer}`});
  } catch (err) {
    console.log(err);
  }
  next();
};

export {pubMessage};
