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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUseCase = void 0;
const query_error_1 = require("../../domain/errors/query.error");
const handleUseCase = (_a) => __awaiter(void 0, [_a], void 0, function* ({ usecase, res, params, successStatus = 200, errorStatus = 400 }) {
    try {
        const result = yield usecase.execute(params);
        return res.status(successStatus || 200).json(result);
    }
    catch (e) {
        if (e instanceof query_error_1.QueryError) {
            return res.status(errorStatus || 400).json({ message: e.message });
        }
        else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
});
exports.handleUseCase = handleUseCase;
