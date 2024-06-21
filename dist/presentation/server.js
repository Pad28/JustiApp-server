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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const path_1 = __importDefault(require("path"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
class Server {
    constructor(options) {
        const { port, publicPaht, routes, https_cert, https_key, isHttps } = options;
        this.app = (0, express_1.default)();
        this.port = port;
        this.publicPath = publicPaht;
        this.routes = routes;
        this.isHttps = isHttps;
        this.httpsCert = https_cert;
        this.httpsKey = https_key;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            // Middlewares
            this.app.use(express_1.default.json());
            this.app.use(express_1.default.urlencoded({ extended: true }));
            this.app.use((0, cors_1.default)());
            this.app.use((0, compression_1.default)());
            // public folder
            this.app.use(express_1.default.static(this.publicPath));
            // Routes
            this.app.use(this.routes);
            this.app.get('*', (req, res) => {
                res.sendFile(path_1.default.join(__dirname, `../../${this.publicPath}`, 'index.html'));
            });
            if (this.isHttps) {
                const httpsOptions = {
                    key: fs_1.default.readFileSync(this.httpsKey),
                    cert: fs_1.default.readFileSync(this.httpsCert),
                };
                https_1.default.createServer(httpsOptions, this.app).listen(this.port, () => {
                    console.log(`Server listening in port ${this.port}`);
                });
            }
            else {
                this.app.listen(this.port, () => {
                    console.log(`Server listening in port ${this.port}`);
                });
            }
        });
    }
}
exports.Server = Server;
