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
              <label for="fullname">Full name</label>
              <input type="text" id="fullname" v-model="formUser.fullname">
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
        </div>
      </div>

      <div class="footer-form"></div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  setup() {
    const state = reactive({
      formUser: {
        username: "",
        fullname: "",
        userId: "",
        nationality: "",
        email: "",
        phoneNumber: "",
        dateOfBirth: new Date(),
      },
    });

    return { ...toRefs(state) };
  },
};
</script>

<style scoped>
</style>