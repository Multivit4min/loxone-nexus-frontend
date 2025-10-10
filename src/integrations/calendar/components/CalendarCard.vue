<script setup lang="ts">
import type { Integration } from "@/api/types/integrations"
import { computed } from "vue"
import { DateTime } from "luxon"

const { integration } = defineProps<{ integration: Integration }>()

const calendar = computed<any>(() => {
  if (!integration.specific.calendar) return null
  return integration.specific.calendar.vcalendar
})


const events = computed(() => integration.specific.events)

const formatStart = (event: any) => {
  return DateTime.fromISO(event.start).toLocaleString(DateTime.DATETIME_SHORT)
}

</script>

<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-h6">Calendar Events</div>
      <div class="text-caption" v-if="calendar">{{calendar.name}}</div>
    </q-card-section>
    <q-card-section>
      <q-list>
        <span v-for="event, index in events">
          <span v-if="new Date(event.end).getTime() > Date.now()">
            <q-item>
              <q-item-section>
                <q-item-label v-if="event.url">
                  <a :href="event.url" class="text-primary router-span-link" target="_blank">{{ event.summary }}</a>
                </q-item-label>
                <q-item-label v-if="!event.url">{{ event.summary }}</q-item-label>
                <q-item-label caption>{{formatStart(event)}}</q-item-label>
                <q-item-label caption lines="2">{{ event.description }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator spaced inset v-if="events.length-1 !== index" />
          </span>
        </span>
      </q-list>

      </q-card-section>
  </q-card>
</template>


<style scoped>
  .router-span-link {
    cursor: pointer;
  }
  </style>