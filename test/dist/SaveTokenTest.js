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
exports.__esModule = true;
var network_helpers_1 = require("@nomicfoundation/hardhat-toolbox/network-helpers");
var chai_1 = require("chai");
var hardhat_1 = require("hardhat");
describe("Contract cases", function () {
    function deployContractsInstances() {
        return __awaiter(this, void 0, void 0, function () {
            var _a, owner, otherAccount, KOVACToken, token, SaveERC20, saveERC20;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, hardhat_1.ethers.getSigners()];
                    case 1:
                        _a = _b.sent(), owner = _a[0], otherAccount = _a[1];
                        return [4 /*yield*/, hardhat_1.ethers.getContractFactory("KOVACToken")];
                    case 2:
                        KOVACToken = _b.sent();
                        return [4 /*yield*/, KOVACToken.deploy()];
                    case 3:
                        token = _b.sent();
                        return [4 /*yield*/, hardhat_1.ethers.getContractFactory("SaveERC20")];
                    case 4:
                        SaveERC20 = _b.sent();
                        return [4 /*yield*/, SaveERC20.deploy(token.target)];
                    case 5:
                        saveERC20 = _b.sent();
                        return [2 /*return*/, { token: token, saveERC20: saveERC20, owner: owner, otherAccount: otherAccount }];
                }
            });
        });
    }
    describe("Contracts Deployments", function () {
        it("Should pass if KOVACToken contract has deployed succesffully", function () {
            return __awaiter(this, void 0, void 0, function () {
                var token;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, network_helpers_1.loadFixture(deployContractsInstances)];
                        case 1:
                            token = (_a.sent()).token;
                            chai_1.expect(token).to.exist;
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("Should pass if SaveERC20 contract has deployed succesffully", function () {
            return __awaiter(this, void 0, void 0, function () {
                var saveERC20;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, network_helpers_1.loadFixture(deployContractsInstances)];
                        case 1:
                            saveERC20 = (_a.sent()).saveERC20;
                            chai_1.expect(saveERC20).to.exist;
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe("Deposit", function () {
        it("Should pass with revertedWith, when attempted to deposit with amount equal 0", function () {
            return __awaiter(this, void 0, void 0, function () {
                var saveERC20, tx;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, network_helpers_1.loadFixture(deployContractsInstances)];
                        case 1:
                            saveERC20 = (_a.sent()).saveERC20;
                            tx = saveERC20.deposit(0);
                            return [4 /*yield*/, chai_1.expect(tx).to.be.revertedWith("can't save zero value")];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("Should pass with revertedWithCustomError from KOVACToken, when attempted to deposit without approval to spend token or having token type", function () {
            return __awaiter(this, void 0, void 0, function () {
                var saveERC20, tx;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, network_helpers_1.loadFixture(deployContractsInstances)];
                        case 1:
                            saveERC20 = (_a.sent()).saveERC20;
                            tx = saveERC20.deposit(100);
                            //  ERC20InsufficientAllowance
                            chai_1.expect(tx).to.be.revertedWithCustomError;
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("Should pass an emit after successful transaction", function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, saveERC20, token, tx;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, network_helpers_1.loadFixture(deployContractsInstances)];
                        case 1:
                            _a = _b.sent(), saveERC20 = _a.saveERC20, token = _a.token;
                            return [4 /*yield*/, token.approve(saveERC20.target, 100)];
                        case 2:
                            _b.sent();
                            tx = saveERC20.deposit(100);
                            chai_1.expect(tx).to.emit;
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("Should increase contract's balance on safe deposit", function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, saveERC20, token, bal;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, network_helpers_1.loadFixture(deployContractsInstances)];
                        case 1:
                            _a = _b.sent(), saveERC20 = _a.saveERC20, token = _a.token;
                            return [4 /*yield*/, token.approve(saveERC20.target, 100)];
                        case 2:
                            _b.sent();
                            return [4 /*yield*/, saveERC20.deposit(50)];
                        case 3:
                            _b.sent();
                            return [4 /*yield*/, saveERC20.checkContractBalance()];
                        case 4:
                            bal = _b.sent();
                            chai_1.expect(bal).to.equal(50);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("Should pass with revertedWithCustomError, when attempted to deposit with amount greater than users owned token", function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, saveERC20, token, owner, tx;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, network_helpers_1.loadFixture(deployContractsInstances)];
                        case 1:
                            _a = _b.sent(), saveERC20 = _a.saveERC20, token = _a.token, owner = _a.owner;
                            return [4 /*yield*/, token.approve(saveERC20.target, 100)];
                        case 2:
                            _b.sent();
                            tx = saveERC20.deposit(1000);
                            chai_1.expect(tx).to.be.revertedWithCustomError;
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe("Withdraw", function () {
        it("Should pass with revertedWith, when attempted to withdraw amount equal 0", function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, saveERC20, token, tx;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, network_helpers_1.loadFixture(deployContractsInstances)];
                        case 1:
                            _a = _b.sent(), saveERC20 = _a.saveERC20, token = _a.token;
                            return [4 /*yield*/, token.approve(saveERC20.target, 100)];
                        case 2:
                            _b.sent();
                            tx = saveERC20.deposit(100);
                            return [4 /*yield*/, chai_1.expect(tx).to.be.revertedWith("can't save zero value")];
                        case 3:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
});
