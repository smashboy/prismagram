import { ActionIcon, Group, TextInput, TextInputProps } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons'

interface ConfirmInputProps extends TextInputProps {
  onConfirm?: () => void
  onCancel?: () => void
  disableConfirm?: boolean
  disableClose?: boolean
}

export const ConfirmInput: React.FC<ConfirmInputProps> = ({
  onConfirm,
  onCancel,
  disableClose = false,
  disableConfirm = false,
  ...props
}) => {
  return (
    <Group>
      <TextInput {...props} />
      <ActionIcon onClick={onCancel} disabled={disableClose} color="red">
        <IconX />
      </ActionIcon>
      <ActionIcon onClick={onConfirm} disabled={disableConfirm} color="green">
        <IconCheck />
      </ActionIcon>
    </Group>
  )
}
