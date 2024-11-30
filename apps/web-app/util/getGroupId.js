const { ethers } = require("ethers");

async function main() {
    const provider = new ethers.JsonRpcProvider("https://rpc.sepolia.org/");
    const feedbackAbi = [
        "function groupId() view returns (uint256)"
    ];
    const feedbackAddress = "0xEf71ebE3fA7F8d601D566201fF77cd0E88Df729d"; // Replace with your contract address

    const feedbackContract = new ethers.Contract(feedbackAddress, feedbackAbi, provider);
    const groupId = await feedbackContract.groupId();
    console.log("Group ID:", groupId.toString());
}

main().catch(console.error);
