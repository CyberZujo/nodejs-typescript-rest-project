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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_routes_1 = __importDefault(require("./routes/user-routes"));
const shopping_list_routes_1 = __importDefault(require("./routes/shopping-list.routes"));
const public_routes_1 = __importDefault(require("./routes/public.routes"));
const config_1 = __importDefault(require("./utils/config"));
class Server {
    constructor() {
        this.app = express_1.default();
    }
    config() {
        this.app.set('port', config_1.default.app.PORT);
        this.app.set('jwt-secret', config_1.default.token.SECRET);
        this.app.use(body_parser_1.default.json());
        this.app.use(cookie_parser_1.default());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
    }
    initializeRoutes() {
        this.app.use('/', public_routes_1.default);
        this.app.use('/user', user_routes_1.default);
        this.app.use('/shoppingList', shopping_list_routes_1.default);
    }
    databaseConnect() {
        const connection = mongoose_1.default.connection;
        connection.on("connected", () => {
            console.log("Mongo Connection Established");
        });
        connection.on("error", (error) => {
            console.log("Mongo Connection ERROR: " + error);
        });
        const run = () => __awaiter(this, void 0, void 0, function* () {
            yield mongoose_1.default.connect((config_1.default.database.CONNECTION_STRING), {
                keepAlive: true, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
            });
        });
        run().catch(error => console.error(error));
    }
    start() {
        this.config();
        this.app.listen(this.app.get('port'), () => {
            console.log('Server is listening on port ' + this.app.get('port'));
        });
        this.initializeRoutes();
        this.databaseConnect();
    }
}
const server = new Server();
server.start();
module.exports = server.app;
//# sourceMappingURL=server.js.map