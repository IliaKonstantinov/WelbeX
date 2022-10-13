<template>
  <div class="">
    <h1>Тестовое задание для WelbeX от Ильи Константинова</h1>
    <v-table
      :items = "items"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import vTable from './components/v-table.vue'

export default {
  name: 'App',
  components:{
    vTable
  },
  computed: {
    ...mapGetters([
      'items'
    ])
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
