<template>
  <div>
    <h3>Ваши результаты</h3>

    <div class="wrapper mb-5">
      <MDBTable sm>
        <thead>
          <tr>
            <th scope="col">Дата</th>
            <th scope="col">Сложн.</th>
            <th scope="col">Время, мин</th>
            <th scope="col">Заданий</th>
            <th scope="col">Верных</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row,index) in results"
              :key="index"
              scope="row"
              :class="{bold: index === 0 ? true : false}"
          >
            <td>{{ row.date }}</td>
            <td class="number">{{ row.difficulty }}</td>
            <td class="number">{{ row.duration }}</td>
            <td class="number">{{ row.results.length }}</td>
            <td class="number">{{ row.results.filter( item => item.correctAnswer === item.userAnswer ).length }}</td>
          </tr>
        </tbody>
      </MDBTable>
    </div>
    <div class="align-right">
      <MDBBtn color="primary" @click="goBack" :ripple="false">Вернуться</MDBBtn>
    </div>
  </div>
</template>

<script>
import { ResultsHelper } from "@/helpers/ResultsHelper";
import { MDBTable, MDBBtn } from "mdb-vue-ui-kit";
import { useRouter } from "vue-router";

export default {
  name: 'ViewResults',
  components: {
    MDBTable,
    MDBBtn
  },
  setup() {
    //получаем результаты
    const results = new ResultsHelper().getList().reverse();

    //определяем метод для возврата на главную
    const router = useRouter();
    const goBack = () => router.push("/");

    return {
      results,
      goBack
    }
  }
}
</script>

<style scoped>
  .bold td {
    font-weight: bold;
  }
  td.number {
    text-align: center;
  }
  .wrapper {
    height: 75vh;
    overflow: auto;
  }
</style>
