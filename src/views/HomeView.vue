<script setup lang="ts">
// @ is an alias to /src
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

interface User {
  id: string;
  name: string;
  status: boolean;
  observation: string;
  password: string;
  nivel_id: string;
  nivel: Nivel;
}
interface Nivel {
  id: string;
  name: string;
  
}

const users = ref<User[]>([])
const niveles = ref<Nivel[]>([])
const nivelName = ref('')

const fetchUsers = async () => {
  const { data } = await axios.get('http://localhost:8000/api/afiliados/usuarios')
  users.value = data
}

const fetchNiveles = async () => {
  const { data } = await axios.get('http://localhost:8000/api/afiliados/niveles')
  niveles.value = data
}

const router = useRouter()

const editUserRoute = (id: string) => {
  router.push(`/formulario/${id}`)
}

const onDeleteUser = async (id: string) => {
  await axios.delete(`http://localhost:8000/api/afiliados/usuario/${id}`)
  fetchUsers()
}

const onDeleteNivel = async (id: string) => {
  await axios.delete(`http://localhost:8000/api/afiliados/nivel/${id}`)
  fetchNiveles()
}

const editNivelRoute = (id: string) => {
  router.push(`/nivel/${id}`)
}

const formRoute = () => {
  router.push('/formulario')
}

const onAddNivel = async () => {
  await axios.post('http://localhost:8000/api/afiliados/nivel', {
    name: nivelName.value
  })
  fetchNiveles()
}

onMounted(() => {
  fetchUsers()
  fetchNiveles()
})
</script>

<template>
  <div class="m-2 overflow-x-auto">
    <div class="p-1.5 min-w-full inline-block align-middle">
      <div class="overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700" v-if="users.length > 0">
          <thead>
            <tr>
              <th scope="col" class="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
              <th scope="col" class="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">nombre</th>
              <th scope="col" class="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">estado</th>
              <th scope="col" class="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">observaciones</th>
              <th scope="col" class="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">contraseña</th>
              <th scope="col" class="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">codigo nivel</th>
              <th scope="col" class="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">nivel</th>
              <th scope="col" class="px-5 py-3 text-center text-xs font-medium text-gray-500 uppercase" colspan="2">accion
              </th>

            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="user in users" :key="user.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{{ user?.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{{ user?.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{{ user?.status ? 'activo'
                : 'inactivo' }} </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{{ user?.observation }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{{ user?.password }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{{ user?.nivel_id }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{{ user?.nivel?.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a class="text-blue-500 hover:text-blue-700" @click="editUserRoute(user?.id)">Editar</a>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a class="text-blue-500 hover:text-blue-700" @click="onDeleteUser(user?.id)">Eliminar</a>
              </td>
            </tr>
          </tbody>
        </table>
        <h2 class="text-center text-[#5b5b5b] font-bold text-4xl " v-else>cargando...</h2>


        <!-- niveles -->

        <H1 class="text-center text-[#5b5b5b] font-bold text-4xl mt-5 mb-2">Niveles</H1>
        <form @submit.prevent="onAddNivel"
          class=" md:flex md:items-end space-y-2  md:space-x-3 w-full mb-2">
          <div class="w-[250px]">
            <label for="input-label" class="block text-sm font-medium mb-2 dark:text-white">Agregar Nivel</label>
            <input type="text" id="nivel-label"
            class="py-3 px-4 block w-full border-gray-200 border-[1px] rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
            placeholder="Nombre del nivel" v-model="nivelName" required minlength="2">
          </div>
            <button
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-[11px] px-4 rounded focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
            type="submit">
            agregar
          </button>
        </form>



        <ul>
          <ol class="hover:bg-[#bdbdbd] w-min flex rounded-lg px-[2px] ml-[5%] gap-10 bg-[#fff] py-[2px]"
            v-for="nivel in niveles" :key="nivel?.id">
            <p class="w-[200px] text-left italic truncate"><strong>{{ nivel?.id }}.</strong> {{ nivel?.name }}</p>
            <button class="border-blue-400 w-auto bg-blue-500 rounded-xl py-[4px] px-[6px]  text-white"
              @click="editNivelRoute(nivel?.id)">Editar</button>
            <button class="border-blue-400 w-auto bg-blue-500 rounded-xl py-[4px] px-[6px]  text-white"
              @click="onDeleteNivel(nivel?.id)">Eliminar</button>
          </ol>
        </ul>



      </div>
    </div>
  </div>
</template>
