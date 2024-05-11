<template>
    <main>
      <h1>Movies page</h1>
      <input type="text" name="movie_name" id="movie_name">
      <button v-on:click="query"></button>
    </main>
  </template>
  
  <script>
  function query()
  {
    console.log('Clicked button');
  }
  </script>