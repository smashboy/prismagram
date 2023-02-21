import { Select } from '@mantine/core'
import { ConfirmInput } from '@renderer/core/components'
import { $schemaEnumIds } from '@renderer/modules/editor/stores'
import { useStore } from 'effector-react'
import { scalarOptionsArray } from 'prisma-state/constants'

interface NewModelFieldInputProps {
  onClose: () => void
}

export const NewModelFieldInput: React.FC<NewModelFieldInputProps> = ({ onClose }) => {
  const enumIds = useStore($schemaEnumIds)

  return (
    <ConfirmInput label="Name" onCancel={onClose}>
      <Select label="Type" data={[...scalarOptionsArray, ...enumIds]} />
    </ConfirmInput>
  )
}
