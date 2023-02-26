import { sample } from 'effector'
import { $isOpenSpotlight, resetSpotlightSubActionsEvent } from './spotlight'

sample({
  source: $isOpenSpotlight,
  filter: (isOpen) => !isOpen,
  target: resetSpotlightSubActionsEvent
})
