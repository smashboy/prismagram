import { sample } from 'effector'
import { $isOpenSpotlight, resetSpotlightSubActions } from './spotlight'

sample({
  source: $isOpenSpotlight,
  filter: (isOpen) => !isOpen,
  target: resetSpotlightSubActions
})
