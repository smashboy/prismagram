import { combine } from 'effector'
import { useStore } from 'effector-react'
import { $isOpenDetailsView, toggleModelNodeSidebarEvent } from '@renderer/stores/ui/modals'
import { ActionIcon, Group, Paper, ScrollArea, Stack, Transition } from '@mantine/core'
import { IconX } from '@tabler/icons'
import { $selectedModelId, resetSelectedModelEvent } from '../stores'
import { ModelSettings } from './forms/ModelSettings'

const $store = combine({
  isOpenDetailsView: $isOpenDetailsView,
  selectedModelNode: $selectedModelId
})

export const RightSidebar = () => {
  const {
    isOpenDetailsView: { isOpen, isOpenDebounced },
    selectedModelNode
  } = useStore($store)

  const isMounted = isOpen ? isOpenDebounced : isOpen

  const handleCloseSidebar = () => {
    toggleModelNodeSidebarEvent(false)
    resetSelectedModelEvent()
  }

  return (
    <Transition mounted={isMounted} transition="slide-left" duration={400} timingFunction="ease">
      {(styles) => (
        <Paper
          w={350}
          h="100%"
          shadow="md"
          py="xs"
          pl="xs"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, .5)',
            backdropFilter: 'blur(5px)',
            position: 'relative',
            overflow: 'hidden'
          }}
          style={styles}
        >
          <Group pr="xs" position="right">
            <ActionIcon onClick={handleCloseSidebar}>
              <IconX size={16} />
            </ActionIcon>
          </Group>
          <Stack h="100%" sx={{ overflowY: 'auto' }}>
            <ScrollArea>{selectedModelNode && <ModelSettings />}</ScrollArea>
          </Stack>
        </Paper>
      )}
    </Transition>
  )
}
