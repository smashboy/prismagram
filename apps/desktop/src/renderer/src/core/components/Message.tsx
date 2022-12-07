import { Box, Stack, Text } from '@mantine/core'

interface MessageProps {
  title: string
  description: string
  icon: React.ReactNode
  children?: React.ReactNode
}

export const Message: React.FC<MessageProps> = ({ title, description, icon, children }) => (
  <Stack w="100%" h="100%" justify="center" spacing={0} align="center">
    {icon}
    <Text fz="xl" color="gray">
      {title}
    </Text>
    <Text color="gray">{description}</Text>
    <Box mt="sm">{children}</Box>
  </Stack>
)
