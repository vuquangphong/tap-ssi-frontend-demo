<template>
  <div class="wrapper">
    <div>
      <button id="metamask-login" @click="loginWithMetamask()">
        Login with Metamask
      </button>
    </div>
    <p>OR</p>
    <div>
      <label for="email">Email:</label>
      <div class="field email">
        <div class="input-area">
          <input type="email" id="email" v-model="formLogin.email" />
        </div>
        <div class="error error-txt">Email can't be blank</div>
      </div>

      <div class="field password">
        <label class="text" for="password">Password:</label>
        <div class="input-area">
          <input type="password" id="password" v-model="formLogin.password" />
        </div>
        <div class="error error-txt">Password can't be blank</div>
      </div>

      <button class="login-btn" @click="login()">Login</button>
    </div>
    <div class="pass-txt">
      <a @click="forgotPass()" class="pass-forgot-btn" href="#"
        >Forgot password?</a
      >
    </div>
    <div class="sign-txt">
      Don't have an account?
      <a @click="signup()" class="signup-btn" href="#">Signup now</a>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { emailRegex, LOCAL_STORAGE_TOKEN_NAME } from "../../utils/constants";
import { postDataApi } from "../../utils/fetchApi";
import { web3Service } from "../../utils/web3/web3-service";
// import { credential } from "../../utils/web3/credential";

export default {
  setup() {
    const state = reactive({
      formLogin: {
        email: "",
        password: "",
      },
    });

    return { ...toRefs(state) };
  },

  methods: {
    // normal login
    async login() {
      if (!this.formLogin.email || !this.formLogin.password) {
        // TODO: more UX-UI
        alert("Email hoặc mật khẩu không được để trống.");
        return;
      }

      if (!String(this.formLogin.email).toLowerCase().match(emailRegex)) {
        alert("Email không đúng định dạng.");
        return;
      }

      try {
        const res = await postDataApi("/login", {
          email: this.formLogin.email,
          password: this.formLogin.password,
        });

        if (res.status === 200) {
          localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.accessToken);
          this.$router.push("/home");
        }
      } catch (err) {
        console.log(err);
        if (err.response.data) {
          alert(err.response.data.message);
        } else {
          alert("Đã có lỗi xảy ra, vui lòng đăng nhập lại.");
        }
      }
    },

    // web3 - login with Metamask
    async loginWithMetamask() {
      ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          const account = accounts[0];
          console.log(account);
          const message = "Some string";
          web3Service.signMessage(message, account, (hash, signature) => {
            postDataApi("/login_with_metamask", { hash, signature });
          });
        })
        .catch((error) => {
          console.log(error, error.code);

          alert(error.code);
        });
    },

    forgotPass() {
      alert("Coming soon...");
    },

    signup() {
      alert("Coming soon...");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
body {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #5372f0;
}
::selection {
  color: #fff;
  background: #5372f0;
}
.wrapper {
  width: 380px;
  padding: 40px 30px 50px 30px;
  background: #fff;
  border-radius: 5px;
  text-align: center;
  box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.1);
}
.wrapper header {
  font-size: 35px;
  font-weight: 600;
}
.wrapper form {
  margin: 40px 0;
}
form .field {
  width: 100%;
  margin-bottom: 20px;
}
form .field.shake {
  animation: shake 0.3s ease-in-out;
}
@keyframes shake {
  0%,
  100% {
    margin-left: 0px;
  }
  20%,
  80% {
    margin-left: -12px;
  }
  40%,
  60% {
    margin-left: 12px;
  }
}
form .field .input-area {
  height: 50px;
  width: 100%;
  position: relative;
}
form input {
  width: 100%;
  height: 100%;
  outline: none;
  padding: 0 5px;
  font-size: 18px;
  background: none;
  caret-color: #5372f0;
  border-radius: 5px;
  border: 1px solid #bfbfbf;
  border-bottom-width: 2px;
  transition: all 0.2s ease;
}
form .field input:focus,
form .field.valid input {
  border-color: #5372f0;
}
form .field.shake input,
form .field.error input {
  border-color: #dc3545;
}
.field .input-area i {
  left: 15px;
  position: absolute;
  top: 50%;
  font-size: 18px;
  pointer-events: none;
  transform: translateY(-50%);
}
.input-area .icon {
  color: #bfbfbf;
  transition: color 0.2s ease;
}
.input-area .error-icon {
  right: 15px;
  color: #dc3545;
}
form input:focus ~ .icon,
form .field.valid .icon {
  color: #5372f0;
}
form .field.shake input:focus ~ .icon,
form .field.error input:focus ~ .icon {
  color: #bfbfbf;
}
form input::placeholder {
  color: #bfbfbf;
  font-size: 17px;
}
form .field .error-txt {
  color: #dc3545;
  text-align: left;
  margin-top: 5px;
}
form .field .error {
  display: none;
}
form .field.shake .error,
form .field.error .error {
  display: block;
}
form .pass-txt {
  text-align: left;
  margin-top: -10px;
}
.wrapper a {
  color: #5372f0;
  text-decoration: none;
}
.wrapper a:hover {
  text-decoration: underline;
}
form input[type="submit"] {
  height: 50px;
  margin-top: 30px;
  color: #fff;
  padding: 0;
  border: none;
  background: #5372f0;
  cursor: pointer;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}
form input[type="submit"]:hover {
  background: #2c52ed;
}
p {
  padding-top: 20px;
  color: gray;
}

.text {
  text-align: left;
}

label {
  text-align: left;
}
</style>