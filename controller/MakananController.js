// MakananController.js
import Makanans from "../models/MakananModels.js";
import bwipjs from "bwip-js";
import QRCode from "qrcode";

// Get all makanans
export const getMakanans = async (req, res) => {
    try {
        const makanans = await Makanans.findAll();
        res.status(200).json(makanans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get makanan by ID
export const getMakanansById = async (req, res) => {
    try {
        const makanan = await Makanans.findOne({ where: { id: req.params.id } });
        if (makanan) {
            res.status(200).json(makanan);
        } else {
            res.status(404).json({ message: "Makanan not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Save a new makanan
export const saveMakanans = async (req, res) => {
    try {
        const newMakanan = await Makanans.create(req.body);
        res.status(201).json(newMakanan);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update makanan by ID
export const updateMakanans = async (req, res) => {
    try {
        const makanan = await Makanans.findOne({ where: { id: req.params.id } });
        if (makanan) {
            await makanan.update(req.body);
            res.status(200).json({ message: "Makanan updated successfully" });
        } else {
            res.status(404).json({ message: "Makanan not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete makanan by ID
export const deleteMakanans = async (req, res) => {
    try {
        const makanan = await Makanans.findOne({ where: { id: req.params.id } });
        if (makanan) {
            await makanan.destroy();
            res.status(200).json({ message: "Makanan deleted successfully" });
        } else {
            res.status(404).json({ message: "Makanan not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to display all makanans with barcodes and QR codes
export const showMakanansWithBarcodesAndQR = async (req, res) => {
    try {
        const makanans = await Makanans.findAll();
        for (const makanan of makanans) {
            const barcodeText = makanan.kode_makanan || makanan.nama_makanan;

            // Generate barcode using bwip-js
            const barcodePng = await new Promise((resolve, reject) => {
                bwipjs.toBuffer(
                    {
                        bcid: "code128",
                        text: barcodeText,
                        scale: 3,
                        height: 10,
                        includetext: true,
                        textxalign: "center",
                    },
                    (err, png) => {
                        if (err) reject(err);
                        else resolve(png);
                    }
                );
            });

            makanan.barcodeBase64 = `data:image/png;base64,${barcodePng.toString("base64")}`;

            // Generate QR code using qrcode
            const qrCodeBase64 = await QRCode.toDataURL(barcodeText);
            makanan.qrCodeBase64 = qrCodeBase64;
        }

        res.render("makanans/index", { makanans });
    } catch (error) {
        console.error("Error in showMakanansWithBarcodesAndQR:", error);
        res.status(500).json({ message: "Error generating barcodes and QR codes", error: error.message });
    }
};

// Function to generate QR codes for makanans and return them in JSON format
export const generateQRCodeForMakanans = async (req, res) => {
    try {
        const makanans = await Makanans.findAll();
        for (const makanan of makanans) {
            const qrCodeText = makanan.kode_makanan || makanan.nama_makanan;
            const qrCodeBase64 = await QRCode.toDataURL(qrCodeText);
            makanan.dataValues.qrCodeBase64 = qrCodeBase64;
        }
        res.status(200).json(makanans);
    } catch (error) {
        console.error("Error generating QR codes:", error);
        res.status(500).json({ message: "Error generating QR codes", error: error.message });
    }
};
