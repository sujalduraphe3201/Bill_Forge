import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token not provided" });
    }

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; tenantId: string };
        req.userId = decoded.userId;
        req.tenantId = decoded.tenantId;
        next();
    } catch (error) {
        console.error("JWT error:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
};

export default authMiddleware;
