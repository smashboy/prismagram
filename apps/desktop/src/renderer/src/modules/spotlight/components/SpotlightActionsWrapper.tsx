import { Box, ScrollArea } from '@mantine/core'

interface SpotlightActionsWrapperProps {
  children?: React.ReactNode
}

export const SpotlightActionsWrapper: React.FC<SpotlightActionsWrapperProps> = ({ children }) => (
  <ScrollArea>
    <Box sx={{ maxHeight: 450 }}>{children}</Box>
  </ScrollArea>
)
