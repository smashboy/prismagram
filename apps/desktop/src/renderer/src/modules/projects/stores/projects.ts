import { createStore, sample } from 'effector'
import { Project } from '@common/models'
import { createMapStore } from '@renderer/core/effector'
import { toggleSelectProjectModal } from '@renderer/stores/ui'
import { getProjectsListEffect } from './effects'

export const [$projects, projectEvents] = createMapStore<Project>()

export const $projectsArray = $projects.map((companies) => [...companies.keys()])

export const $selectedProjectId = createStore<string | null>(null)

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
