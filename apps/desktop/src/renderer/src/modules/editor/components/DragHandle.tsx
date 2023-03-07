import { forwardRef } from 'react'
import { ActionIcon, ActionIconProps } from '@mantine/core'
import { IconGripVertical } from '@tabler/icons'

// TODO: override global cursor
export const DragHandle = forwardRef<HTMLButtonElement, ActionIconProps>(({ sx, ...props }) => (
  <ActionIcon
    {...props}
    sx={{
      ...sx,
      cursor: 'grab',
      ':active': {
        cursor: 'grabbing'
      }
    }}
  >
    <IconGripVertical />
  </ActionIcon>
))
