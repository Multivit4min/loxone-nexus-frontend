<script setup lang="ts">
</script>

<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-h5"><q-icon name="mdi-import" /> Receiving Loxone Variables</div>
      <div class="text-subtitle">Loxone Miniserver → loxone-nexus</div>
    </q-card-section>
    <q-separator dark inset />
    <q-card-section>
      <div class="text-subtitle1 q-pb-sm q-pt-sm">1. Create the variable in Loxone Config</div>
      <ul>
        <li>Open your <b>Loxone Config</b> project.</li>
        <li>
          Navigate to <i>Miniserver → Network Periphery → Network Intercommunication → YOUR_LOXONE_NEXUS_CONNECTION</i> and click <b>Add output</b>.<br>
          <small>If you don’t see this connection, create it first in Loxone Config.</small>
        </li>
        <li>Open the settings of the newly created Intercommunication variable.</li>
        <li>Set the <b>Packet-ID</b> (max 8 characters, case-sensitive, letters and numbers only) and choose the desired <b>data type</b>.</li>
        <li>Save and upload the project to your Miniserver.</li>
      </ul>

      <div class="text-subtitle1 q-pb-sm q-pt-sm">2. Add the created variable to loxone-nexus</div>
      <p>
        loxone-nexus listens for packets sent by the Miniserver. After saving in Loxone Config,
        the variable will appear in the list of detected inputs.
      </p>
      <ul>
        <li>In the sidebar, select your <b>Loxone Miniserver instance</b>.</li>
        <li>Click the <b>Create Variable</b> button (top right).</li>
        <li>In the dialog, switch from <b>Create</b> to <b>Inputs</b>.</li>
        <li>Find the variable you created in Loxone Config.</li>
        <li>Click the <b>copy</b> icon to prefill the form in the <b>Create</b> tab.</li>
        <li>Enter a <b>label</b> and click <b>Save</b>.</li>
      </ul>

      <p><b>Done!</b> The variable is now active and ready to use in loxone-nexus.</p>
    </q-card-section>
  </q-card>
</template>

<style scoped></style>
