<script setup lang="ts">
  import { useAuthStore } from "@/store/auth"
  import { ref } from "vue"

  const auth = useAuthStore()
  const username = ref<string>("")
  const password = ref<string>("")

  const onSubmit = () => {
    auth.login(username.value, password.value)
  }

</script>

<template>    
  <div class="fixed-center" style="min-width:400px">
    <q-card>
      <q-card-section>
        <div class="text-h6">Loxone Nexus</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-lg">
          <q-input
            filled
            v-model="username"
            label="Username"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            filled
            type="password"
            v-model="password"
            label="Password"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <div>
            <q-btn label="Login" type="submit" color="primary"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped></style>
