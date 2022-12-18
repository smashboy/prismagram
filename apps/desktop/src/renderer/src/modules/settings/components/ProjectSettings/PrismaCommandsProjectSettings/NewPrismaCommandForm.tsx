import { Button, Group, Stack, Transition } from '@mantine/core'
import {
  $isOpenCreateNewCommand,
  toggleOpenCreateNewCommandEvent
} from '@renderer/modules/settings/stores'
import { useStore } from 'effector-react'
import { SettingsSectionPaper } from '../../SettingsSectionPaper'
import { PrismaCommandForm } from './PrismaCommandForm'

export const NewPrismaCommandForm = () => {
  const isOpen = useStore($isOpenCreateNewCommand)

  const handleClose = () => toggleOpenCreateNewCommandEvent()

  return (
    <Transition mounted={isOpen} transition="slide-down">
      {(style) => (
        <div style={style}>
          <SettingsSectionPaper title="New command">
            <Stack>
              <PrismaCommandForm />
              <Group position="right">
                <Button onClick={handleClose} variant="subtle" color="gray">
                  Close
                </Button>
                <Button variant="filled">Save</Button>
              </Group>
            </Stack>
          </SettingsSectionPaper>
        </div>
      )}
    </Transition>
  )
}
