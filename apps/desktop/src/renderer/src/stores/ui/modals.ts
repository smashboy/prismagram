import { debounce } from 'patronum'
import { createBooleanStore } from '@renderer/core/effector'
import { combine } from 'effector'

export const [$isOpenCreateProjectModal, toggleCreateProjectModalEvent] = createBooleanStore(false)
export const [$isOpenSelectProjectModal, toggleSelectProjectModalEvent] = createBooleanStore(false)

export const [$isOpenSettingsModal, toggleSettingsModalEvent] = createBooleanStore(false)

export const [$isOpenDetailsViewInitial, toggleModelNodeSidebarEvent] = createBooleanStore(false)
export const [$isOpenDetailsViewDebounced] = createBooleanStore(false)
export const $isOpenDetailsView = combine({
  isOpen: $isOpenDetailsViewInitial,
  isOpenDebounced: $isOpenDetailsViewDebounced
})

debounce({
  source: $isOpenDetailsViewInitial,
  timeout: 200,
  target: $isOpenDetailsViewDebounced
})
