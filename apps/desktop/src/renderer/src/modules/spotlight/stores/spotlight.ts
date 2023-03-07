import { createBooleanStore } from '@renderer/core/effector'
import { createEvent, createStore } from 'effector'
import { SpotlightAction } from '../types'

interface SpotlightSubAction {
  parent: string
  actions: SpotlightAction[]
}

export const addSpotlightSubActionEvent = createEvent<SpotlightSubAction>()
export const removeLastSpotlightSubActionEvent = createEvent()
export const resetSpotlightSubActionsEvent = createEvent()

export const setSpotlightSeachEvent = createEvent<string>()
export const resetSpotlightSeachEvent = createEvent()

export const $spotlightSearchInput = createStore('')
  .on(setSpotlightSeachEvent, (_, value) => value)
  .reset(resetSpotlightSeachEvent)

export const [$isOpenSpotlight, toggleOpenSpotlightEvent] = createBooleanStore(false)

export const $spotlightSubActions = createStore<SpotlightSubAction[]>([])
  .on(addSpotlightSubActionEvent, (store, action) => [...store, action])
  .on(removeLastSpotlightSubActionEvent, (store) => store.slice(0, -1))
  .reset(resetSpotlightSubActionsEvent)

export const $spotlightSubActionNames = $spotlightSubActions.map((actions) =>
  actions.map((action) => action.parent)
)
