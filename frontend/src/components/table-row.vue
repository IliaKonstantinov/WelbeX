<template>
  <div class="table__row">
    <div class="row row__date">{{rowData.date}}</div>
    <div class="row row__name">{{rowData.name}}</div>
    <div class="row row__count">{{rowData.count}}</div>
    <div class="row row__distance">{{rowData.distance}}</div>
    <button @click="deleteObj()">удалить</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'table-row',
  props: {
    rowData: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  methods: {
      ...mapActions([
        'deleteItem',
      ]),
      deleteObj(){
        console.log(this.rowData.id)
        const item = {
          _id: this.rowData.id
        }
        console.log(item)
        this.deleteItem(item);
        location.reload();
      }
    }
}
</script>

<style scoped>
  .table__row{
    display: flex;
    justify-content: space-around;
  }

  .row{
    padding: 8px 16px;
    flex-basis: 25%;
    text-align: left;
  }
</style>