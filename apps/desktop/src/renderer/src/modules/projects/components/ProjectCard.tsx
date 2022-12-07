import { Button, Card, Group, Stack, Text } from '@mantine/core'
import alpha from 'color-alpha'
import { string2Color } from '@renderer/core/utils'
import { useStoreMap } from 'effector-react'
import { $projects, selectProjectEvent } from '../stores/projects'

interface ProjectCardProps {
  projectId: string
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ projectId }) => {
  const { name } = useStoreMap({
    store: $projects,
    keys: [projectId],
    fn: (projects, [id]) => projects.get(id)!
  })

  const handleSelectProject = () => selectProjectEvent(projectId)

  return (
    <Card bg={alpha(string2Color(name), 0.15)}>
      <Stack>
        <Text weight={500}>{name}</Text>
        <Group position="right">
          <Button onClick={handleSelectProject} variant="subtle" compact>
            Open
          </Button>
        </Group>
      </Stack>
    </Card>
  )
}
