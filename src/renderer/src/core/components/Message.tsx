import { Stack, Text } from '@mantine/core'

interface MessageProps {
  title: string
  description: string
  icon: React.ReactNode
  children?: React.ReactNode
}

export const Message: React.FC<MessageProps> = ({ title, description, icon, children }) => (
  <Stack w="100%" h="100%" spacing="xs" justify="center" align="center">
    {icon}
    <Text fz="xl">{title}</Text>
    <Text>{description}</Text>
    {children}
  </Stack>
)
