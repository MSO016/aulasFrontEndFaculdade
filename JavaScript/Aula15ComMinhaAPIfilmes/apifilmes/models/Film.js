import mongoose from "mongoose";

const filmSchema = new mongoose.Schema({
    codigo: { type: String, required: true, unique: true},
    titulo: { type: String, required: true },
    genero: { type: String, required: true },
    autores: { type: [String], required: true },
    ano: { type: Number, required: true },
    valor: { type: Number, required: true },
});

const Film = mongoose.model("Film", filmSchema);

export default Film;

// Film.js serve apra definir um documento de registro dos filmes que sera ultilizado pelo mongodb.
// especificamente o "unique: true" do primeiro item (linha: 4) garante que não sera repetido os filmes com o mesmo id.
