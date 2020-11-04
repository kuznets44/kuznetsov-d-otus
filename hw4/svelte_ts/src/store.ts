import {writable} from 'svelte/store';

export const outcomesStore = writable([
  {"id":1,"date":new Date(2020,10,21),"category_id":1,"name":"Макароны","value":50},
  {"id":2,"date":new Date(2020,10,22),"category_id":1,"name":"Молоко","value":70},
  {"id":3,"date":new Date(2020,10,22),"category_id":2,"name":"Шарф","value":1000},
]);

export const categoriesStore = writable([
  {"id":1,"name":"Продукты"},
  {"id":2,"name":"Одежда"},
]);