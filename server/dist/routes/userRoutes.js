"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("../prisma/client");
const router = (0, express_1.Router)();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, tenantId, } = req.body;
    if (!username || !email || !password || !tenantId) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }
    try {
        const dbinput = yield client_1.prisma.
        ;
    }
    catch (error) {
        res.status(500).json({ message: "Error Creating user", error });
        return;
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
exports.default = router;
