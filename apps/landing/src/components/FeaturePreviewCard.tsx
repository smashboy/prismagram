import { Card, Group, MantineColor, rem, Stack, Text, ThemeIcon } from '@mantine/core'
import type { Icon } from '@tabler/icons-react'

interface FeaturePreviewCardProps {
  title: string
  icon: Icon
  color: MantineColor
  height: string
  largeIcon?: boolean
}

export const FeaturePreviewCard: React.FC<FeaturePreviewCardProps> = ({
  title,
  icon: Icon,
  color,
  height,
  largeIcon = false
}) => (
  <Card p="lg" radius="md" h={height} sx={(theme) => ({ backgroundColor: theme.colors[color][0] })}>
    <Stack w="100%" h="100%" justify="center" align="center">
      <ThemeIcon color={color} size={rem(largeIcon ? 80 : 60)}>
        <Icon size={rem(largeIcon ? 40 : 30)} />
      </ThemeIcon>
      <Group>
        <Text fz="xl" weight={500}>
          {title}
        </Text>
      </Group>
    </Stack>
  </Card>
)
