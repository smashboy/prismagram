import { useStore } from 'effector-react'
import { $isOpenDetailsView, toggleModelNodeSidebar } from '@renderer/stores/ui/modals'
import { ActionIcon, Group, Paper, Stack, Transition } from '@mantine/core'
import { IconX } from '@tabler/icons'
import { combine } from 'effector'
import { $selectedModelNodeId } from '../../stores'

const $store = combine({
  isOpenDetailsView: $isOpenDetailsView,
  selectedModelNode: $selectedModelNodeId
})

export const RightSidebar = () => {
  const {
    isOpenDetailsView: { isOpen, isOpenDebounced }
  } = useStore($store)

  const isMounted = isOpen ? isOpenDebounced : isOpen

  const handleCloseSidebar = () => toggleModelNodeSidebar(false)

  return (
    <Transition mounted={isMounted} transition="slide-left" duration={400} timingFunction="ease">
      {(styles) => (
        <Paper
          w={350}
          h="100%"
          shadow="md"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, .5)',
            backdropFilter: 'blur(5px)',
            position: 'relative',
            overflow: 'hidden'
          }}
          style={styles}
        >
          <Group p="xs" position="right">
            <ActionIcon onClick={handleCloseSidebar}>
              <IconX size={16} />
            </ActionIcon>
          </Group>
          <Stack h="100%" sx={{ overflowY: 'auto' }}>
            {/* <ScrollArea offsetScrollbars>
              {selectedModelNode && <SelectedModelNodeSettings />}
            </ScrollArea> */}
          </Stack>
        </Paper>
      )}
    </Transition>
  )
}
