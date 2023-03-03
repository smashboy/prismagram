import { Paper } from '@mantine/core'

interface PaperSectionProps {
  children: React.ReactNode
}

export const PaperSection: React.FC<PaperSectionProps> = ({ children }) => {
  return (
    <Paper shadow="none" withBorder p="xs">
      {children}
    </Paper>
  )
}
