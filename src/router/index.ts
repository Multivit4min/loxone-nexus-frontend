import { createRouter, createWebHistory } from "vue-router"
import { useAuthStore } from "@/store/auth"
import { useConfigStore } from "@/store/config"
import Login from "@/views/Login.vue"
import Setup from "@/views/Setup.vue"
import Dashboard from "@/views/main/dashboard/index.vue"
import Loxone from "@/views/main/loxone/index.vue"
import Users from "@/views/main/users/index.vue"
import Integration from "@/views/main/integration/index.vue"
import Home from "@/views/main/home/Index.vue"
import Backup from "@/views/main/backup/index.vue"
import Test from "@/views/main/Test.vue"


const routes = [{ 
  path: "/login",
  name: "Login",
  component: Login
}, {
  path: "/setup",
  name: "Setup",
  component: Setup
}, {
  path: "/",
  name: "Dashboard",
  component: Dashboard,
  children: [{
    path: "",
    name: "Home",
    component: Home
  }, {
    path: "loxone/:instanceId",
    name: "Loxone",
    component: Loxone
  }, {
    path: "integration/:integrationId",
    name: "Integration",
    component: Integration
  }, {
    path: "users",
    name: "Users",
    component: Users
  }, {
    path: "backup",
    name: "Backup",
    component: Backup
  }, {
    path: "test",
    name: "Test",
    component: Test
  }]
}]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  document.title = String(to.name)
  const auth = useAuthStore()
  const config = useConfigStore()
  if (!config.initialized) await config.fetchGeneral()
  if (!config.general) throw new Error(`general config not loaded`)
  if (config.general.setup) {
    if (to.name !== "Setup") return next({ name: "Setup" })
    return next()
  }
  if (!auth.initialized) {
    const user = await auth.initialize()
    if (!user) return next({ name: "Login" })
    if (to.name === "Login") return next({ name: "Home" })
  }
  if (to.name !== "Login" && !auth.user) return next({ name: "Login" })
  if (to.name === "Setup" && !config.general.setup) {
    return next({ name: auth.user ? "Home" : "Login" })
  }
  return next()
})

export default router