import { Card } from '@mantine/core'
import { selectNodeEvent } from '../../stores'

interface NodeCardProps {
  nodeId: string
  isSelected: boolean
  selectedNodeId: string | null
  children: React.ReactNode
}

export const NodeCard: React.FC<NodeCardProps> = ({
  isSelected,
  selectedNodeId,
  nodeId,
  children
}) => {
  const handleSelectModel = () => selectNodeEvent(nodeId)

  return (
    <Card
      sx={(theme) => ({
        overflow: 'unset',
        borderColor: isSelected ? theme.colors.blue[6] : 'transparent',
        position: 'relative',
        borderWidth: 4,
        borderStyle: selectedNodeId !== nodeId ? 'dashed' : 'solid'
      })}
      onClick={handleSelectModel}
      withBorder
      shadow="lg"
    >
      {children}
    </Card>
  )
}
