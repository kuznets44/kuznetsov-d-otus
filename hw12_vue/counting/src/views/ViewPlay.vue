<template>
  <div class="d-flex justify-content-between">
    <MDBBtn color="primary" @click="endPlay" :ripple="false">Закончить</MDBBtn>
    <Countdown :seconds="timeToPlay" />
  </div>
  <Calculator :task="task" @submit="handleAnswer" />
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { useRouter } from 'vue-router';
import { MDBBtn, MDBContainer } from "mdb-vue-ui-kit";
import Countdown from "@/components/Countdown";
import { ref, computed, watchEffect, reactive } from "vue";
import { useStore } from 'vuex';
import Calculator from "@/components/Calculator";
import { appConfig } from '@/app.config';
import { TaskHelper } from "@/helpers/TaskHelper";
import { ResultsHelper } from "@/helpers/ResultsHelper";

  export default defineComponent({
    name: 'ViewPlay',
    components: {
      MDBBtn, Countdown, Calculator,
      MDBContainer
    },
    setup() {

      const router = useRouter();
      const store = useStore();

      //получаем настройки
      const difficulty = store.state.difficulty;
      const duration = store.state.duration;
      const level = appConfig.levels.find( item => item.index === difficulty );
      const useSum = store.state.useSum;
      const useMultiplication = store.state.useMultiplication;
      const useSubtraction = store.state.useSubtraction;

      //задания будем получать при помощи хэлпера, который генерирует их в зависимости от уровня сложности и допустимых арифметических операций
      const helper = new TaskHelper({
        level,
        useSum,
        useMultiplication,
        useSubtraction
      });
      
      //получаем начальное задание и определяем реактивную переменную
      const task = reactive( helper.getTask());

      //обработка ответа от дочернего компонента
      const handleAnswer = (e) => {
        //добавляем результат по текущему заданию
        results.push({
          expression: task.expression,
          correctAnswer: task.answer,
          userAnswer: e.answer
        });
        //формируем следующее задание
        let newTask = helper.getTask();
        //задаем поля для реактивной переменной, которая буде пропсом для дочернего элемента
        //задавать нужно именно так, по полям
        task.expression = newTask.expression;
        task.answer = newTask.answer;
      };

      //определяем реактивную переменную, показывающую, сколько осталось играть
      const timeToPlay = ref( duration * 60 );

      //определяем переменную, в которую будем добавлять результат
      let results = reactive([]);

      //включаем таймер
      const interval = setInterval(() => {
        timeToPlay.value--;
      },1000);

      //следим за состояние таймера
      //если время заканчивается, вызываем метод, завершающи игру
      watchEffect(() => {
        if(timeToPlay.value === 0) {
          endPlay();
        }
      });

      const endPlay = () => {
        //если есть результат, сохраняем его в localStorage
        if(results.length > 0) {
          new ResultsHelper().addResult({
            results,
            duration,
            difficulty
          });
        }
        results = [];
        //переходим на страницу результатов
        router.push('/results');
      };

      return {
        endPlay,
        timeToPlay,
        results,
        task,
        handleAnswer
      }
    },
  })
</script>