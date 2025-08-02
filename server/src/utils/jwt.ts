import jwt from "jsonwebtoken"
const getJwtSecret = () => process.env.JWT_SECRET || "dev-secret";


export const signToken = (payload: object) => {
    return jwt.sign(payload, getJwtSecret(), { expiresIn: "1h" });
};
