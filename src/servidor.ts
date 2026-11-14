import "dotenv/config"
import express from "express";

import { prisma } from "./prisma";


const app = express();




const PORTA = (process.env.PORT) || 3000;

app.use((req, res, next) => {

    next()
});
app.use(express.json());



app.use(express.static("public"));

app.get("/api/perfis", async (req, res) => {
    try {
        const perfis = await prisma.perfil.findMany({
            orderBy: { id: "asc" },
            select: {
                id: true,
                name: true,
                titulo: true,
                _count: {
                    select: { projetos: true, certificado: true }
                }
            }
        });
        res.json(perfis);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao buscar perfis" });
    }
});

app.listen(PORTA, () => {
    console.log(`Profile API no http://localhost:${PORTA}`);
});















export function servidor() {

}