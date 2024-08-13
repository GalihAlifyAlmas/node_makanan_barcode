//const express = require('express');
import express from 'express';
import FileUpload from 'express-fileupload';
import cors from 'cors';
import ProductRoutes from './routes/MakananRoute.js'


const app = express();

app.use(cors());
app.use(express.json());
app.use(FileUpload());

app.listen(3000,()=> console.log('server running at port : 3000'));