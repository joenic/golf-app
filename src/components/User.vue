<template>

  <div clas="container">
       <h1>People</h1>
    <ul>
      <li v-for="p in people" :key="p._id">
        <a :href="`/people/${p._id}`">
        {{ p.firstname }} {{ p.lastname }}
        </a>
      </li>
    </ul>

<router-link to="/">
    <button class="brn btn-large btn-block btn-success full-width"> Add User </button>
</router-link>
      </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
export default {
    name:'user',
    data: () => ({
      people: [],
    }),
    
    mounted() {
      axios.get(`${process.env.VUE_APP_API_URL}/people`)
            .then(res => res.data).then(people => {
      this.people = people._items
    })
}}
</script>

<style>
  
</style>
