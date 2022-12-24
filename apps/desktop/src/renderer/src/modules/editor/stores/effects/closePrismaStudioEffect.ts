import { invoke } from '@renderer/core/electron'
import { EDITOR_CLOSE_PRISMA_STUDIO_ENDPOINT } from '@shared/common/configs/api'
import { createEffect } from 'effector'

export const closePrismaStudioEffect = createEffect(() =>
  invoke(EDITOR_CLOSE_PRISMA_STUDIO_ENDPOINT)
)
