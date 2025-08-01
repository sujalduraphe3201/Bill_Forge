import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma/client";
import authMiddleware from "../middleware/middleware";
const router = Router();

const getJwtSecret = () => process.env.JWT_SECRET || "dev-secret";
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

        const hashedPassword = await bcrypt.hash(password, 12);

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
            getJwtSecret(),
            { expiresIn: "2d" }
        );

        return res.status(201).json({ token, user, tenant });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error creating user", error });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            {
                userId: user.id,
                tenantId: user.tenantId,
            }, getJwtSecret(),
            { expiresIn: "7d" }
        );

        return res.status(200).json({ message: "Login successful", token, });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error logging in", error });
    }
});


router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.userId,
            },
            include: {
                tenant: true,
            },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                tenantId: user.tenantId,
                tenantName: user.tenant?.tenantName || "Unknown",
            },
        });
    } catch (err) {
        console.error("Error in /me:", err);
        return res.status(500).json({ message: "Failed to fetch user" });
    }
});




export default router;