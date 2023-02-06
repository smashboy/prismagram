import { NodeToolbar } from '../NodeToolbar'

interface EnumNodeToolbarProps {
  isSelected: boolean
  selectedNodeId: string | null
}

export const EnumNodeToolbar: React.FC<EnumNodeToolbarProps> = ({ selectedNodeId, isSelected }) => {
  return <NodeToolbar isSelected={isSelected}></NodeToolbar>
}
