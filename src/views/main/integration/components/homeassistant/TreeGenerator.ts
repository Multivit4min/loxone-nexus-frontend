import type { IntegrationActions } from "@/api/integration"
import type { ServiceResponse } from "./VariableTree.vue"

export type HomeAssistantState = {
  entityId: string
  namespace: string
  id: string
  values: Record<string, EntityValueType>
}

export type EntityValueType = string|number|boolean

export type Node = TreeRoot|TreeNamespaceEntry|InputEntry|HomeAssistantInput|HomeAssistantAction|OutputEntry
export type ChildNode = InputEntry|OutputEntry

export type Tree = TreeRoot[]
export type TreeRoot = {
  label: string
  header: "root"
  children: TreeNamespaceEntry[]
}
export type TreeNamespaceEntry<T extends ChildNode = any> = {
  label: string
  header: "namespace"
  children: T[]
}
export type InputEntry = {
  label: string
  header: "entity"
  children: HomeAssistantInput[]
}
export type HomeAssistantInput = {
  header: "input",
  label: string
  entityId: string
  key: string
  value: EntityValueType
}
export type OutputEntry = {
  label: string
  header: "output"
  children: HomeAssistantAction[]
}
export type HomeAssistantAction = {
  label: string
  header: "action"
  id: string
  entityId: string
  description?: string
}

export class TreeGenerator {

  private namespaceEntries?: Record<string, TreeNamespaceEntry>

  constructor(
    readonly states: HomeAssistantState[],
    readonly actions: IntegrationActions
  ) {}

  static deepCopy<T>(data: T): T {
    return JSON.parse(JSON.stringify(data))
  }

  getNamespaces<T extends ChildNode>(): Record<string, TreeNamespaceEntry<T>> {
    if (this.namespaceEntries) return TreeGenerator.deepCopy(this.namespaceEntries)
    this.namespaceEntries = {}
    const namespaces: string[] = []
    this.states.forEach(s => namespaces.includes(s.namespace) ? null : namespaces.push(s.namespace))
    namespaces.forEach(ns => {
      if (ns in this.namespaceEntries!) return
      this.namespaceEntries![ns] = {
        label: ns,
        header: "namespace",
        children: []
      }
    })
    return TreeGenerator.deepCopy(this.namespaceEntries)
  }

  buildInputs() {
    const ns = this.getNamespaces<InputEntry>()
    this.states.forEach(v => {
      ns[v.namespace].children.push({
        header: "entity",
        label: v.id,
        children: Object.keys(v.values).map<HomeAssistantInput>(key => ({
          label: key,
          header: "input",
          entityId: v.entityId,
          key,
          value: v.values[key]
        }))
      })
    })
    return Object.values(ns)
  }

  buildServiceActions() {
    const ns = this.getNamespaces<OutputEntry>()
    this.states.forEach(state => {
      const { namespace } = state
      const actions = this.actions.filter(action => action.id.startsWith(namespace))
      if (actions.length === 0) return
      ns[namespace].children.push({
        header: "output",
        label: state.id,
        children: actions.map(action => ({
          label: action.id,
          header: "action",
          domain: namespace,
          entityId: state.entityId,
          ...action
        }))
      })
    })
    return Object.values(ns)
  }

  static build(states: HomeAssistantState[], services: IntegrationActions): Tree {
    const tree = new TreeGenerator(states, services)
    return [{
      label: "inputs",
      header: "root",
      children: tree.buildInputs()
    }, {
      label: "outputs",
      header: "root",
      children: tree.buildServiceActions()
    }]
  }

}