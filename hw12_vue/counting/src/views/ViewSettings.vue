<template>
  <div>
    <div v-if="hasResults" class="intro">
      <div class="intro__text">
        <div>
          Ваш последний <router-link to="/results">результат</router-link>: 
          <ul>
            <li>сложность: {{ lastResult.difficulty }}</li>
            <li>решено: {{ lastResult.correctAnswers }} из {{ lastResult.totalTasks }}</li>
          </ul>
          <div class="bold">Общая точность: {{ commonAccuracy }}%</div>
        </div>
      </div>
    </div>

    <h3>
      Настройки
    </h3>
    <MDBListGroup flush :style="{margin: '0 -15px 20px -15px'}">
      <MDBListGroupItem>
        <MDBRange label="Длительность, мин" v-model="duration" :min="durationLimits.min" :max="durationLimits.max" />
      </MDBListGroupItem>
      <MDBListGroupItem>
        <MDBRange label="Сложность" v-model="difficulty" :min="difficultyLimits.min" :max="difficultyLimits.max" />
      </MDBListGroupItem>
      <MDBListGroupItem>
        <MDBCheckbox label="Сложение" v-model="useSum" />
      </MDBListGroupItem>
      <MDBListGroupItem>
        <MDBCheckbox label="Вычитание" v-model="useSubtraction" />
      </MDBListGroupItem>
      <MDBListGroupItem>
        <MDBCheckbox label="Умножение" v-model="useMultiplication" />
      </MDBListGroupItem>
    </MDBListGroup>
    <div class="align-right">
      <MDBBtn color="primary" @click="startPlay" :ripple="false">Играть!</MDBBtn>
    </div>
  </div>
</template>

<script>
import { MDBRange, MDBListGroup, MDBListGroupItem, MDBCheckbox, MDBBtn } from "mdb-vue-ui-kit";
import { defineComponent, ref, watchEffect } from "vue";
import { appConfig } from "@/app.config";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ResultsHelper } from "@/helpers/ResultsHelper";

export default defineComponent({
  components: {
    MDBRange, MDBListGroup, MDBListGroupItem, MDBCheckbox, MDBBtn
  },
  name: 'ViewSettings',
  setup() {
    const store = useStore();
    const router = useRouter();

    //достаем сохраненные значения настроек
    const duration = ref(store.state.duration);
    const difficulty = ref(store.state.difficulty);
    const useSum = ref(store.state.useSum);
    const useSubtraction = ref(store.state.useSubtraction);
    const useMultiplication = ref(store.state.useMultiplication);
    const useDivision = ref(store.state.useDivision);

    //получаем результаты и готовим к выводу
    //тк данные статические, определяются 1 раз на основании состояния localStorage, реактивными их делать не нужно
    const lastResult = {
      difficulty: 0,
      correctAnswers: 0,
      totalTasks: 0
    };
    let commonAccuracy = 0;
    let hasResults = false;

    const results = new ResultsHelper().getList().reverse();
    if(results.length > 0) {
      hasResults = true;

      const lastResultSrc = results[0];
      lastResult.difficulty = lastResultSrc.difficulty;
      lastResult.correctAnswers = lastResultSrc.results.filter( item => item.correctAnswer === item.userAnswer ).length;
      lastResult.totalTasks = lastResultSrc.results.length;

      let totalTasks = 0;
      let correctAnswers = 0;

      results.forEach( item => {
        totalTasks += item.results.length;
        correctAnswers += item.results.filter( resItem => resItem.correctAnswer === resItem.userAnswer ).length;
      });

      commonAccuracy = Math.round(correctAnswers * 100 / totalTasks);
    }

    //обработчик события начала игры
    const startPlay = () => router.push('/play');

    //сохранение настроек в сторе при их изменении
    watchEffect(() => store.commit('setState',{
      duration: duration.value,
      difficulty: difficulty.value,
      useSum: useSum.value,
      useDivision: useDivision.value,
      useSubtraction: useSubtraction.value,
      useMultiplication: useMultiplication.value
    }));

    return {
        duration,
        difficulty,
        durationLimits: {
          min: appConfig.duration.min,
          max: appConfig.duration.max
        },
        difficultyLimits: {
          min: appConfig.difficulty.min,
          max: appConfig.difficulty.max
        },
        useSum,
        useSubtraction,
        useMultiplication,
        useDivision,
        startPlay,
        hasResults,
        lastResult,
        commonAccuracy
      }
    },
})
</script>

<style scoped>
  .intro {
    margin: 20px 0;
  }
  .bold {
    font-weight: bold;
  }
</style>
