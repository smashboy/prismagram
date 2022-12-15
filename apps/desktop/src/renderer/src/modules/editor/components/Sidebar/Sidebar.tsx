import { Box, Paper, Stack, Transition } from '@mantine/core'
import { $isOpenDetailsView } from '@renderer/stores/ui/modals'
import { combine } from 'effector'
import { useStore } from 'effector-react'
import { $selectedSchemaModel } from '../../stores'
import { SelectedModelNodeSettings } from './SelectedModelNodeSettings'
import { ModelsList } from './ModelsList'
import { SidebarFooter } from './SidebarFooter'
import { SidebarDetailsViewWrapper } from './SidebarDetailsViewWrapper'

const $store = combine({
  isOpenDetailsView: $isOpenDetailsView,
  selectedModel: $selectedSchemaModel
})

export const Sidebar = () => {
  const {
    isOpenDetailsView: { isOpen, isOpenDebounced },
    selectedModel
  } = useStore($store)

  const isMountedSecondView = isOpen ? isOpenDebounced : isOpen
  const isMountedMainView = isOpen || isOpenDebounced

  return (
    <Paper
      w={350}
      h="100%"
      shadow="md"
      sx={{ backgroundColor: 'rgba(255, 255, 255, .5)', backdropFilter: 'blur(5px)' }}
    >
      <Stack h="100%" py="xs" pl="xs">
        <Box h="calc(100% - 40px)" sx={{ overflow: 'hidden' }}>
          <Transition
            mounted={isMountedMainView ? false : true}
            transition="fade"
            duration={200}
            timingFunction="ease"
          >
            {(style) => (
              <Box w="100%" h="100%" style={style}>
                <ModelsList />
              </Box>
            )}
          </Transition>
          <SidebarDetailsViewWrapper title={selectedModel?.name} isOpen={isMountedSecondView}>
            {selectedModel && <SelectedModelNodeSettings />}
          </SidebarDetailsViewWrapper>
        </Box>
        <SidebarFooter />
      </Stack>
    </Paper>
  )
}
