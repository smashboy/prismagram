import { sample } from 'effector'
import {
  $isOpenSpotlight,
  resetSpotlightSeachEvent,
  resetSpotlightSubActionsEvent
} from './spotlight'

sample({
  source: $isOpenSpotlight,
  filter: (isOpen) => !isOpen,
  target: [resetSpotlightSubActionsEvent, resetSpotlightSeachEvent]
})
