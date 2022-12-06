import { createEvent, createStore } from 'effector'

export const createBooleanStore = (defaultValue = false) => {
  const toggleEvent = createEvent<boolean | void>()

  const $store = createStore(defaultValue).on(toggleEvent, (store, data) => data ?? !store)

  return [$store, toggleEvent] as const
}
