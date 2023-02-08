import { attach, createEffect } from 'effector'
import { invoke } from '@renderer/core/electron'
import { Project } from '@shared/common/models/Project'
import { EditorData } from '@shared/common/models/Editor'
import { GET_EDITOR_DATA_ENDPOINT } from '@shared/common/configs/api'
import { $selectedProject } from '@renderer/modules/projects/stores/projects'

export const loadEditorDataEffect = attach({
  effect: createEffect<(project: Project | null) => Promise<EditorData>>((project) =>
    invoke(GET_EDITOR_DATA_ENDPOINT, project)
  ),
  source: $selectedProject
})

export const $isLoadingEditorData = loadEditorDataEffect.pending
