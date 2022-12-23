import { Accordion } from '@mantine/core'
import { $selectedProjectCommandsIds } from '@renderer/modules/projects'
import { useList } from 'effector-react'
import { EditPrismaCommandForm } from './EditPrismaCommandForm'

export const PrismaCommandsList = () => {
  const commands = useList($selectedProjectCommandsIds, (commandId) => (
    <EditPrismaCommandForm commandId={commandId} />
  ))

  return <Accordion>{commands}</Accordion>
}
