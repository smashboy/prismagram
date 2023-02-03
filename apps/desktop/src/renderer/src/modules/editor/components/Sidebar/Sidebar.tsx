import { Box, Stack } from '@mantine/core'
import { PaperGlass } from '@renderer/core/components'

import { ModelsList } from './ModelsList'
import { SidebarFooter } from './SidebarFooter'

export const Sidebar = () => {
  return (
    <PaperGlass
      withBorder
      w={300}
      h="100%"
      style={{ borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0 }}
    >
      <Stack h="100%" py="xs" pl="xs">
        <Box h="calc(100% - 40px)" sx={{ overflow: 'hidden' }}>
          <ModelsList />
        </Box>
        <SidebarFooter />
      </Stack>
    </PaperGlass>
  )
}
