import { string2Color } from '@renderer/core/utils'
import { ScalarType } from '@shared/common/configs/prisma'

export enum EditorView {
  DIAGRAM = 'd',
  SCHEMA = 's',
  PRISMA_STUDIO = 'ps'
}

export const ScalarFieldColor = {
  [ScalarType.BIG_INT]: string2Color(ScalarType.BIG_INT),
  [ScalarType.BOOLEAN]: string2Color(ScalarType.BOOLEAN),
  [ScalarType.STRING]: string2Color(ScalarType.STRING),
  [ScalarType.INT]: string2Color(ScalarType.INT),
  [ScalarType.FLOAT]: string2Color(ScalarType.FLOAT),
  [ScalarType.DECIMAL]: string2Color(ScalarType.DECIMAL),
  [ScalarType.DATE_TIME]: string2Color(ScalarType.DATE_TIME),
  [ScalarType.JSON]: string2Color(ScalarType.JSON),
  [ScalarType.BYTES]: string2Color(ScalarType.BYTES)
}

export const NEW_MODEL_NODE_ID = 'new-model-node'
