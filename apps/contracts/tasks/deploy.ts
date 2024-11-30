import { task, types } from "hardhat/config"

task("deploy", "Deploy a Feedback contract")
    .addOptionalParam("semaphore", "Semaphore contract address", undefined, types.string)
    .addOptionalParam("logs", "Print the logs", true, types.boolean)
    .setAction(async ({ logs, semaphore: semaphoreAddress }, { ethers, run }) => {
        // Get the deploying wallet
        const [deployer] = await ethers.getSigners()
        const deployerAddress = await deployer.getAddress()

        // Log private key loading and wallet details
        if (logs) {
            console.info(`Deploying from wallet: ${deployerAddress}`)
            
            // Check wallet balance
            const balance = await ethers.provider.getBalance(deployerAddress)
            console.info(`Wallet balance on Sepolia: ${ethers.formatEther(balance)} ETH`)
        }

        if (!semaphoreAddress) {
            const { semaphore } = await run("deploy:semaphore", {
                logs
            })

            semaphoreAddress = await semaphore.getAddress()
        }

        const FeedbackFactory = await ethers.getContractFactory("Feedback")

        try {
            const feedbackContract = await FeedbackFactory.deploy(semaphoreAddress, {
                gasLimit: ethers.parseUnits("1000000", "wei") // Increased gas limit
            })
            
            // Wait for the transaction to be mined and get the transaction hash
            const deployTx = await feedbackContract.deploymentTransaction()
            
            if (logs) {
                if (deployTx) {
                    console.info(`Feedback contract deployment transaction hash: ${deployTx.hash}`)
                } else {
                    console.warn("Deployment transaction is null")
                }
                console.info(`Feedback contract has been deployed to: ${await feedbackContract.getAddress()}`)
                console.info(`Deployment successful!`)
            }

            return feedbackContract
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Deployment failed: ${error.message}`)
            } else {
                console.error('Deployment failed with an unknown error')
            }
            throw error
        }
    })
