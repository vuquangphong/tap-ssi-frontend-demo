<template>
  <div class="container">
    <div class="inside-container">
      <div class="header">
        <img src="../assets/favicon.png" alt="">
        <div class="ssi-demo">SSI - Demo</div>
      </div>

      <div class="menu-container">
        <div
          v-for="(item, index) in listMenu"
          :key="index"
          :class="{ menuContainer: true, selected: item.selected }"
        >
          <div class="menu-item-content">
            <router-link
              :to="item.path"
              :class="{ menuItem: true, selected: item.selected }"
            >
              <div class="menu-icon">
                <div
                  :class="{ icon: true, selected: item.selected }"
                  :id="item.id"
                ></div>
              </div>
              <div class="menu-title">{{ item.nameMenu }}</div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listMenu: [
        {
          nameMenu: "Home",
          id: "home",
          selected: this.$route.path === "/home",
          path: "/home",
        },
        {
          nameMenu: "Issue",
          id: "issue",
          selected: this.$route.path === "/issue",
          path: "/issue",
        },
        {
          nameMenu: "Presentation",
          id: "presentation",
          selected: this.$route.path === "/presentation",
          path: "/presentation",
        },
        {
          nameMenu: "Verify",
          id: "verify",
          selected: this.$route.path === "/verify",
          path: "/verify",
        },
      ],
    };
  },
};
</script>

<style scoped>
.container {
  width: 220px;
  height: 100%;
}

.inside-container {
  height: 100%;
}

.inside-container .header {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  font-size: x-large;
  font-weight: 600;
  font-family: cursive !important;
  padding-left: 10px;
}

.inside-container .header img {
  height: 40px;
  width: 40px;
  margin-right: 10px;
}

.menu-container {
  height: 100%;
}

.menuContainer {
  height: 70px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.menu-item-content {
  flex: 1;
}

.menu-item-content:hover {
  border-radius: 50px;
  background-color: rgb(226, 226, 226);
  transition: 0.5s;
}

.menuItem {
  text-decoration: none;
  height: 42px;
  line-height: 42px;
  color: #000;
  position: relative;
  display: flex;
  padding-left: 8px;
  padding-right: 16px;
  margin-left: 7px;
}

.menuItem.selected {
  font-weight: 600;
}

.menu-icon {
  display: flex;
  align-items: center;
  margin-right: 8px;
}

.menu-icon .icon {
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
}

.menu-icon .icon#home {
  background-image: url("../assets/home.png");
}
.menu-icon .icon#issue {
  background-image: url("../assets/issue.png");
}
.menu-icon .icon#presentation {
  background-image: url("../assets/presentation.png");
}
.menu-icon .icon#verify {
  background-image: url("../assets/verify.png");
}

.menu-icon .icon#home.selected {
  background-image: url("../assets/home-select.png");
}
.menu-icon .icon#issue.selected {
  background-image: url("../assets/issue-select.png");
}
.menu-icon .icon#presentation.selected {
  background-image: url("../assets/presentation.png");
}
.menu-icon .icon#verify.selected {
  background-image: url("../assets/verify.png");
}
</style>