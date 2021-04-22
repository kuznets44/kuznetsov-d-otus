<template>
  <MDBContainer class="app-container">
    <h1>Устный счет</h1>
    <MDBContainer class="router-container">
      <router-view />
    </MDBContainer>
  </MDBContainer>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { MDBContainer } from "mdb-vue-ui-kit";
import { appConfig } from "@/app.config";
import { useStore } from "vuex";

export default defineComponent({
  name: 'App',
  components: {
    MDBContainer
  },
  setup() {
    //определяем в сторе значения по умолчанию
    const store = useStore();
    store.commit('setState',{
      duration: appConfig.duration.default,
      difficulty: appConfig.difficulty.default,
      useSum: appConfig.useSum,
      useSubtraction: appConfig.useSubtraction,
      useMultiplication: appConfig.useMultiplication,
      useDivision: appConfig.useDivision
    });

    return {
    };
  }
})
</script>


<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");

  .app-container {
    display: block;
    margin: 0 auto;
    padding: 15px;
    max-width: 480px;
    height: 100vh;
    background: white;
  }

  .router-container {
    margin: 20px 0 0 0;
    padding: 0;
  }

  body {
    background: lightgray;
  }
  .align-right {
    text-align: right;
  }
</style>
