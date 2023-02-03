import { forwardRef } from 'react'
import { Badge, Select, SelectItem, Stack, Group, Text } from '@mantine/core'
import { PrismaSchemaState } from 'prisma-state'
import { RelationAttribute } from 'prisma-state/attributes'
import { Model } from 'prisma-state/blocks'
import { ReferentialAction, ReferentialActionOption } from 'prisma-state/constants'
import { cloneSchemaState } from '@renderer/core/utils'

interface ReferentialActionSelectProps {
  name: string
  model: Model
  variant?: 'onUpdate' | 'onDelete'
  state: PrismaSchemaState
  onChange: (state: PrismaSchemaState) => void
}

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  value: string
  description?: string
  onUpdate?: string
  onDelete?: string
}

export const SelectItemWithDescription = forwardRef<HTMLDivElement, ItemProps>(
  ({ value, description, onUpdate, onDelete, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Stack spacing={5}>
          <Text size="sm">{value}</Text>
          {description && (
            <Text size="xs" opacity={0.65}>
              {description}
            </Text>
          )}
          {onUpdate && (
            <Stack spacing={0} align="flex-start">
              <Badge color="gray" size="xs" radius="sm" variant="filled">
                On update
              </Badge>
              <Text size="xs" opacity={0.65}>
                {onUpdate}
              </Text>
            </Stack>
          )}
          {onDelete && (
            <Stack spacing={0} align="flex-start">
              <Badge color="gray" size="xs" radius="sm" variant="filled">
                On delete
              </Badge>
              <Text size="xs" opacity={0.65}>
                {onDelete}
              </Text>
            </Stack>
          )}
        </Stack>
      </Group>
    </div>
  )
)

const options: SelectItem[] = [
  {
    label: ReferentialAction.CASCADE,
    value: ReferentialAction.CASCADE,
    onDelete: 'Deleting a referenced record will trigger the deletion of referencing record.',
    onUpdate:
      'Updates the relation scalar fields if the referenced scalar fields of the dependent record are updated.'
  },
  {
    label: ReferentialAction.RESTRICT,
    value: ReferentialAction.RESTRICT,
    onDelete: 'Prevents the deletion if any referencing records exist.',
    onUpdate: 'Prevents the identifier of a referenced record from being changed.'
  },
  {
    label: ReferentialAction.NO_ACTION,
    value: ReferentialAction.NO_ACTION,
    onDelete: 'Deleting a referenced record will trigger the deletion of referencing record.',
    onUpdate:
      'Updates the relation scalar fields if the referenced scalar fields of the dependent record are updated.'
  },
  {
    label: ReferentialAction.SET_NULL,
    value: ReferentialAction.SET_NULL,
    onDelete: 'The scalar field of the referencing object will be set to NULL.',
    onUpdate:
      'When updating the identifier of a referenced object, the scalar fields of the referencing objects will be set to NULL.'
  },
  {
    label: ReferentialAction.SET_DEFAULT,
    value: ReferentialAction.SET_DEFAULT,
    description:
      'The scalar field of the referencing object will be set to the fields default value.'
  }
]

export const ReferentialActionSelect: React.FC<ReferentialActionSelectProps> = ({
  name,
  model,
  variant = 'onDelete',
  state,
  onChange
}) => {
  const field = model?.field(name)

  const attr = (field?.attributes.get('relation') as RelationAttribute) || undefined

  const label = variant === 'onDelete' ? 'On delete' : 'On update'
  const value = variant === 'onDelete' ? attr?.onDelete : attr?.onUpdate

  const handleSelect = async (value: ReferentialActionOption | null) => {
    if (!attr) return

    if (!value) {
      attr.removeArgument(variant)
    } else if (variant === 'onDelete') {
      attr.setOnDelete(value)
    } else {
      attr.setOnUpdate(value)
    }

    const updatedState = await cloneSchemaState(state)
    onChange(updatedState)
  }

  return (
    <Select
      label={label}
      value={value}
      onChange={handleSelect}
      data={options}
      itemComponent={SelectItemWithDescription}
      disabled={!attr}
      clearable
    />
  )
}
