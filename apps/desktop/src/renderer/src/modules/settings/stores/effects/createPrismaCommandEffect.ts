import { invoke } from '@renderer/core/electron'
import { CREATE_COMMAND_ENDPOINT } from '@shared/common/configs/api'
import { PrismaCommand } from '@shared/common/models/Prisma'
import { Project } from '@shared/common/models/Project'
import { createEffect } from 'effector'

interface CreatePrismaCommandEffectProps {
  project: Project
  command: PrismaCommand
}

export const createPrismaCommandEffect = createEffect<
  (props: CreatePrismaCommandEffectProps) => Promise<Project>
>((props) => invoke(CREATE_COMMAND_ENDPOINT, props))

export const $isCreatingPrismaCommand = createPrismaCommandEffect.pending
