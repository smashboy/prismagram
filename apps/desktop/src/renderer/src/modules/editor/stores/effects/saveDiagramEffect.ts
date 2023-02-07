import { invoke } from '@renderer/core/electron'
import { $selectedProject } from '@renderer/modules/projects'
import { EDITOR_SAVE_DIAGRAM } from '@shared/common/configs/api'
import { attach, combine, createEffect } from 'effector'
import { $diagram } from '../diagram'

export const saveDiagramEffect = attach({
  effect: createEffect((props) => invoke(EDITOR_SAVE_DIAGRAM, props)),
  source: combine({ diagram: $diagram, project: $selectedProject })
})
