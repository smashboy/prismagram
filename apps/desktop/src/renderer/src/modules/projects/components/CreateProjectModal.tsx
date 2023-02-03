import { useState } from 'react'
import { combine } from 'effector'
import { useStore } from 'effector-react'
import { Button, Group, Modal, Stack } from '@mantine/core'
import {
  $isOpenCreateProjectModal,
  toggleCreateProjectModalEvent
} from '@renderer/stores/ui/modals'
import { $isCreatingProject, createProjectEffect } from '../stores'
import { ProjectFormBase, ProjectFormBaseValues } from './ProjectFormBase'

const $store = combine({
  isOpen: $isOpenCreateProjectModal,
  isCreatingProject: $isCreatingProject
})

const initialFormValues: ProjectFormBaseValues = {
  name: '',
  schemaPath: '',
  projectDirectory: ''
}

export const CreateProjectModal = () => {
  const { isOpen, isCreatingProject } = useStore($store)

  const [project, setProject] = useState<ProjectFormBaseValues>(initialFormValues)

  const { name, projectDirectory, schemaPath } = project

  const handleCloseDialog = () => {
    toggleCreateProjectModalEvent(false)
    setProject(initialFormValues)
  }

  const handleCreateProject = async () => {
    await createProjectEffect({
      name,
      projectDirectory: projectDirectory ?? void 0
    })

    handleCloseDialog()
  }

  const disableCreateButton = !schemaPath || !name

  return (
    <Modal opened={isOpen} onClose={handleCloseDialog} title="Create project">
      <Stack>
        <ProjectFormBase values={project} onChange={setProject} />
        <Group position="right">
          <Button variant="subtle" color="gray" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button
            variant="subtle"
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
