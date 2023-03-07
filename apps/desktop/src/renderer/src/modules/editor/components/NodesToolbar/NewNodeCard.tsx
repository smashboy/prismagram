import { Group, MantineColor, Paper, Stack, Text } from '@mantine/core'
import { NodeType } from '@shared/common/configs/diagrams'
import { TablerIcon } from '@tabler/icons'

interface NewNodeCardProps {
  icon: TablerIcon
  title: string
  nodeType: NodeType
  color: MantineColor
}

export const NewNodeCard: React.FC<NewNodeCardProps> = ({ icon: Icon, title, nodeType, color }) => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <Paper
      p="md"
      onDragStart={onDragStart}
      sx={(theme) => ({
        cursor: 'grab',
        backgroundColor:
          theme.colorScheme === 'light' ? theme.colors[color][0] : theme.colors[color][9],
        borderColor:
          theme.colorScheme === 'light' ? theme.colors[color][5] : theme.colors[color][7],
        borderWidth: 3
      })}
      withBorder
      draggable
    >
      <Stack align="center">
        <Icon size={24} />
        <Group>
          <Text fz="lg">{title} +</Text>
        </Group>
      </Stack>
    </Paper>
  )
}
