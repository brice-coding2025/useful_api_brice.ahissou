<template>
	<div class="px-6 pb-6">
          <form class="space-y-6" @submit.prevent="handleLogin">

            <!-- Email -->
            <div class="space-y-6">
              <label for="email" class="text-sm font-medium text-[#0F172A]">
                Email
              </label>
              <input type="email" id="email" v-model="email" required placeholder="Entrez votre email"
                class="w-full border px-3 py-2 rounded-lg focus:border-[#2563EB] focus:ring-[#2563EB]" />
            </div>

            <!-- Mot de passe -->
            <div class="space-y-6">
              <label for="password" class="text-sm font-medium text-[#0F172A]">
                Mot de passe
              </label>
              <input type="password" id="password" v-model="password" required placeholder="Entrez votre mot de passe"
                class="w-full border px-3 py-2 rounded-lg focus:border-[#2563EB] focus:ring-[#2563EB]" />
            </div>

            <!-- Message d'erreur -->
            <p v-if="errorMessage" class="text-red-500 text-sm">
              {{ errorMessage }}
            </p>

            <!-- Bouton Submit -->
            <button type="submit"
              class="w-full bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg py-3 cursor-pointer">
              Se connecter
            </button>

          </form>

          <!-- Lien vers Register -->
          <div class="mt-6 text-center">

            <p class="text-[#64748B]">
              Pas encore de compte ?
              <button type="button" @click="emit('switch-to-register')"
                class="text-[#2563EB] hover:underline cursor-pointer">
                S'inscrire
              </button>
            </p>
          </div>
        </div>
</template>


<script setup>
import { ref } from "vue"
import { useRouter, RouterLink } from "vue-router"
import { useUserStore } from "@/stores/users"

const email = ref("")
const password = ref("")
const errorMessage = ref("")

const userStore = useUserStore()
const router = useRouter()

async function handleLogin() {
  await auth.login(email.value, password.value)
  if (auth.token) {
    router.push('/')
    showSuccess('Connecté avec succès')
  }
}
    emit('close')

const props = defineProps({

})

const emit = defineEmits(['close', 'switch-to-register'])
</script>



