import { Button, Group, Modal } from '@mantine/core'
import { $isOpenCloseAppModal, toggleCloseAppModalEvent } from '@renderer/stores/ui/modals'
import { APP_CLOSE } from '@shared/common/configs/api'
import { useStore } from 'effector-react'
import { invoke } from '../electron'

export const ConfirmCloseApplicationModal = () => {
  const isOpen = useStore($isOpenCloseAppModal)

  const handleCloseApp = () => invoke(APP_CLOSE)
  const handleCloseModal = () => toggleCloseAppModalEvent(false)

  return (
    <Modal
      opened={isOpen}
      onClose={handleCloseModal}
      title="Are you sure you want to quit Prismagram?"
    >
      <Group position="right">
        <Button onClick={handleCloseModal} color="gray" variant="subtle">
          Cancel
        </Button>
        <Button onClick={handleCloseApp} variant="subtle">
          Exit
        </Button>
      </Group>
    </Modal>
  )
}
