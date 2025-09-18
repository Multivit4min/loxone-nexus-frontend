<script setup lang="ts">
  import { useConfigStore } from "@/store/config"
import { ref } from "vue"

  const config = useConfigStore()

  const username = ref<string>("")
  const password = ref<string>("")
  const password2 = ref<string>("")

  const onSubmit = () => {
    if (password.value !== password2.value) throw new Error(`password missmatch`)
    config.setup({ username: username.value, password: password.value })
  }

</script>

<template>    
  <div class="fixed-center" style="min-width:400px">
    <q-card>
      <q-card-section>
        <div class="text-h6">Loxone Manager Setup</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-lg">
          <q-input
            filled
            v-model="username"
            label="Username"
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            filled
            type="password"
            v-model="password"
            label="Password"
            :rules="[ val => val && val.length >= 6 || 'Password needs to have minimum 6 characters']"
          />
          <q-input
            filled
            type="password"
            v-model="password2"
            label="Confirm Password"
            :rules="[ val => password === val || 'Password missmatch']"
          />

          <div>
            <q-btn label="Complete" type="submit" color="primary"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped></style>
