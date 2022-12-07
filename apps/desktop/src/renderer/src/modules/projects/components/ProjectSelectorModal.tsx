import { combine } from 'effector'
import { useStore } from 'effector-react'
import { $isOpenSelectProjectModal, toggleSelectProjectModal } from '@renderer/stores/ui'
import { Modal } from '@mantine/core'
import { ProjectsList } from './ProjectsList'
import { $projectsArray } from '../stores'

const $store = combine({
  isOpen: $isOpenSelectProjectModal,
  projects: $projectsArray
})

export const ProjectSelectorModal = () => {
  const { isOpen, projects } = useStore($store)

  const handleCloseDialog = () => toggleSelectProjectModal(false)

  return (
    <Modal opened={isOpen} onClose={handleCloseDialog} size="xl" title="Select project">
      <ProjectsList projects={projects} />
    </Modal>
  )
}
