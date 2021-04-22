<template>
  <div class="not-found">
    <div class="not-found__inner">Страница не найдена</div>
  </div>
</template>

<script>
export default {
  name: 'ViewNotFound',
}
</script>

<style scoped>
  .not-found {
    height: 80vh;
    display: flex;
    align-items: center;
    font-weight: bold;
  }
  .not-found__inner {
    width:100%;
    text-align: center;
  }
</style>
