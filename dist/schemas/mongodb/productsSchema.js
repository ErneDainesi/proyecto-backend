"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    stock: Number,
    price: Number
});
exports.default = (0, mongoose_1.model)("ProductMongo", productSchema);
