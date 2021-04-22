<template>
    <MDBContainer>
      <div
        class="align-items-top"
        style="height: 100vh; width: 480px;border: 1px solid red; margin: 0 auto"
      >
        <h2 style="width:100%">Устный счет</h2>

        <MDBContainer>
          <router-view/>
        </MDBContainer>

      </div>
    </MDBContainer>
</template>

<script>
import { MDBContainer } from "mdb-vue-ui-kit";
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    MDBContainer
  },
  name: 'App',
  setup() {
    console.log(this.$store.levels);
  },
})
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
