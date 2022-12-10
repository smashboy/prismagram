import { sample } from 'effector'
import { loadEditorDataEffect } from '@renderer/modules/editor'
import { $isOpenSelectProjectModal, toggleSelectProjectModal } from '@renderer/stores/ui/modals'
import { projectEvents, selectProjectEvent } from './projects'
import { createProjectEffect, getProjectsListEffect } from './effects'

sample({
  clock: toggleSelectProjectModal,
  filter: (status) => !!status,
  target: getProjectsListEffect
})

sample({
  clock: getProjectsListEffect.doneData,
  fn: (projects) => projects.map((project) => ({ key: project.id, item: project })),
  target: projectEvents.addList
})

sample({
  clock: selectProjectEvent,
  fn: () => void 0,
  target: [loadEditorDataEffect]
})

sample({
  clock: loadEditorDataEffect.doneData,
  source: $isOpenSelectProjectModal,
  filter: (isOpen) => isOpen,
  fn: () => void 0,
  target: toggleSelectProjectModal
})

sample({
  clock: createProjectEffect.doneData,
  fn: (project) => ({ key: project.id, item: project }),
  target: projectEvents.add
})

sample({
  clock: createProjectEffect.doneData,
  fn: (project) => ({ key: project.id, item: project }),
  target: projectEvents.add
})

sample({
  clock: createProjectEffect.doneData,
  fn: (project) => project.id,
  target: selectProjectEvent
})
