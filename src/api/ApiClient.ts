import { Notify } from "quasar"


export class ApiClient {

  constructor() {}

  /**
   * Makes a request to the API with the specified method and URL.
   * @param method The HTTP method to use (GET, POST, PATCH, DELETE).
   * @param url The URL to request.
   */
  private async request<T>(method: "GET"|"POST"|"PATCH"|"DELETE", url: string, data?: object): Promise<T> {
    let body: string | undefined
    const headers: Record<string, string> = {}
    if (data) {
      headers["Content-Type"] = "application/json"
      body = JSON.stringify(data)
    }
    const accessToken = localStorage.getItem("access_token")
    if (accessToken) headers.Authorization = `Bearer ${accessToken}`
    const res = await fetch(url, { method, headers, body })
    if (!res.ok) {
      const body = await res.json()
      Notify.create({
        message: `(${res.status}) ${body.error}`,
        color: "red"
      })
      throw new Error(`Request failed with status ${res.status} (${res.statusText})`)

    }
    if (res.headers.get("Content-Type")?.includes("application/json")) {
      return res.json()
    } else {
      return {} as any
    }
  }

  async get<T = any>(url: string) {
    return this.request<T>("GET", url)
  }

  async post<T = any>(url: string, data: object) {
    return this.request<T>("POST", url, data)
  }

  async patch<T = any>(url: string, data?: object) {
    return this.request<T>("PATCH", url, data)
  }

  async delete<T = any>(url: string) {
    return this.request<T>("DELETE", url)
  }

}