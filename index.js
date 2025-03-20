const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connexion MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connecté"))
  .catch((err) => console.log("❌ Erreur MongoDB:", err));

// Schéma & Modèle
const ItemSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model("Item", ItemSchema);

// Routes CRUD
app.get("/", (req, res) => res.send("API MongoDB Déployée sur Vercel 🚀"));

app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post("/items", async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.json(newItem);
});

app.delete("/items/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Item supprimé" });
});

// Lancement en local
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Serveur sur http://localhost:${PORT}`));

module.exports = app; // ⚠️ Important pour Vercel
