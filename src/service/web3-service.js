const Web3 = require("web3");

const web3 = new Web3(window.ethereum);

const Web3Service = {
    signMessage: async (message, account, callback) => {
        const hash = Web3.utils.sha3(message);
        console.log(hash);
        await web3.eth.sign(hash, account, (e, signature) => {
            console.log(signature);
            callback(hash, signature);
        }).then(res => console.log(res))
            .catch(err => console.log(err));
    }
}

module.exports = Web3Service