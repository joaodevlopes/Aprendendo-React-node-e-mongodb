import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from 'cors'

const prisma = new PrismaClient();

const app = express();

app.use(express.json()); // Para processar JSON no corpo da requisição

app.use(cors()) /* liberado para qualquer página acessar, em ambientes maiores isso é configurado dentro do cors('AQUI') */

app.post("/users", async (request, response) => {
    console.log("Usuário criado:", request.body);

    await prisma.user.create({
        data: {
            email: request.body.email,
            name: request.body.name,
            age: request.body.age,
        },
    });

    response.status(201).send("Usuario criado com sucesso ");
});

app.get("/users", async (request, response) => {
    console.log("Listando usuários");

    try {
        let users;

        
        if (request.query.name) {
            users = await prisma.user.findMany({
                where: {
                    name: request.query.name,
                    email: request.query.email,
                    age:request.query.age
                },
            });
        } else {
            users = await prisma.user.findMany();
        }

        response.status(200).json(users);
    } catch (error) {
        response
            .status(500)
            .json({ error: "Erro ao buscar usuários", details: error.message });
    }
});

app.put("/users/:id", async (request, response) => {
    console.log("Editando usuário:", request.body);

    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: request.params.id,
            },
            data: {
                email: request.body.email,
                name: request.body.name,
                age: request.body.age,
            },
        });

        response.status(200).json(updatedUser);
    } catch (error) {
        response
            .status(500)
            .json({ error: "Erro ao atualizar usuário", details: error.message });
    }
});

app.delete("/users/:id", async (request, response) => {
    try {
        await prisma.user.delete({
            where: {
                id: request.params.id,
            },
        });

        response.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
        response
            .status(500)
            .json({ error: "Erro ao deletar usuário", details: error.message });
    }
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
