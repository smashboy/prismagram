import { debounce } from 'patronum'
import { createBooleanStore } from '@renderer/core/effector'
import { combine } from 'effector'

export const [$isOpenCreateProjectModal, toggleCreateProjectModal] = createBooleanStore(false)
export const [$isOpenSelectProjectModal, toggleSelectProjectModal] = createBooleanStore(false)

export const [$isOpenSettingsModal, toggleSettingsModal] = createBooleanStore(false)

export const [$isOpenDetailsViewInitial, toggleModelNodeSidebar] = createBooleanStore(false)
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
