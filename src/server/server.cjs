const cors = require("cors")
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const jwt = require("jsonwebtoken")

const app = express();
const PORT = 3000;

// Middleware to parse JSON data
app.use(cors()).use(bodyParser.json());



// Path to the JSON file
const QR_CODE_JSON = "./qrcodes.json";
const USER_JSON = "./user.json";

// Route to get all QR codes
app.get("/qrcodes", (req, res) => {
  fs.readFile(QR_CODE_JSON, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading data:", err);
      res.status(500).send("Error reading data.");
    } 
    const qrcodes = JSON.parse(data || "[]");
    res.status(200).json(qrcodes);
  });
});

app.get("/qrcodes/:index", (req, res) => {
  const index = parseInt(req.params.index);


  fs.readFile(QR_CODE_JSON, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading data:", err);
      res.status(500).send("Error reading data.");
    } 
    const qrcodes = JSON.parse(data || "[]");
    if (index < qrcodes.length){
      res.status(200).json(qrcodes[index])
    }
    else{
      console.error("Qrcode not found", err);
      res.status(500).send("Qrcode not found");
    }

    
  });
});

app.get("/user", (req, res) => {
  fs.readFile(USER_JSON, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading data:", err);
      res.status(500).send("Error reading data.");
    } 
    const users = JSON.parse(data || "[]");
    res.status(200).json(users);
  });
});

// Route to save a new QR code
app.post("/qrcodes", (req, res) => {
  const newQRCode = req.body;
  // Read the current data
  fs.readFile(QR_CODE_JSON, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading data:", err);
      res.status(500).send("Error reading data.");
    } else {
      const qrcodes = JSON.parse(data || "[]");

      // Add the new QR code to the list
      qrcodes.push(newQRCode);

      // Save the updated list back to the file
      fs.writeFile(QR_CODE_JSON, JSON.stringify(qrcodes, null, 2), (err) => {
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

app.post("/users", (req, res) => {
  const newUser = req.body;
  // Read the current data
  fs.readFile(USER_JSON, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading data:", err);
      res.status(500).send("Error reading data.");
    } else {
      const users = JSON.parse(data || "[]");

      // Add the new QR code to the list
      users.push(newUser);

      // Save the updated list back to the file
      fs.writeFile(USER_JSON, JSON.stringify(users, null, 2), (err) => {
        if (err) {
          console.error("Error saving data:", err);
          res.status(500).send("Error saving data.");
        } else {
          res.status(201).send("User saved.");
        }
      });
    }
  });
});


// Route to delete a QR code by index
app.delete("/qrcodes/:index", (req, res) => {
  const index = parseInt(req.params.index);

  // Read the current data
  fs.readFile(QR_CODE_JSON, "utf8", (err, data) => {
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
        fs.writeFile(QR_CODE_JSON, JSON.stringify(qrcodes, null, 2), (err) => {
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

// Route to delete a QR code by index
app.delete("/users/:index", (req, res) => {
  const index = parseInt(req.params.index);

  // Read the current data
  fs.readFile(USER_JSON, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading data:", err);
      res.status(500).send("Error reading data.");
    } else {
      const users = JSON.parse(data || "[]");

      // Check if the index is valid
      if (index >= 0 && index < qrcodes.length) {
        // Remove the QR code at the specified index
        users.splice(index, 1);

        // Save the updated list back to the file
        fs.writeFile(USER_JSON, JSON.stringify(users, null, 2), (err) => {
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

app.post("/auth/login", async (req, res) => {
  const user = req.body;
  const { email, password } = user;
  fs.readFile(USER_JSON, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading data:", err);
      res.status(500).send("Error reading data.");
    } else {
      const users = JSON.parse(data || "[]");

      const index = users.findIndex(user => user.email === email);

      if (index !== -1) {
        const isPasswordMatched =
        users[index].password === password;
        if (isPasswordMatched){
          const token = jwt.sign(
            { _id: index, email: users[index] },
            "YOUR_SECRET",
            {
              expiresIn: "1d",
            }
          );

          res.status(200).json({
            status: 200,
            success: true,
            message: "login success",
            token: token,
          });
        } else{
          res.status(400).json({
            status: 400,
            success: false,
            message: "wrong password",
          });
        }
      } else {
        res.status(404).json({
          status: 404,
          success: false,
          message: "User not found",
        });
      }
  }});


    // ** if the email and password is valid create a token

    /*
    To create a token JsonWebToken (JWT) receive's 3 parameter
    1. Payload -  This contains the claims or data you want to include in the token.
    2. Secret Key - A secure key known only to the server used for signing the token.
    3. expiration -  Additional settings like token expiration or algorithm selection.
    */

    // !! Don't Provide the secret openly, keep it in the .env file. I am Keeping Open just for demonstration


    // send the response
    
});

// Route to update a QR code by index
app.put("/qrcodes/:index", (req, res) => {
  const index = parseInt(req.params.index);
  const updatedQRCode = req.body; // New QR code object from the client

  // Read the current data
  fs.readFile(QR_CODE_JSON, "utf8", (err, data) => {
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
        fs.writeFile(QR_CODE_JSON, JSON.stringify(qrcodes, null, 2), (err) => {
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
