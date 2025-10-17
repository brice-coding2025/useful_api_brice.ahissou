<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/users";

const store = useUserStore();
const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref(null);
const dob = ref("");
const emit = defineEmits(['close', 'switch-to-login'])

async function handleRegister(e) {
    e.preventDefault();
    error.value = null;

    if (password.value != confirmPassword.value) {
        error.value = "Les mots de passe ne correspondent pas";
        return;
    }
    if (!validateAge()) {
        return;
    };

    try {
        // on récupère le résultat retourné par store.register (user + token)
        const result = await store.register({
            name: name.value,
            email: email.value,
            dob: dob.value,
            password: password.value,
            password_confirmation: confirmPassword.value,
        });

        // si le backend renvoie un token, on le stocke (nécessaire pour resend)
        if (result && result.token) {
            localStorage.setItem('token', result.token);
        }

        // on prépare l'email à afficher dans le popup (préférence : réponse backend)
        userEmail.value = (result && result.user && result.user.email) ? result.user.email : email.value;

        // reset champs formulaire
        name.value = "";
        email.value = "";
        dob.value = "";
        password.value = "";
        confirmPassword.value = "";
        ageError.value = "";
        error.value = null;

        showPopup.value = true;

    } catch (err) {
        error.value = err.message || "Erreur lors de l'inscription";
    }
}
</script>


<template>
  <p class="text-gray-500">Créez votre compte pour commencer à commenter</p>

   <!-- Formulaire -->
 <div class="px-6 pb-6">
   <form class="space-y-6" @submit.prevent="handleRegister">

      <!-- Nom d'utilisateur -->
    <div class="space-y-2">
      <label for="pseudo" class="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
      <input v-model="name" type="text" id="pseudo" required class="w-full border rounded-lg px-3 py-2 focus:ring-[#2563EB] focus:border-[#2563EB]" />
    </div>

       <!-- Email -->
    <div class="space-y-2">
      <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
      <input v-model="email" type="email" id="email" required class="w-full border rounded-lg px-3 py-2 focus:ring-[#2563EB] focus:border-[#2563EB]" />
    </div>

         <!-- Mot de passe -->
    <div class="space-y-2">
      <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
      <input v-model="password" type="password" id="password" required class="w-full border rounded-lg px-3 py-2 focus:ring-[#2563EB] focus:border-[#2563EB]" />
    </div>

        <!-- Confirmer mot de passe -->
    <div class="space-y-2">
      <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
      <input v-model="confirmPassword" type="password" id="confirmPassword" required class="w-full border rounded-lg px-3 py-2 focus:ring-[#2563EB] focus:border-[#2563EB]" />
    </div>

                        <!-- Message d'erreur -->
                        <p v-if="error" class="text-red-500 text-center text-sm">{{ error }}</p>

         <!-- Bouton Submit -->
      <button type="submit"
       class="w-full bg-[#2563EB] text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
         Créer le compte
      </button>


    </form>

   <!-- Lien vers Login -->
      <div class="mt-6 text-center">
        <p class="text-gray-500">
            Déjà un compte ?
         <button type="button" @click="emit('switch-to-login')"
            class="text-[#2563EB] hover:underline cursor-pointer">
            Se connecter
          </button>
         </p>
       </div>

   </div>

</template>
