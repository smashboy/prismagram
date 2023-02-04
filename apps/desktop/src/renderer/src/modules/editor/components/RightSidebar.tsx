import { combine } from 'effector'
import { useStore } from 'effector-react'
import { $isOpenDetailsView, toggleModelNodeSidebarEvent } from '@renderer/stores/ui/modals'
import { ActionIcon, Group, ScrollArea, Stack, Transition } from '@mantine/core'
import { IconX } from '@tabler/icons'
import { $selectedNodeId, resetSelectedNodeEvent } from '../stores'
import { ModelSettings } from './forms/ModelSettings'
import { PaperGlass } from '@renderer/core/components'

const $store = combine({
  isOpenDetailsView: $isOpenDetailsView,
  selectedModelNode: $selectedNodeId
})

export const RightSidebar = () => {
  const {
    isOpenDetailsView: { isOpen, isOpenDebounced },
    selectedModelNode
  } = useStore($store)

  const isMounted = isOpen ? isOpenDebounced : isOpen

  const handleCloseSidebar = () => {
    toggleModelNodeSidebarEvent(false)
    resetSelectedNodeEvent()
  }

  return (
    <Transition mounted={isMounted} transition="slide-left" duration={400} timingFunction="ease">
      {(styles) => (
        <PaperGlass
          w={350}
          h="100%"
          py="xs"
          pl="xs"
          withBorder
          style={{
            ...styles,
            position: 'relative',
            overflow: 'hidden',
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderBottomWidth: 0
          }}
        >
          <Group pr="xs" position="right">
            <ActionIcon onClick={handleCloseSidebar}>
              <IconX size={16} />
            </ActionIcon>
          </Group>
          <Stack h="100%" sx={{ overflowY: 'auto' }}>
            <ScrollArea>{selectedModelNode && <ModelSettings />}</ScrollArea>
          </Stack>
        </PaperGlass>
      )}
    </Transition>
  )
}
