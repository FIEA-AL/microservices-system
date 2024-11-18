const cors = require("cors")
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const PORT = 3000;

// Middleware to parse JSON data
app.use(cors()).use(bodyParser.json());


// Path to the JSON file
const DATA_FILE = "./qrcodes.json";

// Route to get all QR codes
app.get("/qrcodes", (req, res) => {
  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading data:", err);
      res.status(500).send("Error reading data.");
    } 
    const qrcodes = JSON.parse(data || "[]");
    res.status(200).json(qrcodes);
  });
});

// Route to save a new QR code
app.post("/qrcodes", (req, res) => {
  const newQRCode = req.body;
  // Read the current data
  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading data:", err);
      res.status(500).send("Error reading data.");
    } else {
      const qrcodes = JSON.parse(data || "[]");

      // Add the new QR code to the list
      qrcodes.push(newQRCode);

      // Save the updated list back to the file
      fs.writeFile(DATA_FILE, JSON.stringify(qrcodes, null, 2), (err) => {
        if (err) {
          console.error("Error saving data:", err);
          res.status(500).send("Error saving data.");
        } else {
          res.status(201).send("QR code saved.");
        }
      });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
