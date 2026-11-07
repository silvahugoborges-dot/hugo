import { PrismaClient } from "./generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import "dotenv/config";

// Inicializa a conexão SQLite com o adapter do Prisma v7
const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL || "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

const lista = await prisma.jogo.findMany({
    include: {
        personagens: true,
        conquistas: true,
        plataformas: { include: { plataforma: true } },
    },
});
console.dir(lista, { depth: null }); // mostra tudo, com as tabelas ligadas por dentro
