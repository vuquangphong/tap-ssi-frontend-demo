const axios = require("axios");
const Url = "http://localhost:3000/api";

const AxiosRequest = {
    loginWithMetamask: (hash, signature) => {
        axios({
            method: 'post',
            url: `${Url}/login_with_metamask`,
            data: {
                hash: hash,
                signature: signature,
            }
        }).then(res => console.log(res))
            .catch(err => console.log(err));
    },

    login: (email, password) => {
        axios({
            method: 'post',
            url: `${Url}/login`,
            data: {
                email: email,
                password: password,
            }
        }).then(res => console.log(res))
            .catch(err => console.log(err));
    }
}

module.exports = AxiosRequest