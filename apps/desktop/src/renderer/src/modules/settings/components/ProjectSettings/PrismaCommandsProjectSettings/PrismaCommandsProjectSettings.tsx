import { useStore } from 'effector-react'
import { Button, Group, Transition } from '@mantine/core'
import {
  $isOpenCreateNewCommand,
  toggleOpenCreateNewCommandEvent
} from '@renderer/modules/settings/stores'
import { IconPlus } from '@tabler/icons'
import { NewPrismaCommandForm } from './NewPrismaCommandForm'
import { PrismaCommandsList } from './PrismaCommandsList'

export const PrismaCommandsProjectSettings = () => {
  const isOpenNewCommandForm = useStore($isOpenCreateNewCommand)

  const handleOpenNewCommandForm = () => toggleOpenCreateNewCommandEvent()

  return (
    <>
      <Transition mounted={!isOpenNewCommandForm} transition="fade">
        {(style) => (
          <Group style={style}>
            <Button onClick={handleOpenNewCommandForm} rightIcon={<IconPlus size={16} />}>
              New command
            </Button>
          </Group>
        )}
      </Transition>
      <NewPrismaCommandForm />
      <PrismaCommandsList />
    </>
  )
}
