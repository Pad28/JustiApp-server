import path from "path";
import https from 'https'; 
import fs from 'fs';

import express, { Application, Router } from "express";
import cors from 'cors';
import compression from "compression";

interface ServerOptions {
    port: number;
    publicPaht: string;
    routes: Router;

    isHttps: boolean;
    https_cert: string;
    https_key: string;

}

export class Server {

    private readonly app: Application; 
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;
    private readonly isHttps: boolean;
    private readonly httpsKey: string;
    private readonly httpsCert: string;

    constructor( options: ServerOptions ) {
        const { port, publicPaht, routes, https_cert, https_key, isHttps} = options;
        this.app = express();
        this.port = port;
        this.publicPath = publicPaht;
        this.routes = routes;

        this.isHttps = isHttps;
        this.httpsCert = https_cert;
        this.httpsKey = https_key;
    }   

    public async start() {

        // Middlewares
        this.app.use( express.json() );
        this.app.use( express.urlencoded({ extended: true }) );

        this.app.use( cors() );
        this.app.use( compression() );

        // public folder
        this.app.use( express.static(this.publicPath) );

        // Routes
        this.app.use( this.routes );
        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, `../../${this.publicPath}`, 'index.html'))
        });

        if(this.isHttps) {
            const httpsOptions = {
                key: fs.readFileSync(this.httpsKey),
                cert: fs.readFileSync(this.httpsCert),
            }
            https.createServer(httpsOptions, this.app).listen(this.port, () => {
                console.log(`Server listening in port ${this.port}`)
            });

        } else {
            this.app.listen(this.port, () => {
                console.log(`Server listening in port ${this.port}`)
            });
        }
        
    }

}