<template>
  <div class="home-container">
    <div class="welcome-title">Hello there!</div>

    <div class="create-user-ssi-container">
      <div class="header-form">
        <div class="header-form-container">
          <div class="title">Create new certificate</div>
          <div class="x-close"></div>
        </div>
      </div>

      <div class="body-form">
        <div class="title">Certificate infomation</div>

        <div class="main-body">
          <div class="input-group">
            <div class="input username">
              <label for="username">Type</label>
              <input type="text" id="username" v-model="formCertificate.type">
            </div>
            <div class="input fullname">
              <label for="wallet-address">Subject Id</label>
              <input type="text" id="wallet-address" v-model="formCertificate.subjectId">
            </div>
          </div>

          <div class="input-group">
            <div class="input user-id">
              <label for="user-id">Degree Type</label>
              <input type="text" id="user-id" v-model="formCertificate.degreeType">
            </div>
            <div class="input nationality">
              <label for="nationality">Degree Name</label>
              <input type="text" id="nationality" v-model="formCertificate.degreeName">
            </div>
          </div>
          <button class="register-btn" @click="issue()">Issue</button>
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
        type: "",
        subjectId: "",
        degreeType: "",
        degreeName: "",
        result: "",
      },
    });

    return {...toRefs(state)};
  },

  methods: {
    async issue() {
      CredentialService.issue(this.formCertificate.type, this.formCertificate.subjectId, this.formCertificate.degreeType, this.formCertificate.degreeName, (VC) => {
        this.formCertificate.result = VC;
      });
    }
  }
}
</script>

<style scoped>

</style>