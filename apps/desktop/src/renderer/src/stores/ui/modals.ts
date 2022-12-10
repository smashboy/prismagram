import { debounce } from 'patronum'
import { createBooleanStore } from '@renderer/core/effector'
import { combine } from 'effector'

export const [$isOpenCreateProjectModal, toggleCreateProjectModal] = createBooleanStore(false)
export const [$isOpenSelectProjectModal, toggleSelectProjectModal] = createBooleanStore(false)

export const [$isOpenModeNodelSidebar, toggleModelNodeSidebar] = createBooleanStore(false)

export const [$isOpenModeNodelSidebarDebounced] = createBooleanStore(false)

export const $isOpenRightSidebarModeNodel = combine({
  isOpen: $isOpenModeNodelSidebar,
  isOpenDebounced: $isOpenModeNodelSidebarDebounced
})

debounce({
  source: $isOpenModeNodelSidebar,
  timeout: 450,
  target: $isOpenModeNodelSidebarDebounced
})
