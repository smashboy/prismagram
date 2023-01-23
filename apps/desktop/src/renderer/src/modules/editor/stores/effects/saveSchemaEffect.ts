import { attach, combine, createEffect } from 'effector'
import { invoke } from '@renderer/core/electron'
import { $selectedProject } from '@renderer/modules/projects'
import { EDITOR_SAVE_SCHEMA } from '@shared/common/configs/api'
import { $schema } from '../schema'

export const saveSchemaEffect = attach({
  effect: createEffect(({ schema, project }) => invoke(EDITOR_SAVE_SCHEMA, { schema, project })),
  source: combine({ schema: $schema, project: $selectedProject })
})
