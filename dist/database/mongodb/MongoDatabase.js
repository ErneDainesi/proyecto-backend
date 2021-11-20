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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDatabase = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var productsSchema_1 = __importDefault(require("../../schemas/mongodb/productsSchema"));
var constants_1 = require("../../constants");
var MongoDatabase = /** @class */ (function () {
    function MongoDatabase() {
    }
    MongoDatabase.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, mongoose_1.default.connect(constants_1.MONGODB_URL, {})];
                    case 1:
                        _a.sent();
                        console.log("Connection to mongo database was established");
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.error(err_1);
                        throw new Error(constants_1.DB_FAILED_CONNECTION);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MongoDatabase.prototype.getAllProducts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var products, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, productsSchema_1.default.find()];
                    case 1:
                        products = _a.sent();
                        return [2 /*return*/, products];
                    case 2:
                        err_2 = _a.sent();
                        console.error(err_2);
                        throw new Error(constants_1.DB_FAILED_GET);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MongoDatabase.prototype.filterProduct = function (product, filter) {
        switch (filter) {
            case "name":
                return product.name;
            case "description":
                return product.description;
            case "stock":
                return product.stock;
            case "price":
                return product.price;
            default:
                break;
        }
    };
    MongoDatabase.prototype.getProduct = function (id, filter) {
        return __awaiter(this, void 0, void 0, function () {
            var product, filteredProduct, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, productsSchema_1.default.findById(id)];
                    case 1:
                        product = _a.sent();
                        if (!product) {
                            throw new Error(constants_1.DB_FAILED_GET);
                        }
                        if (!filter) {
                            return [2 /*return*/, product];
                        }
                        filteredProduct = this.filterProduct(product, filter);
                        if (!filteredProduct) {
                            throw new Error(constants_1.INVALID_FILTER);
                        }
                        return [2 /*return*/, filteredProduct];
                    case 2:
                        err_3 = _a.sent();
                        console.error(err_3);
                        throw new Error(constants_1.DB_FAILED_GET);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MongoDatabase.prototype.insertProduct = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            var newProduct, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newProduct = new productsSchema_1.default(product);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, newProduct.save()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_4 = _a.sent();
                        console.error(err_4);
                        throw new Error(constants_1.DB_FAILED_INSERT);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MongoDatabase.prototype.deleteProduct = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var deletedProduct, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, productsSchema_1.default.deleteOne({ id: id })];
                    case 1:
                        deletedProduct = _a.sent();
                        return [2 /*return*/, deletedProduct];
                    case 2:
                        err_5 = _a.sent();
                        console.error(err_5);
                        throw new Error(constants_1.DB_FAILED_DELETE);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MongoDatabase.prototype.updateProduct = function (id, product) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedProduct, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, productsSchema_1.default.updateOne({ id: id }, { product: product })];
                    case 1:
                        updatedProduct = _a.sent();
                        return [2 /*return*/, updatedProduct];
                    case 2:
                        err_6 = _a.sent();
                        console.error(err_6);
                        throw new Error(constants_1.DB_FAILED_UPDATE);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MongoDatabase.prototype.amountOfProducts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var amount, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, productsSchema_1.default.count()];
                    case 1:
                        amount = _a.sent();
                        return [2 /*return*/, amount];
                    case 2:
                        err_7 = _a.sent();
                        console.error(err_7);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return MongoDatabase;
}());
exports.MongoDatabase = MongoDatabase;
