<script setup lang="ts">
</script>

<template>
  <q-card flat bordered >
    <q-card-section>
      <div class="text-h5"><q-icon name="mdi-rocket-launch" /> Getting Started</div>
    </q-card-section>
    <q-separator dark inset />
    <q-card-section>
      First add a Loxone Miniserver by clicking the <b>+</b> icon in the left sidebar
      <ul>
        <li><b class="text-primary">Miniserver Label</b> just some arbitrary name which will be only for naming</li>
        <li><b class="text-primary">Host</b> the ip address of the Loxone Miniserver to connect</li>
        <li><b class="text-primary">Port</b> port the miniservers listens on, you can leave this as default</li>
        <li><b class="text-primary">Listen Port</b> the port on which loxone-nexus listens to, leave it as it is as long as you only add one miniserver</li>
        <li><b class="text-primary">Remote ID</b> the remote id which has been set in the loxone config under Miniserver > Network Periphery > Network Intercommunication</li>
        <li><b class="text-primary">Own ID</b> the id under which loxone-nexus sends packets to the Loxone Miniserver</li>
      </ul>
      After adding your Miniserver you can switch to the created Loxone Instance and click on the Help Icon in the left Panel to see how you add loxone-nexus to your Miniserver inside Loxone Config
    </q-card-section>
  </q-card>
</template>

<style scoped></style>
