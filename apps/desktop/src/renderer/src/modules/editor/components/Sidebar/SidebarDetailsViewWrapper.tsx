import { ActionIcon, Box, Group, Text, Transition } from '@mantine/core'
import { toggleModelNodeSidebarEvent } from '@renderer/stores/ui/modals'
import { IconArrowLeft } from '@tabler/icons'
import { useStore } from 'effector-react'
import { $selectedNodeId, resetSelectedNodeEvent } from '../../stores'

interface SidebarDetailsViewWrapperProps {
  isOpen: boolean
  title?: React.ReactNode
  children: React.ReactNode
}

export const SidebarDetailsViewWrapper: React.FC<SidebarDetailsViewWrapperProps> = ({
  isOpen,
  children,
  title
}) => {
  const selectedModelId = useStore($selectedNodeId)

  const handleCloseSidebar = () => {
    toggleModelNodeSidebarEvent(false)
    if (selectedModelId) resetSelectedNodeEvent()
  }

  return (
    <Transition mounted={isOpen} transition="fade" duration={200} timingFunction="ease">
      {(style) => (
        <Box w="100%" h="100%" style={style}>
          <Group pb="xs" position="left">
            <ActionIcon onClick={handleCloseSidebar}>
              <IconArrowLeft size={16} />
            </ActionIcon>
            {title && <Text>{title}</Text>}
          </Group>
          {children}
        </Box>
      )}
    </Transition>
  )
}
