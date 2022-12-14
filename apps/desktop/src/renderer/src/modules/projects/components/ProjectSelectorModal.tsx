import { combine } from 'effector'
import { useStore } from 'effector-react'
import { Button, Modal } from '@mantine/core'
import { ProjectsList } from './ProjectsList'
import { $projectsArray } from '../stores/projects'
import {
  $isOpenSelectProjectModal,
  toggleCreateProjectModal,
  toggleSelectProjectModal
} from '@renderer/stores/ui/modals'
import { Message } from '@renderer/core/components'
import { IconBriefcase } from '@tabler/icons'

const $store = combine({
  isOpen: $isOpenSelectProjectModal,
  projects: $projectsArray
})

export const ProjectSelectorModal = () => {
  const { isOpen, projects } = useStore($store)

  const handleCloseDialog = () => toggleSelectProjectModal(false)
  const handleOpenCreateProjectModal = () => {
    handleCloseDialog()
    toggleCreateProjectModal(true)
  }

  return (
    <Modal opened={isOpen} onClose={handleCloseDialog} size="xl" title="Select project">
      {projects.length === 0 && (
        <Message
          icon={<IconBriefcase size={64} color="gray" />}
          title="You don't have any projects yet."
          description="Create new project by clicking the button below."
        >
          <Button onClick={handleOpenCreateProjectModal}>Create new project</Button>
        </Message>
      )}
      {projects.length > 0 && <ProjectsList projects={projects} />}
    </Modal>
  )
}
