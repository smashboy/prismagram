import { combine } from 'effector'
import { useStore } from 'effector-react'
import { Modal } from '@mantine/core'
import { useHotkeys } from '@mantine/hooks'
import { SpotlightMainActions } from './components/SpotlightMainActions'
import { SpotlightNavigationBar } from './components/SpotlightNavigationBar'
import {
  $isOpenSpotlight,
  $spotlightSubActions,
  removeLastSpotlightSubActionEvent,
  toggleOpenSpotlightEvent
} from './stores'
import { SpotlightItem } from './components/SpotlightItem'
import { SpotlightContainer } from './components/SpotlightContainer'
import { $projects } from '../projects'
import { SpotlightGroup } from './components/SpotlightGroup'

const $store = combine({
  isOpen: $isOpenSpotlight,
  subActions: $spotlightSubActions,
  projects: $projects
})

export const Spotlight = () => {
  const { isOpen, subActions } = useStore($store)

  const activeSubAction = subActions[subActions.length - 1]

  const handleRemoveLastSpotlightSubAction = () => {
    if (isOpen && activeSubAction) {
      removeLastSpotlightSubActionEvent()
    }
  }

  useHotkeys([[`Backspace`, handleRemoveLastSpotlightSubAction]])

  const handleToggleOpenSpotlight = () => toggleOpenSpotlightEvent(false)

  return (
    <Modal
      opened={isOpen}
      onClose={handleToggleOpenSpotlight}
      withCloseButton={false}
      size="lg"
      sx={{
        '& .mantine-Modal-modal': {
          padding: 0,

          position: 'relative'
        }
      }}
    >
      <SpotlightNavigationBar />
      <SpotlightContainer>
        {activeSubAction ? (
          <SpotlightGroup label="">
            {activeSubAction.actions.map((action) => (
              <SpotlightItem key={action.title} action={action} />
            ))}
          </SpotlightGroup>
        ) : (
          <SpotlightMainActions />
        )}
      </SpotlightContainer>
    </Modal>
  )
}
