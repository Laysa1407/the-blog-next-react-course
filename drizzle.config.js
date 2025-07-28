import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./src/app/db/drizzle/migrations",
    schema: "./src/app/db/drizzle/schemas.ts",
    dialect: "sqlite",
    dbCredentials: {
        url: "./db.sqlite3",
    },
});
