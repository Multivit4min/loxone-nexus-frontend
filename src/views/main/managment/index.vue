<script setup lang="ts">
import BackupCard from "./components/backup/BackupCard.vue"
import PowerCard from "./components/power/PowerCard.vue"
import UserCard from "./components/users/UserCard.vue"


</script>

<template>
  <div>
    <div class="row q-col-gutter-md">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <UserCard />
      </div>

      <div class="col-md-6 col-sm-12 col-xs-12">
        <div class="row q-col-gutter-md q-pb-md">
          <div class="col-xs-12">
            <PowerCard />
          </div>
        </div>
        <div class="row q-col-gutter-md">
          <div class="col-xs-12">
            <BackupCard />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
