import { Server } from "./presentation/server";
import { AppRoutes } from "./presentation/routes";
import { envs } from "./config";
import { conectionDB } from "./data";

(async() => {
    await conectionDB();
    
    const server = new Server({
        port: envs.PORT,
        publicPaht: envs.PUBLIC_PATH,
        routes: AppRoutes.routes,
    });

    server.start();
})();

