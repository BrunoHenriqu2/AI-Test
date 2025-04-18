import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export default async function generateGemini(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Metodo não permitido: " + req.method });
    }
    console.log(req.body)
    const prompt = `${req.body.message} (resuma o máximo possível e faça questão da resposta estar em PT-BR)`;
    
    try {
        const generativeRes = await model.generateContent([prompt]);
        console.log(res.response.text())
        return res.json({responseMessage: generativeRes.response.text()});
    } catch (erro) {
        console.error("Erro ao obter texto: ", erro.message, erro);
        throw new Error("Erro ao obter o texto do Gemini.");
    }

}