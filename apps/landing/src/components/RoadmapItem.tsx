import { Card, Text } from '@mantine/core'

interface RoadmapItemProps {
  description?: string
  releaseDate: string
}

export const RoadmapItem: React.FC<RoadmapItemProps> = ({ description, releaseDate }) => (
  <Card withBorder>
    {description && (
      <Text color="dimmed" size="sm">
        {description}
      </Text>
    )}
    <Text size="xs" mt={4}>
      {releaseDate}
    </Text>
  </Card>
)
