<script setup lang="ts">
import type { LoxoneInstance } from "@/api/types/loxone"
import { useConfigStore } from "@/store/config"
import { useTemplateRef } from "vue"

const { instance } = defineProps<{ instance: LoxoneInstance }>()
const config = useConfigStore()
const open = defineModel<boolean>("open")

const canvasRef = useTemplateRef("canvas")

const positions: Record<string, [number,number]> = {
  ownId: [190, 354] as const,
  address: [190, 380] as const,
  port: [380, 408] as const
}

const writeText = (ctx: CanvasRenderingContext2D, text: string, [x, y]: [number, number]) => {
  const fontSize = 14
  ctx.font = `${fontSize}px "Segoe UI"`
  const margin = 4
  const { width } = ctx.measureText(text)
  ctx.fillText(text, x, y)
  ctx.strokeStyle = "red"
  ctx.strokeRect(x-margin, y+margin, width+margin*2, fontSize*-1-margin*2);
}


const showDialog = async () => {
  if (!canvasRef.value) return console.error("no canvas ref found")
  const ctx = canvasRef.value.getContext("2d")
  if (!ctx) return console.error("could not get context of canvas")
  const background = new Image()
  background.onload = () => {
    canvasRef.value!.width = background.width
    canvasRef.value!.height = background.height
    ctx.drawImage(background, 0, 0)
    writeText(ctx, config.config?.localAddress || "No Address found", positions.address)
    writeText(ctx, instance.ownId, positions.ownId)
    writeText(ctx, String(instance.port), positions.port)
  }
  background.src = "/images/remote_system.png"
}

</script>

<template>
  <q-dialog v-model="open" @show="showDialog">
    <q-card>
      <q-card-section>
        <div class="text-h6">You can find these settings under</div>
        <div class="text-subtitle2">MiniServer > Network Periphery > Network Intercommunication > Create Remote System</div>
      </q-card-section>
      <q-card-section>
        <canvas ref="canvas"></canvas>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
