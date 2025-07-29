import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "default";

interface DecodedToken {
    userId: string;
    tenantId: string;
    iat: number;
    exp: number;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization token missing or malformed" });
    }

    const token = header.split(" ")[1]; // 🛠️ FIXED: You had split("") which is wrong

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

        req.userId = decoded.userId;
        req.tenantId = decoded.tenantId;

        next(); // ✅ Continue to the next middleware or route
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export default authMiddleware;
