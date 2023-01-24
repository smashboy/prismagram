import { sample } from 'effector'
import { closePrismaStudioEffect, loadEditorDataEffect } from '@renderer/modules/editor'
import {
  $isOpenSelectProjectModal,
  toggleSelectProjectModalEvent
} from '@renderer/stores/ui/modals'
import { projectEvents, selectProjectEvent } from './projects'
import { createProjectEffect, getProjectsListEffect, updateProjectEffect } from './effects'
import { createPrismaCommandEffect } from '@renderer/modules/settings'

sample({
  clock: toggleSelectProjectModalEvent,
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
  target: [loadEditorDataEffect, closePrismaStudioEffect]
})

sample({
  clock: loadEditorDataEffect.doneData,
  source: $isOpenSelectProjectModal,
  filter: (isOpen) => isOpen,
  fn: () => void 0,
  target: toggleSelectProjectModalEvent
})

sample({
  clock: [
    createProjectEffect.doneData,
    updateProjectEffect.doneData,
    createPrismaCommandEffect.doneData
  ],
  fn: (project) => ({ key: project.id, item: project }),
  target: projectEvents.add
})

sample({
  clock: createProjectEffect.doneData,
  fn: (project) => project.id,
  target: selectProjectEvent
})
