<template>
  <div class="home-container">
    <div class="welcome-title">Hello there!</div>

    <div class="create-user-ssi-container">
      <div class="header-form">
        <div class="header-form-container">
          <div class="title">Verify certificate</div>
          <div class="x-close"></div>
        </div>
      </div>

      <div class="body-form">
        <div class="title">Certificate string</div>

        <div class="main-body">
          <div class="input-group">
            <div class="input username">
              <label for="username">Type</label>
              <input width="500" height="200" type="text" id="username" v-model="formCertificate.VC">
            </div>
          </div>

          <button class="register-btn" @click="issue()">Verify</button>
          <p class="result" v-text="formCertificate.result"></p>
          <div>
          </div>
        </div>

        <div class="footer-form"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive, toRefs} from "vue";
import {CredentialService} from "@/utils/credentialService";

export default {
  setup() {
    const state = reactive({
      formCertificate: {
        VC: "",
        result: "",
      },
    });

    return {...toRefs(state)};
  },

  methods: {
    async issue() {
      CredentialService.verifyPresentation(this.formCertificate.VC, (result) => {
        this.formCertificate.result = result;
      });
    }
  }
}
</script>

<style scoped>

</style>