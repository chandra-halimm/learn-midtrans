"use client";
import React from "react";
import { useState } from "react";

const page = () => {
  const [transactionToken, setTransactionToken] = useState(null);

  const handlePayment = async () => {
    try {
      const response = await fetch("http://localhost:3001/create-transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transaction_details: {
            order_id: 123,
            gross_amount: 10000,
          },
          customer_details: {
            first_name: "Budi",
            last_name: "Pratama",
            email: "budi.pra@example.com",
            phone: "08111222333",
          },
        }),
      });

      const data = await response.json();
      setTransactionToken(data.token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Pembayaran</h1>
      <button onClick={handlePayment}>Bayar Sekarang</button>
      {transactionToken && (
        <div>
          <iframe
            src={`https://app.sandbox.midtrans.com/snap/v2/vtweb/${transactionToken}`}
            width="100%"
            height="500px"
            frameBorder="0"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default page;
