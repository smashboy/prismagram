import { ActionIcon, Group, TextInput, TextInputProps } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons'

interface ConfirmInputProps extends TextInputProps {
  onConfirm?: () => void
  onCancel?: () => void
  disableConfirm?: boolean
  disableClose?: boolean
  children?: React.ReactNode
}

export const ConfirmInput: React.FC<ConfirmInputProps> = ({
  onConfirm,
  onCancel,
  disableClose = false,
  disableConfirm = false,
  children,
  ...props
}) => {
  return (
    <Group align="flex-end">
      <TextInput {...props} />
      {children}
      <Group mb={5}>
        <ActionIcon onClick={onCancel} disabled={disableClose} color="red">
          <IconX />
        </ActionIcon>
        <ActionIcon onClick={onConfirm} disabled={disableConfirm} color="green">
          <IconCheck />
        </ActionIcon>
      </Group>
    </Group>
  )
}
