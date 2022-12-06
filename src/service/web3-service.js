const Web3 = require("web3");

const web3 = new Web3(window.ethereum);

const ERC20TransferABI = [
    {
        constant: false,
        inputs: [
            {
                name: "_to",
                type: "address",
            },
            {
                name: "_value",
                type: "uint256",
            },
        ],
        name: "transfer",
        outputs: [
            {
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "_owner",
                type: "address",
            },
        ],
        name: "balanceOf",
        outputs: [
            {
                name: "balance",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "signature",
                type: "bytes",
            },
            {
                name: "hash",
                type: "bytes32",
            },
        ],
        name: "verifySingleSignOn",
        outputs: [
            {
                name: "email",
                type: "string",

            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                name: "signature",
                type: "bytes",
            },
            {
                name: "hash",
                type: "bytes32",
            },
        ],
        name: "verify",
        outputs: [
            {
                name: "isValid",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
]


const Web3Service = {
    signMessage: async (message, account, callback) => {
        const hash = Web3.utils.sha3(message);
        console.log(hash);
        await web3.eth.sign(hash, account, (e, signature) => {
            console.log(signature);
            callback(hash, signature);
        }).then(res => console.log(res))
            .catch(err => console.log(err));
    },

    verifyCertificate: (certificate, signature, address, callback) => {
        const hash = Web3.utils.sha3(certificate);
        console.log(hash);
        try {
            const contract = new web3.eth.Contract(ERC20TransferABI, address);
            contract.methods.verify(signature, hash).call(function (err, isValid) {
                console.log(isValid);
                callback(isValid);
            });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = Web3Service