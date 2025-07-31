import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import UserRoutes from "./routes/userRoutes"
import { prisma } from './prisma/client';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    const users = await prisma.user.findMany({
        include: {
            tenant: true,
        }

    });
res.json(users);
});

app.use("/api/v1/", UserRoutes)


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
