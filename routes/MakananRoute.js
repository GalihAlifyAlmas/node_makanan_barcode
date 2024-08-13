// MakananRoute.js
import express from 'express';
import {
    getMakanans,
    updateMakanans,
    getMakanansById,
    deleteMakanans,
    saveMakanans,
    showMakanansWithBarcodesAndQR,
    generateQRCodeForMakanans,
} from '../controller/MakananController.js'; // Ensure this path is correct

const router = express.Router();

// Define routes
router.post("/makanan/save", saveMakanans);
router.get("/makanan", getMakanans);
router.get("/makanan/:id", getMakanansById);
router.get("/makanan/delete/:id", deleteMakanans);
router.put("/makanan/update/:id", updateMakanans);

router.get("/view-makanans", showMakanansWithBarcodesAndQR);
router.get("/generate-qr-codes", generateQRCodeForMakanans);

export default router;
