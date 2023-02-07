import { attach, combine, createEffect } from 'effector'
import { invoke } from '@renderer/core/electron'
import { $selectedProject } from '@renderer/modules/projects'
import { EDITOR_SAVE_SCHEMA } from '@shared/common/configs/api'
import { $schema } from '../schema'

export const saveSchemaEffect = attach({
  effect: createEffect((props) => invoke(EDITOR_SAVE_SCHEMA, props)),
  source: combine({ schema: $schema, project: $selectedProject })
})
