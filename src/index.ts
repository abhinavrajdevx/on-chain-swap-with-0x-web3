const qs = require("qs");

const ZeroXAPI = "8b0439f9-2233-45e7-bfb5-857bd1c43654";
const chainID = "1";

const params = {
  buyToken: "0xc6F3B8C8DE877Aa9BbE42164e7b9ffe1b606696d",
  sellToken: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",

  buyAmount: "1000000000",
  takerAddress: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
};

const headers: Record<string, string> = {
  "0x-api-key": ZeroXAPI,
  "0x-chain-id": chainID,
};
async function main() {
  const response = await fetch(
    `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`,
    { headers }
  );

  console.log(await response.json());
}

main();
