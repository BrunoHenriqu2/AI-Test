import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export default async function generateDescriptionGemini(imageBuffer) {
    const prompt = "Gere uma descrição em PT-BR para a seguinte imagem";

    try {
        const res = await model.generateContent([prompt]);
        return res.response.text() || "...";
    } catch (erro) {
        console.error("Erro ao obter texto: ", erro.message, erro);
        throw new Error("Erro ao obter o texto do Gemini.");
    }

}