import {Request, Response, NextFunction} from "express";

import {PubSub} from "@google-cloud/pubsub";


const pubMessage = (req: Request, res: Response, next: NextFunction) => {
  try {
    const TOPIC_NAME = "alert-messages";
    const pubsub = new PubSub();
    const topic = pubsub.topic(TOPIC_NAME);
    const ip = req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress || req.info.remoteAddress;
    const buffer = Buffer.from(JSON.stringify({ip, ...res.locals}));
    topic.publishMessage({data: `New request to "users" API from IP ${buffer}`});
  } catch (err) {
    console.log(err);
  }
  next();
};

export {pubMessage};
