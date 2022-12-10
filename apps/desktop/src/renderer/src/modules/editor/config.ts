import { string2Color } from '@renderer/core/utils'
import { NodeType, ScalarType } from '@shared/common/configs/diagrams'
import { ModelNode } from './components/ModelNode'

export const nodeTypes = {
  [NodeType.MODEL]: ModelNode
}

export enum EditorView {
  DIAGRAM = 'd',
  SCHEMA = 's'
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
