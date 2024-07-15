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
const ZeroXAPI = "8b0439f9-2233-45e7-bfb5-857bd1c43654";
const chainID = "1";
const PRIVATE_KEY = "e375c1ad425a9ea467ddf0254f869ed19b7a3f98892fd230465f40d941331046";
const PROVIDER_ETH = "https://cloudflare-eth.com/";
const params = {
    buyToken: "0x6B175474E89094C44Da98b954EedeAC495271d0F", //DAI
    sellToken: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", //ETH
    // Note that the DAI token uses 18 decimal places, so `buyAmount` is `100 * 10^18`.
    buyAmount: "100",
    takerAddress: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
};
const headers = {
    "0x-api-key": ZeroXAPI,
    "0x-chain-id": chainID,
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`, { headers });
        const quote = yield response.json();
        console.log(quote);
        const provider = new ethers_1.ethers.JsonRpcProvider(PROVIDER_ETH);
        const signer = new ethers_1.ethers.Wallet(PRIVATE_KEY, provider);
        yield signer.sendTransaction({
            gasLimit: quote.gas,
            gasPrice: quote.gasPrice,
            to: quote.to,
            data: quote.data,
            value: quote.value,
            chainId: quote.chainId,
        });
    });
}
main();
