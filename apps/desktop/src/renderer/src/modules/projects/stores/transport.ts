import { sample } from 'effector'
import { loadEditorDataEffect } from '@renderer/modules/editor'
import { toggleSelectProjectModal } from '@renderer/stores/ui/modals'
import { getProjectsListEffect } from './effects/getProjectsListEffect'
import { projectEvents, selectProjectEvent } from './projects'

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
  target: [loadEditorDataEffect, toggleSelectProjectModal]
})
