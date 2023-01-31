import { forwardRef } from 'react'
import { Group, Text } from '@mantine/core'

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  value: string
  description: string
}

export const SelectItemWithDescription = forwardRef<HTMLDivElement, ItemProps>(
  ({ value, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <div>
          <Text size="sm">{value}</Text>
          <Text size="xs" color="dimmed">
            {description}
          </Text>
        </div>
      </Group>
    </div>
  )
)
