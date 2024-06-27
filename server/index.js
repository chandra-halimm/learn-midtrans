// midtrans-express/index.js
const express = require("express");
const midtransClient = require("midtrans-client");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Inisialisasi Midtrans
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});
console.log(snap);

// Endpoint untuk membuat transaksi
app.post("/create-transaction", async (req, res) => {
  try {
    const transactionDetails = req.body;
    const transaction = await snap.createTransaction(transactionDetails);
    res.status(201).json(transaction);
    console.log(transaction);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
