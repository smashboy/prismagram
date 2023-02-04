import { Stack } from '@mantine/core'
import { PaperGlass } from '@renderer/core/components'
import { NodeType } from '@shared/common/configs/diagrams'
import { IconBorderAll, IconLayoutList } from '@tabler/icons'
import { Panel } from 'reactflow'
import { NewNodeCard } from './NewNodeCard'

export const NodesToolbar = () => {
  return (
    <Panel position="top-left">
      <PaperGlass p="md" w={150} h={235}>
        <Stack>
          <NewNodeCard
            title="Model"
            icon={IconBorderAll}
            nodeType={NodeType.NEW_MODEL}
            color="indigo"
          />
          <NewNodeCard
            title="Enum"
            icon={IconLayoutList}
            nodeType={NodeType.NEW_ENUM}
            color="lime"
          />
        </Stack>
      </PaperGlass>
    </Panel>
  )
}
