import type { Integration, Integrations, IntegrationVariable } from "@/api/types/integrations"
import { useIntegrationStore } from "@/store/integration"
import { useLoxoneStore } from "@/store/loxone"
import { Notify } from "quasar"
import { io } from "socket.io-client"
import msgPackParser from "socket.io-msgpack-parser"

export class Socket {
  
  readonly socket = io({ transports: ["websocket"], parser: msgPackParser })
  
  constructor() {
    this.socket.io.on("close", this.onClose.bind(this))
    this.socket.io.on("reconnect", this.reconnect.bind(this))
    this.socket.on("instance:update.all", this.setInstances.bind(this))
    this.socket.on("instance:update.single", this.updateInstance.bind(this))
    this.socket.on("instance:update.variable", this.updateVariable.bind(this))
    this.socket.on("integrations:update.all", this.setIntegrations.bind(this))
    this.socket.on("integrations:update.single", this.setIntegration.bind(this))
    this.socket.on("integrations:update.variable", this.setIntegrationVariable.bind(this))
    this.socket.on("logs:push.all", this.setLogs.bind(this)) //not implemented yet
    this.socket.on("logs:push.new", this.addLogs.bind(this)) //not implemented yet
  }

  async authenticate() {
    const token = localStorage.getItem("access_token")
    if (!token) return console.error("could not authenticate, no access_token found")
    return await this.socket.emitWithAck("auth:token", { token })
  }

  logout() {
    return this.socket.emitWithAck("auth:logout", {})
  }

  private onClose() {
    Notify.create({
      color: "deep-orange",
      message: "websocket disconnected from backend... reconnecting...",
      icon: "mdi-alert"
    })
  }

  private async reconnect() {
    const token = localStorage.getItem("access_token")
    if (!token) return
    await this.socket.emitWithAck("auth:token", { token })
    Notify.create({
      color: "info",
      message: "websocket reconnected to backend!",
      icon: "mdi-check"
    })
  }

  private setInstances({ instances }: any) {
    useLoxoneStore().setInstances(instances)
  }

  private updateInstance({ instance }: any) {
    useLoxoneStore().updateInstance(instance)
  }

  private updateVariable({ variable }: any) {
    useLoxoneStore().updateVariable(variable)
  }

  private setIntegrations({ integrations }: { integrations: Integrations }) {
    useIntegrationStore().setIntegrations(integrations)
  }

  private setIntegration({ integration }: { integration: Integration }) {
    useIntegrationStore().setIntegration(integration)
  }

  private setIntegrationVariable({ variable }: { variable: IntegrationVariable }) {
    useIntegrationStore().setIntegrationVariable(variable)
  }

  //not implemented yet
  private setLogs(logs: any) {
    console.log("setLogs", logs)
  }

  //not implemented yet
  private addLogs(log: any) {
    console.log("addLog", log)
  }
 
}