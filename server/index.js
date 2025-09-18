import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./db.js";
import seedDatabase from "./utils/seedDatabase.js";

import serviceRoutes from "./routes/services.js";
import contentRoutes from "./routes/content.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

connectDB().then(() => {
  seedDatabase();
});

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/services", serviceRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/auth", authRoutes);

// --- DEPLOYMENT CONFIGURATION ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  // Determine o caminho para a pasta 'dist' do frontend
  const frontendDistPath = path.join(__dirname, "..", "dist");

  // Sirva os arquivos estáticos do build do Vite
  app.use(express.static(frontendDistPath));

  // Para qualquer outra rota, sirva o index.html do frontend
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(frontendDistPath, "index.html"));
  });
}
// --- END DEPLOYMENT CONFIGURATION ---

const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>
  console.log(
    `Server running in ${
      process.env.NODE_ENV || "development"
    } mode on port ${PORT}`
  )
);
