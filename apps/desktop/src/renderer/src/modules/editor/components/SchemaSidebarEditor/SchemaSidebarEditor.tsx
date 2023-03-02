import { Panel } from 'reactflow'
import { useStore } from 'effector-react'
import { createStyles, Divider, Group } from '@mantine/core'
import { PaperGlass } from '@renderer/core/components'
import { SchemaBlocksNavigation } from './SchemaBlocksNavigation'
import { $selectedNodeId } from '../../stores'
import { SchemaSidebarMainCotainer } from './SchemaSidebarMainCotainer'

const useStyles = createStyles(() => ({
  root: {
    top: '50%!important',
    transform: 'translateY(-50%)',
    height: '85vh',
    width: '40%',
    pointerEvents: 'none'
  }
}))

export const SchemaSidebarEditor = () => {
  const selectedNodeId = useStore($selectedNodeId)

  const { classes } = useStyles()

  if (!selectedNodeId) return null

  return (
    <Panel position="top-right" className={classes.root}>
      <PaperGlass w="100%" h="100%" py="md" pr="md" pl="xs">
        <Group h="100%" spacing={0} noWrap>
          <SchemaBlocksNavigation />
          <Divider orientation="vertical" />
          <SchemaSidebarMainCotainer />
        </Group>
      </PaperGlass>
    </Panel>
  )
}
