<script setup lang="ts">
</script>

<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-h5"><q-icon name="mdi-export" /> Sending Loxone Variables</div>
      <div class="text-subtitle">loxone-nexus → Loxone Miniserver</div>
    </q-card-section>
    <q-separator dark inset />
    <q-card-section>
      <p>
        To send a variable from loxone-nexus to the Loxone Miniserver, create it in loxone-nexus and then add it in Loxone Config.
        Loxone Intercommunication can automatically detect packets from external systems like loxone-nexus.
      </p>

      <div class="text-h6 q-pb-sm q-pt-sm">Sending a variable from loxone-nexus to the Loxone Miniserver</div>

      <div class="text-subtitle1 q-pb-sm q-pt-sm">1. Create the variable in loxone-nexus</div>
      <ul>
        <li>In the sidebar, select your <b>Loxone Miniserver instance</b>.</li>
        <li>Click the <b>Create Variable</b> button (top right) and keep the top bar on <b>Create</b>.</li>
        <li>Set the <b>direction</b> to <b>output</b> (loxone-nexus → Miniserver).</li>
        <li>Define the <b>Packet-ID</b> (max 8 characters, case-sensitive, letters and numbers only) and choose the <b>data type</b>.</li>
        <li>Enter a <b>label</b> and click <b>Save</b>.</li>
      </ul>

      <div class="text-subtitle1 q-pb-sm q-pt-sm">2. Detect and add the variable in Loxone Config</div>
      <p>Loxone Config can detect outgoing packets from loxone-nexus via the Intercommunication connection.</p>
      <ul>
        <li>Open your <b>Loxone Config</b> project.</li>
        <li>
          Navigate to <i>Miniserver → Network Periphery → Network Intercommunication → YOUR_LOXONE_NEXUS_CONNECTION</i>.<br>
          <small>If you don’t see this connection, create it first.</small>
        </li>
        <li>Click <b>Start Live View</b> to monitor incoming packets.</li>
        <li>Trigger a value change in loxone-nexus for this variable so it appears in Live View.</li>
        <li>Select the detected packet and click <b>Add input</b> to create the Intercommunication variable.</li>
        <li>Save and upload the project to your Miniserver.</li>
      </ul>

      <p><b>Done!</b> The variable now sends data from loxone-nexus to the Loxone Miniserver.</p>
    </q-card-section>
  </q-card>
</template>

<style scoped></style>
