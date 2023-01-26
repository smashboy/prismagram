import { Handle, Position } from 'reactflow'
import { Box, Card, Table, Text } from '@mantine/core'
import { toggleModelNodeSidebarEvent } from '@renderer/stores/ui/modals'
import { ModelNodeData } from '@shared/common/models/Diagram'
import { selectModelEvent } from '../../stores'
import { useDiagramEditorStore } from '../../stores/context'
import { ModelNodeField } from './ModelNodeField'

interface ModelNodeProps {
  data: ModelNodeData
}

// interface HandlesContainerProps {
//   position: Position
//   children: React.ReactNode
// }

// const HandlesContainer: React.FC<HandlesContainerProps> = ({ position, children }) => (
//   <Stack
//     justify="space-between"
//     sx={{
//       position: 'absolute',
//       top: '50%',
//       height: '50%',
//       transform: 'translateY(-50%)',
//       ...(position === Position.Left ? { left: 0 } : { right: 0 })
//     }}
//   >
//     {children}
//   </Stack>
// )

export const ModelNode: React.FC<ModelNodeProps> = ({ data }) => {
  const { name, fields, sourceHandlers, targetHandlers } = data

  const { selectedModelNode, nodesColors } = useDiagramEditorStore()

  const isSelected = selectedModelNode === name
  const test = !!(selectedModelNode && selectedModelNode !== name)

  const handleSelectModel = () => {
    toggleModelNodeSidebarEvent(true)
    selectModelEvent(name)
  }

  return (
    <Card
      sx={(theme) => ({
        overflow: 'unset',
        borderColor: selectedModelNode ? theme.primaryColor : void 0,
        position: 'relative',
        borderStyle: test ? 'dashed' : 'solid'
      })}
      onClick={handleSelectModel}
      withBorder
      shadow="lg"
    >
      {/* <HandlesContainer position={Position.Left}>
        {targetHandlers.map((relation) => (
          <Box
            key={relation.id}
            sx={{
              position: 'relative',
              width: 10
            }}
          >
            <Handle id={relation.id} type="target" position={Position.Left} isConnectable={false} />
          </Box>
        ))}
      </HandlesContainer> */}
      <Text color={nodesColors[name]}>{name}</Text>
      <Table>
        <tbody>
          {Object.entries(fields).map(([id, field]) => (
            <ModelNodeField
              key={id}
              fieldId={id}
              field={field}
              nodesColors={nodesColors}
              sourceHandlers={sourceHandlers}
              targetHandlers={targetHandlers}
            />
          ))}
        </tbody>
      </Table>
      <Handle
        id={name}
        type="source"
        position={Position.Bottom}
        isConnectable={isSelected}
        style={{
          width: 8,
          height: 8,
          ...(!isSelected && { opacity: 0, pointerEvents: 'none' })
        }}
      />

      <Handle
        id={name}
        type="target"
        position={Position.Left}
        isConnectable={test}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          transform: 'translate(0%, 0%)',
          borderRadius: 0,
          opacity: 0,
          ...(!test && { pointerEvents: 'none' })
          // opacity: 0
        }}
      />

      {/* <HandlesContainer position={Position.Right}>
        {sourceHandlers.map((relation) => (
          <Box
            key={relation.id}
            sx={{
              position: 'relative',
              width: 10
            }}
          >
            <Handle
              id={relation.id}
              type="source"
              position={Position.Right}
              isConnectable={false}
            />
          </Box>
        ))}
      </HandlesContainer> */}
    </Card>
  )
}
