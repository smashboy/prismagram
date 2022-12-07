import { createStore } from 'effector'
import type { DMMF } from '@prisma/generator-helper'

export const $prisma = createStore<DMMF.Document | null>(null)
