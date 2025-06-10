// index.js (ou app.js)
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Film from "./models/Film.js"; // Importa o modelo Film

const app = express();
app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", true);

// Conexão com o MongoDB
mongoose.connect("mongodb://localhost:27017/filmsDB")
    .then(() => {
        console.log("BackEnd: Conectado ao MongoDB com sucesso!");
    })
    .catch((err) => {
        console.error("BackEnd: Erro ao conectar ao MongoDB:", err);
        process.exit(1);
    });

// --- ROTAS DA API ---

// 1. Rota de Teste
app.get("/", (req, res) => {
    console.log("BackEnd: Recebida requisição GET na rota /");
    res.json("API de Filmes Conectada e funcionando!");
});

// 2. Criar um novo filme (POST)
app.post("/films", async (req, res) => {
    console.log("BackEnd: Recebida requisição POST para /films. Body:", req.body);
    try {
        const newFilm = new Film(req.body);
        const savedFilm = await newFilm.save();
        console.log("BackEnd: Filme criado com sucesso:", savedFilm);
        res.status(201).json(savedFilm);
    } catch (err) {
        console.error("BackEnd: Erro ao criar filme (POST /films):", err);
        if (err.code === 11000) {
            res.status(400).json({ message: "Erro: Código do filme já existe.", error: err.message });
        } else {
            res.status(500).json({ message: "Erro ao criar filme.", error: err.message });
        }
    }
});

// 3. Obter todos os filmes (GET) - COM MAIS LOGS
app.get("/films", async (req, res) => {
    console.log("BackEnd: Recebida requisição GET para /films.");
    try {
        console.log("BackEnd: Tentando buscar filmes do MongoDB...");
        const films = await Film.find();
        console.log("BackEnd: Filmes encontrados:", films.length); // Mostra quantos foram encontrados
        res.status(200).json(films);
    } catch (err) {
        // MUITO IMPORTANTE: CAPTURAR O ERRO AQUI!
        console.error("BackEnd: ERRO CRÍTICO ao buscar filmes (GET /films):", err);
        res.status(500).json({ message: "Erro interno do servidor ao buscar filmes.", error: err.message });
    }
});

// 4. Obter um filme por ID (GET)
app.get("/films/:id", async (req, res) => {
    console.log(`BackEnd: Recebida requisição GET para /films/${req.params.id}`);
    try {
        const film = await Film.findById(req.params.id);
        if (!film) {
            console.log(`BackEnd: Filme com ID ${req.params.id} não encontrado.`);
            return res.status(404).json({ message: "Filme não encontrado." });
        }
        console.log("BackEnd: Filme encontrado:", film.titulo);
        res.status(200).json(film);
    } catch (err) {
        console.error(`BackEnd: Erro ao buscar filme por ID (${req.params.id}):`, err);
        res.status(500).json({ message: "Erro ao buscar filme por ID.", error: err.message });
    }
});

// 5. Atualizar um filme por ID (PUT)
app.put("/films/:id", async (req, res) => {
    console.log(`BackEnd: Recebida requisição PUT para /films/${req.params.id}. Body:`, req.body);
    try {
        const updatedFilm = await Film.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!updatedFilm) {
            console.log(`BackEnd: Filme com ID ${req.params.id} não encontrado para atualização.`);
            return res.status(404).json({ message: "Filme não encontrado para atualização." });
        }
        console.log("BackEnd: Filme atualizado:", updatedFilm.titulo);
        res.status(200).json(updatedFilm);
    } catch (err) {
        console.error(`BackEnd: Erro ao atualizar filme (${req.params.id}):`, err);
        res.status(500).json({ message: "Erro ao atualizar filme.", error: err.message });
    }
});

// 6. Deletar um filme por ID (DELETE)
app.delete("/films/:id", async (req, res) => {
    console.log(`BackEnd: Recebida requisição DELETE para /films/${req.params.id}`);
    try {
        const deletedFilm = await Film.findByIdAndDelete(req.params.id);
        if (!deletedFilm) {
            console.log(`BackEnd: Filme com ID ${req.params.id} não encontrado para exclusão.`);
            return res.status(404).json({ message: "Filme não encontrado para exclusão." });
        }
        console.log("BackEnd: Filme deletado:", deletedFilm.titulo);
        res.status(200).json({ message: "Filme deletado com sucesso!" });
    } catch (err) {
        console.error(`BackEnd: Erro ao deletar filme (${req.params.id}):`, err);
        res.status(500).json({ message: "Erro ao deletar filme.", error: err.message });
    }
});

// Inicia o servidor Express
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`BackEnd da API de Filmes conectado na porta ${PORT}!`);
});
