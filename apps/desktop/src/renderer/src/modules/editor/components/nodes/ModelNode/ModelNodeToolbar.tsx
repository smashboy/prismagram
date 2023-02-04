import { ActionIcon, Box, Group, Transition } from '@mantine/core'
import { IconPlugConnected, IconRowInsertBottom, IconTrash } from '@tabler/icons'

interface ModelNodeToolbarProps {
  isSelected: boolean
}

export const ModelNodeToolbar: React.FC<ModelNodeToolbarProps> = ({ isSelected }) => {
  return (
    <Transition mounted={isSelected} transition="slide-up">
      {(style) => (
        <Box style={style} sx={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <Group position="right">
            <ActionIcon>
              <IconTrash />
            </ActionIcon>
            <ActionIcon>
              <IconPlugConnected />
            </ActionIcon>
            <ActionIcon>
              <IconRowInsertBottom />
            </ActionIcon>
          </Group>
        </Box>
      )}
    </Transition>
  )
}
