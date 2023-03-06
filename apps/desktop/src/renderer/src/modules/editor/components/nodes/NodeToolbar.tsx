import { Group, Transition } from '@mantine/core'

interface NodeToolbarProps {
  isSelected: boolean
  children?: React.ReactNode
}

export const NodeToolbar: React.FC<NodeToolbarProps> = ({ isSelected, children }) => (
  <Transition mounted={isSelected} transition="slide-up">
    {(style) => (
      <Group spacing={0} style={style}>
        {/* <Group sx={{ flex: 1 }}>
          <DragHandle size="xl" className="custom-drag-handle" />
        </Group> */}
        <Group sx={{ flex: 1 }} position="right">
          {children}
        </Group>
      </Group>
    )}
  </Transition>
)
