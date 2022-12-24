import { invoke } from '@renderer/core/electron'
import { $selectedProject } from '@renderer/modules/projects'
import { EDITOR_LAUNCH_PRISMA_STUDIO_ENDPOINT } from '@shared/common/configs/api'
import { Project } from '@shared/common/models/Project'
import { attach, createEffect } from 'effector'

export const launchPrismaStudioEffect = attach({
  effect: createEffect((project: Project | null) =>
    invoke(EDITOR_LAUNCH_PRISMA_STUDIO_ENDPOINT, project!)
  ),
  source: $selectedProject
})

export const $isLaunchingPrismaStudio = launchPrismaStudioEffect.pending
