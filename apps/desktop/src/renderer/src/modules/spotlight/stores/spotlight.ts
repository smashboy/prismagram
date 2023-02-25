import { createBooleanStore } from '@renderer/core/effector'
import { createEvent, createStore } from 'effector'
import { SpotlightAction } from '../types'

interface SpotlightSubAction {
  parent: string
  actions: SpotlightAction[]
}

export const addSpotlightSubActionEvent = createEvent<SpotlightSubAction>()
export const removeLastSpotlightSubActionEvent = createEvent()
export const resetSpotlightSubActions = createEvent()

export const [$isOpenSpotlight, toggleOpenSpotlightEvent] = createBooleanStore(false)

export const $spotlightSubActions = createStore<SpotlightSubAction[]>([])
  .on(addSpotlightSubActionEvent, (store, action) => [...store, action])
  .on(removeLastSpotlightSubActionEvent, (store) => store.slice(0, -1))
  .reset(resetSpotlightSubActions)

export const $spotlightSubActionNames = $spotlightSubActions.map((actions) =>
  actions.map((action) => action.parent)
)
