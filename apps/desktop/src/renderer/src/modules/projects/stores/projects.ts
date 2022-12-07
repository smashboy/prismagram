import { combine, createEvent, createStore } from 'effector'
import { Project } from '@shared/common/models/Project'
import { createMapStore } from '@renderer/core/effector'

export const selectProjectEvent = createEvent<string>()
export const closeProjectEvent = createEvent()

export const [$projects, projectEvents] = createMapStore<Project>()

export const $projectsArray = $projects.map((companies) => [...companies.keys()])

export const $selectedProjectId = createStore<string | null>(null)
  .on(selectProjectEvent, (_, projectId) => projectId)
  .reset(closeProjectEvent)

export const $selectedProject = combine([$selectedProjectId, $projects]).map(([id, projects]) =>
  id ? projects.get(id)! : null
)
