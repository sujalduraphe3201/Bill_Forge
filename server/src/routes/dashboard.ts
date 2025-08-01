import { Router } from "express";
import authMiddleware from "../middleware/middleware";
import { prisma } from "../prisma/client";

const dashRouter = Router();


dashRouter.get("/dashboard", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const UserDetails = await prisma.user.findUnique({
        where: { id: userId }
    })
    res.send(UserDetails);
})

export default dashRouter;