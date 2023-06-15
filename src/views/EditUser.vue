<script setup lang="ts">
// @ is an alias to /src
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const route = useRoute()

interface User {
  id?: string;
  name: string;
  status: boolean;
  observation: string;
  password: string;
  nivel_id: string;
}

interface Nivel {
  id: string
  name: string
}

let user = ref<User>({
  name: '',
  status: false,
  observation: '',
  password: '',
  nivel_id: '',
})
let niveles = ref<Nivel[]>([])

const fetchUser = async () => {
  const { data } = await axios.get(`http://localhost:8000/api/afiliados/usuario/${route.params.id}`)
  user.value = data.usuario
}

const fetchNiveles = async () => {
  const { data } = await axios.get(`http://localhost:8000/api/afiliados/niveles`)
  niveles.value = data
}

const onSubmit = async () => {
  try {
    await axios.put(`http://localhost:8000/api/afiliados/usuario/${route.params.id}`, {
      name: user.value.name,
      status: user.value.status,
      observation: user.value.observation,
      password: user.value.password,
      nivel_id: user.value.nivel_id
    })
    router.push('/')
  } catch (error) {
    console.error(error)
  }
}

const homeRoute = () => {
  router.push('/')
}

onMounted(async () => {
  await fetchNiveles()
  await fetchUser()
})

</script>
<template>
  <div>
    <div class="flex w-full py-[10px] bg-sky-200 justify-center">
      <h1  class="text-center text-[#5b5b5b] font-bold text-4xl"> Editar usuario {{ $route.params.id }}</h1> 
      <button class="border-blue-400 w-[160px] bg-blue-500 rounded-xl py-[6px] px-[4px]  absolute left-[20px] text-white" @click="homeRoute">regresar</button>
    </div>
   <div class="w-full flex justify-center pt-[20px]">

    <form @submit.prevent="onSubmit" class="w-[30%] flex flex-col gap-5">
      <label class="w-full flex flex-col"> Nombre de usuario
        <input class="border border-[#5d5d5d] rounded-lg px-[5px] py-[5px]" type="text" v-model="user.name" required
          minlength="2">
      </label>
      <label class="w-full flex flex-col"> Estado de usuario
        <select class="border border-[#5d5d5d]  px-[5px] rounded-lg py-[5px]" name="estado" v-model="user.status"
          required>
          <option value="1">Activo</option>
          <option value="0">Inactivo</option>
        </select>
      </label>
      <label class="w-full flex flex-col">Observaciones de usuario
        <input class="border border-[#5d5d5d] px-[5px]  rounded-lg py-[5px]" type="text" v-model="user.observation"
          required>
      </label>
      <label class="w-full flex flex-col">Password
        <input class="border border-[#5d5d5d] px-[5px]  rounded-lg py-[5px]" type="text" v-model="user.password" required>
      </label>
      <label class="w-full flex flex-col">Nivel
        <select class="border border-[#5d5d5d] px-[5px]  rounded-lg py-[5px]" name="nivel " v-model="user.nivel_id"
          required>
          <option v-for="nivel in niveles" :value="nivel.id">{{ nivel.name }}</option>
        </select>
      </label>
      <button class="border-blue-400 w-[160px] bg-blue-500 rounded-xl py-[6px] px-[4px] block mx-auto  text-white"
        type="submit">enviar</button>


    </form>
   </div>

  </div>
</template>

<style>
label {
  display: block;
}
</style>