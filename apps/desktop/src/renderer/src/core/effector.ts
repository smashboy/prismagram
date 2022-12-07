import { createApi, createEvent, createStore } from 'effector'

export const createBooleanStore = (defaultValue = false) => {
  const toggleEvent = createEvent<boolean | void>()

  const $store = createStore(defaultValue).on(toggleEvent, (store, data) => data ?? !store)

  return [$store, toggleEvent] as const
}

export const createMapStore = <T = unknown>() => {
  const $store = createStore<Map<string, T>>(new Map())

  const api = createApi($store, {
    add: (store, { key, item }: { key: string; item: T }) => {
      store.set(key, item)

      return new Map(store)
    },
    addList: (store, arr: Array<{ key: string; item: T }>) => {
      arr.forEach(({ key, item }) => store.set(key, item))
      return new Map(store)
    },
    remove: (store, key: string) => {
      store.delete(key)
      return new Map(store)
    },
    clear: (store) => {
      store.clear()
      return new Map(store)
    }
  })

  return [$store, api] as const
}
