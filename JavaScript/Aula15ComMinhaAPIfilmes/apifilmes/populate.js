import mongoose from "mongoose";
import Film from "./models/Film.js";

const MONGODB_URI = "mongodb://localhost:27017/filmsDB";

const initialFilms = [
    {
        codigo: "F001",
        titulo: "A Origem",
        genero: "Ficção Científica",
        autores: ["Christopher Nolan"],
        ano: 2010,
        valor: 29.99
    },
    {
        codigo: "F002",
        titulo: "Matrix",
        genero: "Ficção Científica",
        autores: ["Lana Wachowski", "Lilly Wachowski"],
        ano: 1999,
        valor: 25.50
    },
    {
        codigo: "F003",
        titulo: "Pulp Fiction: Tempo de Violência",
        genero: "Crime",
        autores: ["Quentin Tarantino"],
        ano: 1994,
        valor: 22.00
    },
     {
        codigo: "F004",
        titulo: "O Poderoso Chefão",
        genero: "Crime",
        autores: ["Francis Ford Coppola"],
        ano: 1972,
        valor: 35.00
    },
    {
        codigo: "F005",
        titulo: "Interestelar",
        genero: "Ficção Científica",
        autores: ["Christopher Nolan"],
        ano: 2014,
        valor: 31.99
    },
    {
        codigo: "F006",
        titulo: "A Viagem de Chihiro",
        genero: "Animação",
        autores: ["Hayao Miyazaki"],
        ano: 2001,
        valor: 20.00
    },
    {
        codigo: "F007",
        titulo: "Parasita",
        genero: "Thriller",
        autores: ["Bong Joon-ho"],
        ano: 2019,
        valor: 28.50
    },
    {
        codigo: "F008",
        titulo: "Gladiador",
        genero: "Épico",
        autores: ["Ridley Scott"],
        ano: 2000,
        valor: 27.90
    },
    {
        codigo: "F009",
        titulo: "Forrest Gump: O Contador de Histórias",
        genero: "Drama",
        autores: ["Robert Zemeckis"],
        ano: 1994,
        valor: 24.00
    },
    {
        codigo: "F010",
        titulo: "O Senhor dos Anéis: A Sociedade do Anel",
        genero: "Fantasia",
        autores: ["Peter Jackson"],
        ano: 2001,
        valor: 33.75
    }
];

async function populateDB() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Conectado ao MongoDB para população.");

        // Limpa a coleção antes de inserir para evitar duplicatas.
        await Film.deleteMany({});
        console.log("Coleção de filmes limpa.");

        await Film.insertMany(initialFilms);
        console.log("10 filmes inseridos com sucesso!");

    } catch (error) {
        console.error("Erro ao popular o banco de dados:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Desconectado do MongoDB")
    }
}

populateDB();