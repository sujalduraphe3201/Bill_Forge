import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import UserRoutes from "./routes/userRoutes"
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
    res.send(`BillForge main route running on ${PORT}`);
});
app.use("/api/v1/",UserRoutes)


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
