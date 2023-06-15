<template>
    <div class="flex justify-between items-center bg-blue-500 p-4 text-white">
      <div></div>
      <router-link to="/">
        <h1 class="font-bold text-lg">{{ $route.name }}</h1>
      </router-link>
      <router-link to="/formulario">
        <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
        >
          Agregar Usuario
        </button>
      </router-link>
    </div>
  </template>