import { createEffect } from 'effector'
import { GET_PROJECTS_LIST_ENDPOINT } from '@shared/common/configs/api'
import { invoke } from '@renderer/core/electron'

export const getProjectsListEffect = createEffect(() => invoke(GET_PROJECTS_LIST_ENDPOINT))
