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
exports.getValidInput = exports.askQuestion = void 0;
const node_readline_1 = __importDefault(require("node:readline"));
const askQuestion = (rl, question) => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
};
exports.askQuestion = askQuestion;
const getValidInput = (question, validAnswers) => __awaiter(void 0, void 0, void 0, function* () {
    const rl = node_readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const validateAnswer = () => __awaiter(void 0, void 0, void 0, function* () {
        const answer = yield (0, exports.askQuestion)(rl, question);
        if (!validAnswers || validAnswers.includes(answer)) {
            rl.close();
            return answer;
        }
        else {
            return validateAnswer();
        }
    });
    return validateAnswer();
});
exports.getValidInput = getValidInput;
