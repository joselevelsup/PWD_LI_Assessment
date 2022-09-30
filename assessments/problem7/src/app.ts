import * as dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";

dotenv.config();

import { doctorRouter, patientRouter, appointmentRouter } from "./routers";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/doctors", doctorRouter);

app.use("/patients", patientRouter);

app.use("/appointments", appointmentRouter);

export default app;
