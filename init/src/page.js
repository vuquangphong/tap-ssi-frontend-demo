const Web3 = require("web3");
const axios = require("axios");
const { personalSign } = require("@metamask/eth-sig-util");
const form = document.querySelector("form");
eField = form.querySelector(".email");
eInput = eField.querySelector("input");
pField = form.querySelector(".password");
pInput = pField.querySelector("input");
metamaskButton = document.getElementById("metamask-login");

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
                name: "isVerified",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
]

const IDENTIFIER_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

const Url = "http://localhost:3000/api";

metamaskButton.onclick = () => {
    loginWithMetamask().then(r => console.log(r));
}

async function loginWithMetamask() {
    const web3 = new Web3(window.ethereum);
    ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
            const account = accounts[0];
            console.log(account);
            const message = "Some string";
            const hash = Web3.utils.sha3(message);
            console.log(hash);
            web3.eth.sign(hash, account, (e, signature) => {
                // console.log(signature.substr(0, 130) + (signature.substr(130) === "00" ? "1b" : "1c"));
                console.log(signature);
                axios({
                    method: 'post',
                    url: `${Url}/login_with_metamask`,
                    data: {
                        hash: hash,
                        signature: signature,
                    }
                }).then(res => console.log(res))
                    .catch(err => console.log(err));
            });
        })
        .catch((error) => {
            console.log(error, error.code);

            alert(error.code);
        });


}

form.onsubmit = (e) => {
    //preventing from form submitting
    e.preventDefault(); 

    //if email and password is blank then add shake class in it else call specified function
    (eInput.value === "") ? eField.classList.add("shake", "error") : checkEmail();
    (pInput.value === "") ? pField.classList.add("shake", "error") : checkPass();


    setTimeout(() => { //remove shake class after 500ms
        eField.classList.remove("shake");
        pField.classList.remove("shake");
    }, 500);

    eInput.onkeyup = () => {
        checkEmail();
    } //calling checkEmail function on email input keyup
    pInput.onkeyup = () => {
        checkPass();
    } //calling checkPassword function on pass input keyup


    function checkEmail() { //checkEmail function
        let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; //pattern for validate email
        if (!eInput.value.match(pattern)) { //if pattern not matched then add error and remove valid class
            eField.classList.add("error");
            eField.classList.remove("valid");
            let errorTxt = eField.querySelector(".error-txt");
            //if email value is not empty then show please enter valid email else show Email can't be blank
            (eInput.value !== "") ? errorTxt.innerText = "Enter a valid email address" : errorTxt.innerText = "Email can't be blank";
        } else { //if pattern matched then remove error and add valid class
            eField.classList.remove("error");
            eField.classList.add("valid");
        }
    }

    function checkPass() { //checkPass function
        if (pInput.value === "") { //if pass is empty then add error and remove valid class
            pField.classList.add("error");
            pField.classList.remove("valid");
        } else { //if pass is empty then remove error and add valid class
            pField.classList.remove("error");
            pField.classList.add("valid");
        }
    }

    //if eField and pField doesn't contains error class that mean user filled details properly
    if (!eField.classList.contains("error") && !pField.classList.contains("error")) {
        window.location.href = form.getAttribute("action"); //redirecting user to the specified url which is inside action attribute of form tag
        axios({
            method: 'post',
            url: `${Url}/login`,
            data: {
                email: eInput.value,
                password: pInput.value,
            }
        }).then(res => console.log(res))
            .catch(err => console.log(err));
    }
}