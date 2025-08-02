import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import UserRoutes from "./routes/userRoutes"
import { prisma } from './prisma/client';
import dashRouter from './routes/dashboard';
dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());
console.log("JWT_SECRET:", process.env.JWT_SECRET);
app.get('/', async (req, res) => {
    // const users = await prisma.user.findMany({
    //     include: {
    //         tenant: true,
    //     }

    // });
    // res.json(users);
});

app.use("/api/v1/", UserRoutes)
// app.get("/", (req, res) => {
//     res.send(
//         "main route"
//     )
// })
app.use("/api/v1/", dashRouter)


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
