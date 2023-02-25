import { Box, Center, createStyles, Group, Highlight, UnstyledButton } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons'
import { Command } from 'cmdk'
import { addSpotlightSubActionEvent, toggleOpenSpotlightEvent } from '../stores'
import { SpotlightAction } from '../types'

interface SpotlightItemProps {
  action: SpotlightAction
}

const useStyles = createStyles((theme) => ({
  action: {
    position: 'relative',
    display: 'block',
    width: '100%',
    padding: '10px 12px',
    borderRadius: theme.fn.radius(theme.defaultRadius),
    "&[aria-selected='true']": {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[1]
    }
  },

  actionIcon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6]
  }
}))

export const SpotlightItem: React.FC<SpotlightItemProps> = ({ action }) => {
  const { icon, title, actions, onTrigger } = action

  const { classes } = useStyles()

  const hasSubActions = actions && actions.length > 0

  const handleActionSelect = () => {
    if (hasSubActions) {
      addSpotlightSubActionEvent({ parent: title, actions: [...actions] })
      return
    }

    toggleOpenSpotlightEvent()
    onTrigger?.()
  }

  return (
    <UnstyledButton
      value={title}
      onSelect={handleActionSelect}
      className={classes.action}
      component={Command.Item}
    >
      <Group noWrap>
        {icon && <Center className={classes.actionIcon}>{icon}</Center>}
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore broken flexGrow types */}
        <Box sx={{ flexGrow: '1!important' }}>
          <Highlight highlight="">{title}</Highlight>
        </Box>
        {hasSubActions && (
          <Center className={classes.actionIcon}>
            <IconChevronRight size={18} />
          </Center>
        )}
      </Group>
    </UnstyledButton>
  )
}
