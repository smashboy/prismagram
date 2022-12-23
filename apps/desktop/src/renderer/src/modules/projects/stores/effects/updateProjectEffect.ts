import { invoke } from '@renderer/core/electron'
import { UPDATE_PROJECT_ENDPOINT } from '@shared/common/configs/api'
import { Project } from '@shared/common/models/Project'
import { createEffect } from 'effector'

export const updateProjectEffect = createEffect<(project: Project) => Promise<Project>>((project) =>
  invoke(UPDATE_PROJECT_ENDPOINT, project)
)

export const $isUpdatingProject = updateProjectEffect.pending
