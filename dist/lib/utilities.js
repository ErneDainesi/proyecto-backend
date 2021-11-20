"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.overwriteFile = void 0;
var fs_1 = __importDefault(require("fs"));
var overwriteFile = function (fileName, dataToWrite) {
    fs_1.default.writeFileSync(fileName, JSON.stringify(dataToWrite));
};
exports.overwriteFile = overwriteFile;
