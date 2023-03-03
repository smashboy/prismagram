import { Text, Timeline } from '@mantine/core'

export const RoadmapItem = () => (
  <Timeline.Item title="New branch">
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
  </Timeline.Item>
)
