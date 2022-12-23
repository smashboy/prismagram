import { combine, createEvent, createStore } from 'effector'
import { Project } from '@shared/common/models/Project'
import { createMapStore } from '@renderer/core/effector'
import { PrismaCommand } from '@shared/common/models/Prisma'

export const selectProjectEvent = createEvent<string>()
export const closeProjectEvent = createEvent()

export const [$projects, projectEvents] = createMapStore<Project>()

export const $projectsArray = $projects.map((projects) => [...projects.keys()])

export const $selectedProjectId = createStore<string | null>(null)
  .on(selectProjectEvent, (_, projectId) => projectId)
  .reset(closeProjectEvent)

export const $selectedProject = combine([$selectedProjectId, $projects]).map(([id, projects]) =>
  id ? projects.get(id)! : null
)

export const $selectedProjectCommands = $selectedProject.map((project) => {
  const commands = new Map<string, PrismaCommand>()

  if (!project?.commands) return commands

  for (const [id, command] of Object.entries(project.commands)) {
    commands.set(id, command)
  }

  return commands
})

export const $selectedProjectCommandsIds = $selectedProjectCommands.map((commands) => [
  ...commands.keys()
])
