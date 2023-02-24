import { createBooleanStore } from '@renderer/core/effector'

export const [$isOpenCreateProjectModal, toggleCreateProjectModalEvent] = createBooleanStore(false)
export const [$isOpenSelectProjectModal, toggleSelectProjectModalEvent] = createBooleanStore(false)

export const [$isOpenSettingsModal, toggleSettingsModalEvent] = createBooleanStore(false)

export const [$isOpenCloseAppModal, toggleCloseAppModalEvent] = createBooleanStore(false)
