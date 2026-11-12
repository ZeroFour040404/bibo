import "dotenv/config";

export const config = {
    PORT: process.env.PORT || 8000,
    DB_PATH: process.env.DB_PATH || "./data/database.db",
    CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
    TOKEN_SECRET: process.env.TOKEN_SECRET || "say-wallahi-bro",
};