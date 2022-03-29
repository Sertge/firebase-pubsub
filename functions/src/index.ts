import * as functions from "firebase-functions";
import * as bodyParser from "body-parser";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";
import {routesConfig} from "./users/routes-config";

admin.initializeApp();
const app = express();
app.use(bodyParser.json());
app.use(cors({origin: true}));
routesConfig(app);

export const api = functions.https.onRequest(app);

