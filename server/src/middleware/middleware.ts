import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "default";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

    try {
        const { userId, tenantId } = jwt.verify(token, JWT_SECRET) as { userId: string; tenantId: string };

        req.userId = userId;
        req.tenantId = tenantId;
        next();
    } catch {
        return res.status(401).json({ message: "Invalid token" });
    }
};

export default authMiddleware;
