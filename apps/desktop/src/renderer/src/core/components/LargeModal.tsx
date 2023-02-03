import { Modal, ModalProps } from '@mantine/core'

export const LargeModal: React.FC<Omit<ModalProps, 'sx' | 'size'>> = ({ children, ...props }) => (
  <Modal
    {...props}
    size="95vw"
    sx={{
      '& .mantine-Modal-modal': {
        height: '90vh'
      },
      '& .mantine-Modal-body': {
        height: 'calc(100% - 35px)'
      }
    }}
  >
    {children}
  </Modal>
)
