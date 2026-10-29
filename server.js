const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));
// Sample pharmacy products
const products = [
  
  { id: 1, name: "Paracetamol", price: 50 },
  { id: 2, name: "Vitamin C", price: 120 },
  { id: 3, name: "Hand Sanitizer", price: 80 },
  { id: 4, name: "First Aid Kit", price: 250 }
];

// Backend home page
app.get("/", (req, res) => {
  res.send("Online Pharmacy Backend is working!");
});

// Get all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});