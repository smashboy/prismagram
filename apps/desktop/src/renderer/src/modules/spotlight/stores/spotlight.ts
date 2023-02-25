import { createBooleanStore } from '@renderer/core/effector'

export const [$isOpenSpotlight, toggleOpenSpotlightEvent] = createBooleanStore(false)
