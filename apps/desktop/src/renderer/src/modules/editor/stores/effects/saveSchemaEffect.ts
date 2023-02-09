import { attach, combine, createEffect } from 'effector'
import { invoke } from '@renderer/core/electron'
import { $selectedProject } from '@renderer/modules/projects'
import { EDITOR_FORMAT_SCHEMA, EDITOR_SAVE_SCHEMA } from '@shared/common/configs/api'
import { $schemaState } from '../schema'

export const saveSchemaEffect = attach({
  effect: createEffect(async (props) => {
    const { schema, project } = props

    const formatted = await invoke(EDITOR_FORMAT_SCHEMA, schema.toString())

    return invoke(EDITOR_SAVE_SCHEMA, { project, schema: formatted })
  }),
  source: combine({ schema: $schemaState, project: $selectedProject })
})
