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

// Route to delete a QR code by index
app.delete("/qrcodes/:index", (req, res) => {
  const index = parseInt(req.params.index);

  // Read the current data
  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading data:", err);
      res.status(500).send("Error reading data.");
    } else {
      const qrcodes = JSON.parse(data || "[]");

      // Check if the index is valid
      if (index >= 0 && index < qrcodes.length) {
        // Remove the QR code at the specified index
        qrcodes.splice(index, 1);

        // Save the updated list back to the file
        fs.writeFile(DATA_FILE, JSON.stringify(qrcodes, null, 2), (err) => {
          if (err) {
            console.error("Error saving data:", err);
            res.status(500).send("Error saving data.");
          } else {
            res.status(200).send("QR code deleted.");
          }
        });
      } else {
        res.status(400).send("Invalid index.");
      }
    }
  });
});

// Route to update a QR code by index
app.put("/qrcodes/:index", (req, res) => {
  const index = parseInt(req.params.index);
  const updatedQRCode = req.body; // New QR code object from the client

  // Read the current data
  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading data:", err);
      res.status(500).send("Error reading data.");
    } else {
      const qrcodes = JSON.parse(data || "[]");

      // Check if the index is valid
      if (index >= 0 && index < qrcodes.length) {
        // Update the QR code at the specified index
        qrcodes[index] = updatedQRCode;

        // Save the updated list back to the file
        fs.writeFile(DATA_FILE, JSON.stringify(qrcodes, null, 2), (err) => {
          if (err) {
            console.error("Error saving data:", err);
            res.status(500).send("Error saving data.");
          } else {
            res.status(200).send("QR code updated.");
          }
        });
      } else {
        res.status(400).send("Invalid index.");
      }
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
