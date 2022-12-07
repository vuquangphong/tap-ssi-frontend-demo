<template>
  <div class="home-container">
    <div class="welcome-title">Hello there!</div>

    <div class="create-user-ssi-container">
      <div class="header-form">
        <div class="header-form-container">
          <div class="title">Create new user</div>
          <div class="x-close"></div>
        </div>
      </div>

      <div class="body-form">
        <div class="title">User infomation</div>

        <div class="main-body">
          <div class="input-group">
            <div class="input username">
              <label for="username">User name</label>
              <input type="text" id="username" v-model="formUser.username">
            </div>
            <div class="input fullname">
              <label for="wallet-address">Wallet address</label>
              <input type="text" id="wallet-address" v-model="formUser.walletAddress">
            </div>
          </div>

          <div class="input-group">
            <div class="input user-id">
              <label for="user-id">Identity number</label>
              <input type="text" id="user-id" v-model="formUser.userId">
            </div>
            <div class="input nationality">
              <label for="nationality">Nationality</label>
              <input type="text" id="nationality" v-model="formUser.nationality">
            </div>
          </div>

          <div class="input-group">
            <div class="input email">
              <label for="email">Email</label>
              <input type="text" id="email" v-model="formUser.email">
            </div>
            <div class="input phone-num">
              <label for="phone-num">Phone number</label>
              <input type="text" id="phone-num" v-model="formUser.phoneNumber">
            </div>
          </div>

          <div class="input-group">
            <div class="input date-of-birth">
              <label for="date-of-birth">User name</label>
              <input type="date" id="date-of-birth" v-model="formUser.dateOfBirth">
            </div>
          </div>
          <button class="register-btn" @click="register()">Register</button>
        </div>
      </div>

      <div class="footer-form"></div>
    </div>
  </div>
</template>

<script>
import {reactive, toRefs} from "vue";
import {Web3Service} from "@/utils/web3Service";
// import {postDataApi} from "@/utils/fetchApi";
// import {LOCAL_STORAGE_TOKEN_NAME} from "@/utils/constants";

export default {
  setup() {
    const state = reactive({
      formUser: {
        username: "",
        walletAddress: "",
        userId: "",
        nationality: "",
        email: "",
        phoneNumber: "",
        dateOfBirth: new Date(),
      },
    });

    return {...toRefs(state)};
  },
  methods: {
    register() {
      let ethereum = window.ethereum;
      ethereum
          .request({method: "eth_requestAccounts"})
          .then((accounts) => {
            const account = accounts[0];
            console.log(account);
            Web3Service.signup(this.formUser.username, Date.parse(this.formUser.dateOfBirth), this.formUser.userId, this.formUser.nationality, this.formUser.email, this.formUser.phoneNumber, this.formUser.walletAddress, account);
          })
          .catch((error) => {
            console.log(error, error.code);

            alert(error.code);
          });
    }
  }
};
</script>

<style scoped>
</style>