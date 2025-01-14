import "reflect-metadata";
import { PostgresDatabase } from "./data";
import { envs } from "./config/envs";
import { Server } from "./presentation/server";
import { AppRoutes } from "./presentation/routes";

(async () => {
  main();
})();

async function main() {
  //postgresql://username:password@host:port/database?sslmode=require

  const postgres = new PostgresDatabase({
    host: envs.DB_HOST,
    port: envs.DB_PORT,
    username: envs.DB_USERNAME,
    password: envs.DB_PASSWORD,
    database: envs.DB_DATABASE,
  });

  await postgres.connect();

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });
  await server.start();
}
