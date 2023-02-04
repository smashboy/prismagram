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
        backgroundColor: theme.colors[color][0],
        borderColor: theme.colors[color][5],
        borderWidth: 3
      })}
      withBorder
      draggable
    >
      <Stack align="center">
        <Icon size={24} />
        <Group>
          <Text color="dimmed" fz="lg">
            {title}
          </Text>
        </Group>
      </Stack>
    </Paper>
  )
}
