import { useState } from 'react'
import { combine } from 'effector'
import { useStore } from 'effector-react'
import { Button, Group, Modal, Stack, TextInput } from '@mantine/core'
import { IconFile, IconFolder } from '@tabler/icons'
import { useEndpoint } from '@renderer/core/hooks'
import {
  GET_FOLDER_DIRECTORY_ENDPOINT,
  GET_PRISMA_SCHEMA_PATH_ENDPOINT
} from '@shared/common/configs/api'
import { $isOpenCreateProjectModal, toggleCreateProjectModal } from '@renderer/stores/ui/modals'
import { $isCreatingProject, createProjectEffect } from '../stores'

const $store = combine({
  isOpen: $isOpenCreateProjectModal,
  isCreatingProject: $isCreatingProject
})

export const CreateProjectModal = () => {
  const { isOpen, isCreatingProject } = useStore($store)

  const [projectName, setProjectName] = useState('')

  const [schemaPath, { invoke: invokeGetFilePath, reset: resetSchemaPath }] = useEndpoint(
    GET_PRISMA_SCHEMA_PATH_ENDPOINT,
    ''
  )
  const [
    projectDirectoryPath,
    { invoke: invokeGetProjectDirectory, reset: resetProjectDirectoryPath }
  ] = useEndpoint(GET_FOLDER_DIRECTORY_ENDPOINT, '')

  const handleGetFilePath = () => invokeGetFilePath(null, (res) => res ?? '')
  const handleGetProjectDirectory = () => invokeGetProjectDirectory(null, (res) => res ?? '')
  const handleProjectNameInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setProjectName(event.currentTarget.value)

  const handleCloseDialog = () => {
    toggleCreateProjectModal(false)
    resetProjectDirectoryPath()
    resetSchemaPath()
    setProjectName('')
  }

  const handleCreateProject = async () => {
    await createProjectEffect({
      name: projectName,
      schema: schemaPath,
      projectDirectory: projectDirectoryPath
    })

    handleCloseDialog()
  }

  const disableCreateButton = !schemaPath || !projectName

  return (
    <Modal opened={isOpen} onClose={handleCloseDialog} title="Create project">
      <Stack>
        <TextInput
          label="Project name"
          value={projectName}
          onChange={handleProjectNameInput}
          data-autofocus
          withAsterisk
        />
        <TextInput
          label="Schema file"
          value={schemaPath}
          withAsterisk
          icon={<IconFile size={14} />}
          onClick={handleGetFilePath}
          readOnly
        />
        <TextInput
          label="Project directory"
          value={projectDirectoryPath}
          description="From project directory you will be able to run migrations scripts"
          icon={<IconFolder size={14} />}
          onClick={handleGetProjectDirectory}
          readOnly
        />
        <Group position="right">
          <Button variant="subtle" color="gray" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button
            variant="filled"
            onClick={handleCreateProject}
            loading={isCreatingProject}
            disabled={disableCreateButton}
          >
            Create
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
