<template>
  <div class="table">
    <div class="table__filter">
      <h2>Фильтр</h2>
      <select v-model="column">
        <option value="" disabled selected hidden>Колонка</option>
        <option value="name">Имя</option>
        <option value="count">Количество</option>
        <option value="distance">Расстояние</option>
      </select>
      <select 
        v-model="type"
        >
        <option value="" disabled selected hidden>Условие</option>
        <option value="equal">Равно</option>
        <option value="contains">Содержит</option>
        <option value="more">Больше</option>
        <option value="less">Меньше</option>
      </select>
      <input type="text" v-model="input" placeholder="значение"/>
      <button class="table__button" @click="filterItems()">Отфильтровать</button>
    </div>
    <div class="table__header">
      <p class="table__par">Дата</p>
      <p class="table__par">Название</p>
      <p class="table__par">Количество</p>
      <p class="table__par">Расстояние</p>
    </div>
    <div class="table__body">
      <table-row 
        v-for="row in paginatedItems"
        :key="row.id"
        :rowData="row"
      />
    </div>
    <div class="table__pagination">
      <div 
        class="table__page"
        v-for="page in pages"
        :key="page"
        :class="{'page--selected': page === pageNumber }"
        @click="pageClick(page)"
      >
        {{page}}
      </div>
    </div>
    <div>
      <h2>Создать элемент таблицы</h2>
      <input v-model="name" placeholder="Имя" />
      <input v-model="count" placeholder="Количество" />
      <input v-model="distance" placeholder="Расстояние" />
      <button @click="createObj()">Добавить</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import tableRow from './table-row.vue'

export default {
  name: "v-table",
  components: {
    tableRow
  },
  props: {
    items: {
      type: Array
    }
  },
  data(){
    return{
      localItems: this.items,
      itemsPerPage: 3,
      pageNumber: 1,
      column: '',
      type: '',
      input: '',
      name: '',
      count: '',
      distance: ''
    }
  },
  async created(){
    await this.getItems()
    this.localItems = this.items;
  },
  computed: {
    pages(){
      return Math.ceil(this.localItems.length / this.itemsPerPage)
    },
    paginatedItems(){
      let from = ((this.pageNumber - 1) * this.itemsPerPage);
      let to = (from + this.itemsPerPage);
      return this.localItems.slice(from, to);
    },
  },
  methods: {
    ...mapActions([
      'createItem',
      'getItems'
    ]),
    pageClick(page){
      this.pageNumber = page;
    },
    filterItems(){
      if(!this.column || !this.type || !this.input){
        return;
      }
      this.localItems = this.items.filter(item => {
        if(this.column === 'name'){
          if(this.type === 'equal'){
            return item.name === this.input
          } else if (this.type === 'contains'){
            return item.name.toLowerCase().includes(this.input.toLowerCase());
          } else if(this.type === 'more'){
            return item.name.length > this.input.length;
          } else {
            return item.name.length < this.input.length;
          }
        }else if(this.column === 'count'){
          if(this.type === 'equal'){
            return item.count === Number(this.input);
          } else if (this.type === 'contains'){
            return item.count.toString().includes(this.input.toLowerCase());
          } else if(this.type === 'more'){
            return item.count > Number(this.input);
          } else {
            return item.count < Number(this.input);
          }
        } else{
          if(this.type === 'equal'){
            return item.distance === Number(this.input);
          } else if (this.type === 'contains'){
            return item.distance.toString().includes(this.input.toLowerCase());
          } else if(this.type === 'more'){
            return item.distance > Number(this.input);
          } else {
            return item.distance < Number(this.input);
          }
        }
      })
    },
    createObj(){
      if(!this.name || !this.count || !this.distance){
        alert('Введите данные!')
      }
      const item = {
        name: this.name,
        count: this.count,
        distance: this.distance
      }
      this.createItem(item);
      location.reload();
    }
  }
}

</script>

<style scoped>
  .table{
    padding-left: 100px;
    max-width: 900px;
  }

  .table__header{
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #000;
  }

  .table__par{
    flex-basis: 25%;
    text-align: left;
  }

  .table__pagination{
    display: flex;
    justify-content: center;
  }
  .table__page{
    padding: 5px;
    border: 1px solid #000;
    font-size: 20px;
    margin-right: 5px;
  }
  .table__page:hover {
    background-color: #000;
    color: #fff;
    cursor: pointer;
  }
  .page--selected{
    background-color: #000;
    color: #fff;
    pointer-events: none;
  }
</style>
