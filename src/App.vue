<template>
  <div id="app">
    <div class="main-header">
      <div class="main-logo">
        <img src="./assets/images/Main_logo.svg" alt="" width="54px" height="54px">
      </div>
      <h1 class="main-name">
        HELP
      </h1>
      <div class="main-words">
        <h3 class="word-main">
          <router-link to="/main" style="text-decoration:none;color:black">Main</router-link>
        </h3>
        <h3 class="word-favourites">
          <router-link to="/favourites" style="text-decoration:none;color:black">Favourites</router-link>
        </h3>
      </div>
      <div class="main-phone">
        <img src="./assets/images/viber_152851 1.svg" alt="" width="35px" height="35px">
        <h4 class="number">
          8-775-199-21-57
        </h4>
      </div>
      <div class="example-photo-oftheuser">
        <img src="./assets/images/Crush.svg" alt="" width="60px" height="60px">
      </div>
    </div>

    <!-- Router view to render components based on route -->
    <router-view :currencies="currencies" @update-currencies="updateCurrencies" />

  </div>
</template>

<script>
import Main from "./views/Main.vue";
import Favourites from "./views/Favourites.vue";

export default {
  name: 'App',
  components: {
    Main,
    Favourites
  },
  data() {
    return {
      currencies: [] // Array to store currencies
    };
  },
  methods: {
    // Method to update currencies state
    updateCurrencies(newCurrencies) {
      this.currencies = newCurrencies;
    }
  }
};
</script>

<style scoped>
body {
  background-color: #d9d9d9;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.main-header {
  background-color: white;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
}

.main-name {
  font-size: 52px;
  font-weight: 700;
  color: #3a63a2;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.main-logo {
  margin-left: 126px;
  width: 70px;
}

.main-words {
  width: 400px;
  display: flex;
  justify-content: space-between;
  margin-left: 150px;
}

.main-phone {
  display: flex;
  align-items: center;
  margin-left: 150px;
  justify-content: space-between;
  width: 200px;
}

h3 {
  font-size: 26px;
}

.example-photo-oftheuser {
  margin-left: 50px;
}

h4 {
  font-size: 20px;
}
</style>
>
