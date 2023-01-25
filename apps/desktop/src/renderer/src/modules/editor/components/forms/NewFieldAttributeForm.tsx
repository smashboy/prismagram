import { useState } from 'react'
import { Button, Transition } from '@mantine/core'
import { IconPlus } from '@tabler/icons'

export const NewFieldAttributeForm = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Transition mounted={!isOpen} transition="fade">
        {(style) => (
          <Button
            variant="subtle"
            style={style}
            onClick={() => setIsOpen(true)}
            rightIcon={<IconPlus size={16} />}
          >
            New attribute
          </Button>
        )}
      </Transition>
    </>
  )
}
