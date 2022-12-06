import { createBooleanStore } from '@renderer/core/effector'

export const [$isOpenCreateProjectModal, toggleCreateProjectModal] = createBooleanStore(false)
export const [$isOpenSelectProjectModal, toggleSelectProjectModal] = createBooleanStore(false)
