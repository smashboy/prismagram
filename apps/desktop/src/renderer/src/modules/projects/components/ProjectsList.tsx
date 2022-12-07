import { SimpleGrid } from '@mantine/core'
import { ProjectCard } from './ProjectCard'

interface ProjectsListProps {
  projects: string[]
}

export const ProjectsList: React.FC<ProjectsListProps> = ({ projects }) => (
  <SimpleGrid cols={3}>
    {projects.map((projectId) => (
      <ProjectCard key={projectId} projectId={projectId} />
    ))}
  </SimpleGrid>
)
