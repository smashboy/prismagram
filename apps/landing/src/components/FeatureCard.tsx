import {
  Card,
  Flex,
  MantineColor,
  Paper,
  rem,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title
} from '@mantine/core'
import type { Icon } from '@tabler/icons-react'

interface FeatureCardProps {
  title: string
  description: string
  videoUrl: string
  icon: Icon
  color: MantineColor
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  videoUrl,
  color
}) => {
  return (
    <Card
      w="100%"
      h="60vh"
      p="xl"
      radius="xl"
      sx={(theme) => ({ backgroundColor: theme.colors[color][0] })}
    >
      <SimpleGrid cols={2} spacing="xl" h="100%">
        <Stack h="100%">
          <Stack>
            <ThemeIcon color={color} size={rem(60)}>
              <Icon size={rem(30)} />
            </ThemeIcon>
            <Title fw={500} order={3} size={rem(30)}>
              {title}
            </Title>
          </Stack>
          <Text pt="xl" mt="xl" pr="xl">
            {description}
          </Text>
        </Stack>
        <Flex h="100%" align="center">
          <Paper radius="lg" sx={{ overflow: 'hidden' }}>
            <video src={videoUrl} width="100%" height="auto" muted controls />
          </Paper>
        </Flex>
      </SimpleGrid>
    </Card>
  )
}
