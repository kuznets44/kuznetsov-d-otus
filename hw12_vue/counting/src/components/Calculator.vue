<template>
  <div class="d-flex align-items-center justify-content-center mt-5">
    <div  v-for="(item,index) in task.expression"
          :key="index">
      <div class="expression-element" v-if="item !== ''">
        {{ item }}
      </div>
      <div v-else class="expression-element">
        <MDBInput ref="answerInput" :style="{fontSize: '36px', fontWeight: '300', textAlign: 'center'}" type="text" v-model="answer" />
      </div>
    </div>
  </div>
  <div class="digits-wrapper mt-5 mb-5">
    <div  v-for="i in [1,4,7]"
          :key="i"
          class="d-flex justify-content-center">
      <MDBBtn v-for="j in [0,1,2]"
              :key="j"
              color="primary"
              @click="handleDigitClick"
              :ripple="false"
      >
        {{ i + j }}
      </MDBBtn>
    </div>
    <div  class="d-flex justify-content-center">
      <MDBBtn color="primary"
              :ripple="false"
              @click="handleDigitClick"
      >
        -
      </MDBBtn>
      <MDBBtn color="primary"
              :ripple="false"
              @click="handleDigitClick"
      >
        0
      </MDBBtn>
      <MDBBtn color="warning"
              :ripple="false"
              @click="handleBackSpaceClick"
      >
        &lt;
      </MDBBtn>
    </div>
  </div>
  <div class="align-right">
    <MDBBtn color="success" @click="onButtonClick" :ripple="false">Дальше</MDBBtn>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { MDBInput,MDBBtn } from "mdb-vue-ui-kit";
import { ref, onMounted, watchEffect } from "vue";

export default defineComponent({
  name: 'Calculator',
  props: ['task'],
  emits: ['submit'],
  components: {
    MDBInput,
    MDBBtn
  },
  setup(props, { emit }) {

    //переменная для ответа (будет возвращена по событию нажатия на кнопку Дальше)
    const answer = ref("");
    //переменная-реф для установки фокуса
    let answerInput = ref(null);

    //обработчик события кнопки Дальше
    const onButtonClick = () => {
      //эмитируем события submit в родительский компонент и передаем ответ
      emit('submit', {answer: parseInt(answer.value)});
      //готовим значение переменной к следующему ответу
      answer.value = "";
    };

    //обработка событий кликов по кнопкам-цифрам и минусу
    const handleDigitClick = (e) => {
      answer.value += e.target.innerText;
    };
    //обработка событий кликов по кнопке, удаляющей последний введенный символ
    const handleBackSpaceClick = (e) => {
      let srcVal = answer.value;
      answer.value = srcVal.substring(0, srcVal.length - 1);
    };

    //ставим фокус на инпут
    //можем сделать это только по хуку, тк раньше этого инпута нет
    onMounted(() => {
      answerInput.value.inputRef.focus();
    });

    //ставим фокус на инпуте после очередного ответа
    //для этого используем хук, следящий за изменением переменной answer
    watchEffect(() => {
      if(answer.value === '' && answerInput.value) {
        answerInput.value.inputRef.focus();
      }
    });

    return {
      onButtonClick,
      handleDigitClick,
      handleBackSpaceClick,
      answer,
      answerInput
    }
  },
})
</script>

<style scoped>
  .expression-element {
    font-size: 36px;
    padding: 0 10px;
    max-width: 100px;
  }
</style>
