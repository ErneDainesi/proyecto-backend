"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.saveProduct = exports.getProduct = exports.getProductsView = exports.getProductsPage = void 0;
var MongoDatabase_1 = require("../database/mongodb/MongoDatabase");
var mongodb = new MongoDatabase_1.MongoDatabase();
var getProductsPage = function (req, res) {
    res.render('pages/productos');
};
exports.getProductsPage = getProductsPage;
var getProductsView = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products, productCount, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                products = mongodb.getAllProducts();
                return [4 /*yield*/, mongodb.amountOfProducts()];
            case 1:
                productCount = _a.sent();
                res.render("pages/vista", {
                    products: products,
                    thereAreProducts: productCount ? productCount > 0 : false
                });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(404).json({ error: 'no products were found' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getProductsView = getProductsView;
var getProduct = function (req, res) {
    var idProduct = req.params.id;
    try {
        var productMongo = mongodb.getProduct(idProduct, null);
        res.json({ productMongo: productMongo });
    }
    catch (err) {
        res.status(404).json({ error: 'product not found' });
    }
};
exports.getProduct = getProduct;
var saveProduct = function (req, res) {
    var product = __assign({}, req.body);
    try {
        mongodb.insertProduct(product);
        res.redirect('/products');
    }
    catch (err) {
        res.status(500).json({ error: "couldn't save product" });
    }
};
exports.saveProduct = saveProduct;
var updateProduct = function (req, res) {
    try {
        var id = req.params.productId;
        var updatedProduct = mongodb.updateProduct(id, req.body);
        res.send(updatedProduct);
    }
    catch (err) {
        res.status(500).json({ error: "couldn't update product" });
    }
};
exports.updateProduct = updateProduct;
var deleteProduct = function (req, res) {
    try {
        var productId = req.params.productId;
        var deletedProduct = mongodb.deleteProduct(productId);
        res.send(deletedProduct);
    }
    catch (err) {
        res.status(500).json({ error: "couldn't delete product" });
    }
};
exports.deleteProduct = deleteProduct;
