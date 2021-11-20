"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var products_route_1 = __importDefault(require("./routes/products.route"));
var cart_route_1 = __importDefault(require("./routes/cart.route"));
var constants_1 = require("./constants");
var MongoDatabase_1 = require("./database/mongodb/MongoDatabase");
var app = (0, express_1.default)();
var ejs = require("ejs").__express; // solucion a error "cannot find ejs module"
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/products', products_route_1.default);
app.use('/cart', cart_route_1.default);
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.engine('ejs', ejs);
app.get('/', function (req, res) {
    res.send('<h1>Proyecto Backend</h1>');
});
MongoDatabase_1.MongoDatabase.connect();
app.listen(constants_1.PORT, function () {
    console.log("Servidor express Typescript/Webpack en puerto " + constants_1.PORT);
});
