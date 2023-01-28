import { attach, createEffect } from 'effector'
import { invoke } from '@renderer/core/electron'
import { EDITOR_LAYOUT_NODES_ENDPOINT } from '@shared/common/configs/api'
import { DiagramLayout } from '@shared/common/configs/diagrams'
import { $diagram } from '../diagram'

// interface LayoutDiagramEffectProps {
//   diagram: Diagram
//   layout: DiagramLayout
// }

// createEffect<(props: LayoutDiagramEffectProps) => Promise<Diagram>

export const layoutDiagramEffect = attach({
  effect: createEffect((diagram) =>
    invoke(EDITOR_LAYOUT_NODES_ENDPOINT, { diagram, layout: DiagramLayout.HORIZONTAL })
  ),
  source: $diagram
})
