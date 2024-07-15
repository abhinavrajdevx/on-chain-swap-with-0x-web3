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
const ethers_1 = require("ethers");
const qs = require("qs");
const ZeroXAPI = process.env.ZeroXAPI;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const JSON_RPC_ETH_PROVIDER = process.env.JSON_RPC_ETH_PROVIDER;
const chainID = "1";
const buyToken = (_a) => __awaiter(void 0, [_a], void 0, function* ({ chainID, ZeroXAPI, buyToken, buyAmount, takerAddress, private_key, json_rpc_provider, }) {
    const eth_address = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"; //ETH
    const params = {
        buyToken,
        sellToken: eth_address,
        buyAmount,
        takerAddress,
    };
    const headers = {
        "0x-api-key": ZeroXAPI,
        "0x-chain-id": chainID,
    };
    const response = yield fetch(`https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`, { headers });
    const quote = yield response.json();
    console.log(quote);
    const provider = new ethers_1.ethers.JsonRpcProvider(json_rpc_provider);
    const signer = new ethers_1.ethers.Wallet(private_key, provider);
    yield signer.sendTransaction({
        gasLimit: quote.gas,
        gasPrice: quote.gasPrice,
        to: quote.to,
        data: quote.data,
        value: quote.value,
        chainId: quote.chainId,
    });
});
