const web3Service = require("./web3-service");

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

const presentationProofModel = {
    "type": "ECDSA",
    "created": "2018-09-14T21:19:10Z",
    "proofPurpose": "authentication",
    "verificationMethod": "",
    "challenge": "1f44d55f-f161-4938-a659-f8026467f126",
    "domain": "4jt78h47fh47",
    "proofValue": "eyJhbGciOiJSUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..kTCYt5XsITJX1CxPCT8yAV-TVIw5WEuts01mq-pQy7UJiN5mgREEMGlv50aqzpqh4Qq_PbChOMqsLfRoPsnsgxD-WUcX16dUOqV0G_zS245-kronKb78cPktb3rk-BuQy72IFLN25DYuNzVBAh4vGHSrQyHUGlcTwLtjPAnKb78"
}

const VPModel = {
    "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://www.w3.org/2018/credentials/examples/v1"
    ],
    "type": "VerifiablePresentation",
    "holder": "",
    "verifiableCredential": [],
}

const credentialService = {
    issue: (type, degreeType, degreeName, subjectId) => {
        const {...newVC} = VCModel;

        newVC.type.push(type);
        newVC.issuanceDate = new Date().toJSON();
        newVC.credentialSubject.id = subjectId;
        newVC.credentialSubject.degree.type = degreeType;
        newVC.credentialSubject.degree.name = degreeName;
        newVC.issuer = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        console.log(newVC);
        ethereum
            .request({method: "eth_requestAccounts"})
            .then((accounts) => {
                const account = accounts[0];
                console.log(account);
                web3Service.signMessage(JSON.stringify(newVC), account, (hash, signature) => {
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
        const {...newVP} = VPModel;
        newVP.verifiableCredential.push(JSON.parse(certificate));
        newVP.holder = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        console.log(newVP);
        ethereum
            .request({method: "eth_requestAccounts"})
            .then((accounts) => {
                const account = accounts[0];
                console.log(account);
                web3Service.signMessage(JSON.stringify(newVP), account, (hash, signature) => {
                    newVP["proof"] = presentationProofModel;
                    newVP.proof.created = new Date().toJSON();
                    newVP.proof.proofValue = signature;
                    console.log(JSON.stringify(newVP));
                })
            })
            .catch((error) => {
                console.log(error, error.code);

                alert(error.code);
            })
    },

    verifyPresentation: (presentation) => {
        const VP = JSON.parse(presentation);
        const {proof: _, ...content} = VP;
        const holder = VP.holder;

        web3Service.verifyCertificate(JSON.stringify(content), VP.proof.proofValue, holder, (isValid) => {
            if (isValid) {
                for (const VC in VP.credentialSubject) {
                    const {proof: _, ...content} = VC;
                    web3Service.verifyCertificate(content, VC.proof.proofValue, VC.issuer, (isValid) => {
                        if (!isValid) {
                            console.log("not valid certificate");
                            return false;
                        }
                    })
                }
            }
        })
    }
}

module.exports = credentialService


