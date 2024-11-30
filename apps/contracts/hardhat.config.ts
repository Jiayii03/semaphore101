import "@nomicfoundation/hardhat-toolbox";
import "@semaphore-protocol/hardhat";
import { getHardhatNetworks } from "@semaphore-protocol/utils";
import { config as dotenvConfig } from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import { resolve } from "path";
import "./tasks/deploy";

dotenvConfig({ path: resolve(__dirname, "../../.env") });

const config: HardhatUserConfig = {
    solidity: "0.8.23",
    defaultNetwork: process.env.DEFAULT_NETWORK || "hardhat",
    networks: {
        hardhat: {
            chainId: 1337,
        },
        ...getHardhatNetworks(process.env.ETHEREUM_PRIVATE_KEY),
        sepolia: {
            url: "https://rpc.sepolia.org/", // Public RPC URL for Sepolia testnet
            chainId: 11155111, // Chain ID for Sepolia
            accounts: process.env.ETHEREUM_PRIVATE_KEY
                ? [process.env.ETHEREUM_PRIVATE_KEY]
                : [], // Your private key for Sepolia
        },
        scrollSepolia: {
            url: "https://sepolia-rpc.scroll.io/", // Scroll Sepolia RPC endpoint
            chainId: 534351, // Scroll Sepolia Chain ID
            accounts: process.env.ETHEREUM_PRIVATE_KEY
                ? [process.env.ETHEREUM_PRIVATE_KEY]
                : [], // Your private key for Scroll
        },
    },
    gasReporter: {
        currency: "USD",
        enabled: process.env.REPORT_GAS === "true",
        coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    },
    typechain: {
        target: "ethers-v6",
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
    sourcify: {
        enabled: true,
    },
};

export default config;
