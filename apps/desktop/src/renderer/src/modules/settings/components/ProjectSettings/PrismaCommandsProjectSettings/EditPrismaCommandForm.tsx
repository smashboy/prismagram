import { combine } from 'effector'
import { useStore, useStoreMap } from 'effector-react'
import { Accordion, Button, Text } from '@mantine/core'
import {
  $isUpdatingProject,
  $selectedProject,
  $selectedProjectCommands,
  updateProjectEffect
} from '@renderer/modules/projects'
import { PrismaCommand } from '@shared/common/models/Prisma'
import { PrismaCommandForm } from './PrismaCommandForm'

interface EditPrismaCommandFormProps {
  commandId: string
}

const $store = combine({
  project: $selectedProject,
  isLoading: $isUpdatingProject
})

export const EditPrismaCommandForm: React.FC<EditPrismaCommandFormProps> = ({ commandId }) => {
  const { project, isLoading } = useStore($store)

  const command = useStoreMap({
    store: $selectedProjectCommands,
    keys: [commandId],
    fn: (commands, [id]) => commands.get(id)!
  })

  const { name } = command

  const handleSaveChanges = (updatedCommand: PrismaCommand) =>
    updateProjectEffect({
      ...project!,
      commands: { ...project?.commands, [commandId]: updatedCommand }
    })

  const handleDeleteCommand = () =>
    updateProjectEffect({
      ...project!,
      commands: project?.commands
        ? Object.entries(project.commands).reduce((acc, [id, cmd]) => {
            if (id === commandId) return acc
            return { ...acc, [id]: cmd }
          }, {})
        : void 0
    })

  return (
    <Accordion.Item value={commandId}>
      <Accordion.Control>
        <Text>{name}</Text>
      </Accordion.Control>
      <Accordion.Panel>
        <PrismaCommandForm
          defaultValues={command}
          onSubmit={handleSaveChanges}
          isLoading={isLoading}
          customActions={
            <Button color="red" onClick={handleDeleteCommand}>
              Delete
            </Button>
          }
        />
      </Accordion.Panel>
    </Accordion.Item>
  )
}
