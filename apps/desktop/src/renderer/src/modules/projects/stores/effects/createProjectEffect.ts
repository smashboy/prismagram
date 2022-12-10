import { createEffect } from 'effector'
import { invoke } from '@renderer/core/electron'
import { CREATE_PROJECT_ENDPOINT } from '@shared/common/configs/api'
import { Project } from '@shared/common/models/Project'

interface CreateProjectEffectProps {
  name: string
  schema: string
  projectDirectory: string
}

export const createProjectEffect = createEffect<
  (props: CreateProjectEffectProps) => Promise<Project>
>((props) => invoke(CREATE_PROJECT_ENDPOINT, props))

export const $isCreatingProject = createProjectEffect.pending
