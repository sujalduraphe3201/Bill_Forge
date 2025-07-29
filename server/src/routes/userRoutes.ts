import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma/client";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "default";

router.post("/signup", async (req, res) => {

    const { username, email, password, tenantName } = req.body;

    if (!username || !email || !password || !tenantName) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // const existingTenant = await prisma.tenant.findUnique({
        //     where: { id: tenantId },
        // });
        // if (existingTenant) {
        //     return res.status(404).json({ message: "Tenant not found" });
        // }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const tenant = await prisma.tenant.create({
            data: {
                tenantName
            }
        })
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                tenantId: tenant.id
            },
        });

        const token = jwt.sign(
            { userId: user.id, tenantId: user.tenantId },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.status(201).json({ token, user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error creating user", error });
    }
});


export default router;