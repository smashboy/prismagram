import { createApi, createEvent, createStore, sample, Store } from 'effector'

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

export const createHistoryStore = <T = unknown>($store: Store<T>) => {
  const initialState = $store.getState()

  const $history = createStore({
    states: [initialState],
    index: 0
  })

  const $current = $history.map((history) => history.states[history.index])

  const internalAPi = createApi($history, {
    add: ({ states, index }, store: T) => ({ states: [...states, store], index: index + 1 })
  })

  const api = createApi($history, {
    undo: ({ states, index }) => ({
      states,
      index: Math.max(index - 1, 0)
    }),
    redo: ({ states, index }) => ({ states, index: Math.min(index + 1, states.length - 1) }),
    clear: ({ states, index }) => ({ states: [states[index]], index: 0 })
  })

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  sample({
    source: $store,
    target: internalAPi.add
  })

  return [$current, api, $history] as const
}
