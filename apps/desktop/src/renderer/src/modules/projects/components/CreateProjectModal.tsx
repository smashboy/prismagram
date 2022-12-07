import { useState } from 'react'
import { useStore } from 'effector-react'
import { Button, Group, Modal, Stack, TextInput } from '@mantine/core'
import { $isOpenCreateProjectModal, toggleCreateProjectModal } from '@renderer/stores/ui'
import { IconFile, IconFolder } from '@tabler/icons'
import { useEndpoint } from '@renderer/core/hooks'

export const CreateProjectModal = () => {
  const isOpen = useStore($isOpenCreateProjectModal)

  const [_, { invoke: invokeCreateProject, isLoading: isCreatingProject }] =
    useEndpoint('projects.create')

  const [projectName, setProjectName] = useState('')
  const [schemaPath, { invoke: invokeGetFilePath, reset: resetSchemaPath }] = useEndpoint(
    'prisma.get-schema-path',
    ''
  )
  const [
    projectDirectoryPath,
    { invoke: invokeGetProjectDirectory, reset: resetProjectDirectoryPath }
  ] = useEndpoint('files.get-directory', '')

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

  const handleCreateProject = () =>
    invokeCreateProject({
      name: projectName,
      schema: schemaPath,
      projectDirectory: projectDirectoryPath
    })

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
