import { Stack, Transition } from '@mantine/core'
import { $selectedProject } from '@renderer/modules/projects'
import {
  $isCreatingPrismaCommand,
  $isOpenCreateNewCommand,
  createPrismaCommandEffect,
  toggleOpenCreateNewCommandEvent
} from '@renderer/modules/settings/stores'
import { PrismaCommand } from '@shared/common/models/Prisma'
import { combine } from 'effector'
import { useStore } from 'effector-react'
import { SettingsSectionPaper } from '../../SettingsSectionPaper'
import { PrismaCommandForm } from './PrismaCommandForm'

const $store = combine({
  isOpen: $isOpenCreateNewCommand,
  project: $selectedProject,
  isLoading: $isCreatingPrismaCommand
})

export const NewPrismaCommandForm = () => {
  const { isOpen, project, isLoading } = useStore($store)

  const handleClose = () => toggleOpenCreateNewCommandEvent()
  const handleCreateCommand = async (command: PrismaCommand) => {
    await createPrismaCommandEffect({
      project,
      command
    })
    handleClose()
  }

  return (
    <Transition mounted={isOpen} transition="slide-down">
      {(style) => (
        <div style={style}>
          <SettingsSectionPaper title="New command">
            <Stack>
              <PrismaCommandForm
                onClose={handleClose}
                onSubmit={handleCreateCommand}
                isLoading={isLoading}
              />
            </Stack>
          </SettingsSectionPaper>
        </div>
      )}
    </Transition>
  )
}
