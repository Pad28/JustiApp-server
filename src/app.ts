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
        isHttps: envs.HTTPS,
        https_cert: envs.HTTPS_CERT,
        https_key: envs.HTTPS_KEY,
    });

    server.start();
})();

