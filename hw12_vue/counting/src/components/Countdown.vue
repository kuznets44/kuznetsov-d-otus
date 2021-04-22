<template>
  <MDBBtn color="danger" :ripple="false" disabled size="lg">
    {{ min }}: {{ sec }}
  </MDBBtn>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { computed } from "vue";
import { MDBBtn} from "mdb-vue-ui-kit";

export default defineComponent({
  name: 'Countdown',
  components: {
    MDBBtn
  },
  props: {
    seconds: Number
  },
  setup(props) {
    console.log(props);

    const min = computed (() => parseInt(props.seconds / 60).toString().padStart(2,'0'));
    const sec = computed (() => parseInt(props.seconds % 60).toString().padStart(2,'0'));
    return {
      min,
      sec
    }
  },
})
</script>
