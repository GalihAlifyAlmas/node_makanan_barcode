import express from "express";
import { generateQRCodeForMakanans } from "../controller/MakananController.js";

const apiRouter = express.Router();

// API route to get all makanans with dynamically generated barcodes
apiRouter.get("/makanans", generateQRCodeForMakanans);

export default apiRouter;
