import { Card, Text } from '@mantine/core'

export const RoadmapItem = () => (
  <Card withBorder>
    <Text color="dimmed" size="sm">
      You&apos;ve created new branch{' '}
      <Text variant="link" component="span" inherit>
        fix-notifications
      </Text>{' '}
      from master
    </Text>
    <Text size="xs" mt={4}>
      2 hours ago
    </Text>
  </Card>
)
