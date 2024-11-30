# Semaphore 101 Tutorial

This project is a complete application that demonstrates a Semaphore use case. It comes with a sample contract `Feedback.sol`, a test for that contract and a sample task that deploys that contract. It also contains a `Next.js` frontend to play around with the contract.

## Install

### Install dependencies

```bash
yarn
```

## 📜 Usage

### Compile and test the contract

```bash
cd apps/contracts
yarn compile
yarn test
```

### Deploy the contract (Optional)

There's already a `Feedback.sol` contract on Scroll testnet which you can use (CA: 0x40445Ff14431A014e7113aCC1a328EB9973e6Ef5), you may skip this step and proceed directly to the frontend application.

Update the `.env` file in the root directory with your wallet private key (Make sure there's some Scroll Sepolia ETH for gas fees).

1. Go to the `apps/contracts` directory and deploy your contract:

```bash
yarn deploy --semaphore 0x06d1530c829366A7fff0069e77c5af6A6FA7db2E --network scrollSepolia
```

> [!NOTE]
> Check the Semaphore contract addresses [here](https://docs.semaphore.pse.dev/deployed-contracts).

### Frontend application

1. Update your `apps/web-app/.env.development` file with your new contract address, Infura API key, and wallet private key.

2. Copy your contract artifacts from `apps/contracts/artifacts/contracts/` folder to `apps/web-app/contract-artifacts` folder manually.

Navigate to `apps/web-app` to start localhost server.

```bash
yarn dev
```

## Link to Official Documentation

- Semaphore documentation: https://docs.semaphore.pse.dev/
- Semaphore repository: https://github.com/semaphore-protocol
