<template>
  <div>
    <h3>
      Настройки
    </h3>
    <MDBListGroup>
      <MDBListGroupItem>
        <MDBRange label="Длительность, мин" v-model="duration" :min="durationMin" :max="durationMax" />
      </MDBListGroupItem>
      <MDBListGroupItem>
        <MDBRange label="Сложность" v-model="difficulty" :min="difficultyMin" :max="difficultyMax" />
      </MDBListGroupItem>
  </MDBListGroup>
  </div>
</template>

<script>
import { MDBRange, MDBListGroup, MDBListGroupItem } from "mdb-vue-ui-kit";

export default defineComponent({
  components: {
    MDBRange, MDBListGroup, MDBListGroupItem
  },
  name: 'ViewSettings',
  setup() {
    let duration = ref(3);

    return {
      duration
    }
  },
})

/*
export default {
  name: 'ViewSettings',
  data() {
    return {
      duration: 3,
      durationMin: 1,
      durationMax: 5,
      difficulty: 5,
      difficultyMin: 1,
      difficultyMax: 10,
    }
  }
}
*/
</script>
