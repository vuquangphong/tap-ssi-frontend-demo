const Web3 = require("web3");

const web3 = new Web3(window.ethereum);

const web3Service = {
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

const VCModel = {
    "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://www.w3.org/2018/credentials/examples/v1"
    ],

    // "id": "http://example.edu/credentials/1872",

    "type": ["VerifiableCredential"],

    "issuer": "",

    "issuanceDate": "2010-01-01T19:23:24Z",

    "credentialSubject": {

        "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",

        "degree": {
            "type": "BachelorDegree",
            "name": "Bachelor of Science and Arts"
        }
    },
}

const proofModel = {


    "type": "ECDSA",

    "created": "2017-06-18T21:19:10Z",

    "proofPurpose": "assertionMethod",

    "verificationMethod": "",

    "proofValue": "",
}

// const VPModel = {
//     "@context": [
//         "https://www.w3.org/2018/credentials/v1",
//         "https://www.w3.org/2018/credentials/examples/v1"
//     ],
//     "type": "VerifiablePresentation",

//     "verifiableCredential": [],

//     "proof": {
//         "type": "RsaSignature2018",
//         "created": "2018-09-14T21:19:10Z",
//         "proofPurpose": "authentication",
//         "verificationMethod": "",
//         "challenge": "1f44d55f-f161-4938-a659-f8026467f126",
//         "domain": "4jt78h47fh47",
//         "jws": "eyJhbGciOiJSUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..kTCYt5XsITJX1CxPCT8yAV-TVIw5WEuts01mq-pQy7UJiN5mgREEMGlv50aqzpqh4Qq_PbChOMqsLfRoPsnsgxD-WUcX16dUOqV0G_zS245-kronKb78cPktb3rk-BuQy72IFLN25DYuNzVBAh4vGHSrQyHUGlcTwLtjPAnKb78"
//     }
// }

const credentialService = {
    issue: (type, degreeType, degreeName, subjectId) => {
        const newVC = VCModel;

        newVC.type.push(type);
        newVC.issuanceDate = new Date().toJSON();
        newVC.credentialSubject.id = subjectId;
        newVC.credentialSubject.degree.type = degreeType;
        newVC.credentialSubject.degree.name = degreeName;

        ethereum
            .request({ method: "eth_requestAccounts" })
            .then((accounts) => {
                const account = accounts[0];
                console.log(account);
                web3Service.signMessage(newVC.toString(), account, (hash, signature) => {
                    newVC.issuer = account;
                    newVC["proof"] = proofModel;
                    newVC.proof.created = new Date().toJSON();
                    newVC.proof.proofValue = signature;
                    console.log(JSON.stringify(newVC));
                })
            })
            .catch((error) => {
                console.log(error, error.code);

                alert(error.code);
            })
    },

    createPresentation: (certificate) => {
        console.log(certificate);
        const newVC = VCModel;

        ethereum
            .request({ method: "eth_requestAccounts" })
            .then((accounts) => {
                const account = accounts[0];
                console.log(account);
                web3Service.signMessage(newVC.toString(), account, (hash, signature) => {
                    newVC.issuer = account;
                    newVC["proof"] = proofModel;
                    newVC.proof.created = new Date().toJSON();
                    newVC.proof.proofValue = signature;
                    console.log(JSON.stringify(newVC));
                })
            })
            .catch((error) => {
                console.log(error, error.code);

                alert(error.code);
            })
    },
}

module.exports = credentialService