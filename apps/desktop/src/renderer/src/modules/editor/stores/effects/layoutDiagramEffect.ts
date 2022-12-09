import { createEffect } from 'effector'
import { invoke } from '@renderer/core/electron'
import { EDITOR_LAYOUT_NODES } from '@shared/common/configs/api'
import { Diagram } from '@shared/common/models/Diagram'
import { DiagramLayout } from '@shared/common/configs/diagrams'

interface LayoutDiagramEffectProps {
  diagram: Diagram
  layout: DiagramLayout
}

export const layoutDiagramEffect = createEffect<
  (props: LayoutDiagramEffectProps) => Promise<Diagram>
>((props: LayoutDiagramEffectProps) => invoke(EDITOR_LAYOUT_NODES, props))
