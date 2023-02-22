import { forwardRef } from 'react'
import { Badge, Select, SelectItem, Stack, Group, Text } from '@mantine/core'
import { ReferentialAction, ReferentialActionOption } from 'prisma-state/constants'

interface ReferentialActionSelectProps {
  label: string
  value: ReferentialActionOption | null
  onChange: (state: ReferentialActionOption | null) => void
  disabled?: boolean
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
  label,
  value,
  disabled = false,
  onChange
}) => {
  const handleSelect = (value: ReferentialActionOption | null) => onChange(value)

  return (
    <Select
      label={label}
      value={value}
      onChange={handleSelect}
      data={options}
      itemComponent={SelectItemWithDescription}
      disabled={disabled}
      clearable
    />
  )
}
