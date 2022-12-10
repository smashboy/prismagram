import { Box, Card, Stack, Table, Text } from '@mantine/core'
import { ModelNodeData } from '@shared/common/models/Diagram'
import { Handle, Position } from 'reactflow'
import { useDiagramEditorStore } from '../stores/context'
import { ModelNodeField } from './ModelNodeField'

interface ModelNodeProps {
  data: ModelNodeData
}

interface HandlesContainerProps {
  position: Position
  children: React.ReactNode
}

const HandlesContainer: React.FC<HandlesContainerProps> = ({ position, children }) => (
  <Stack
    justify="space-between"
    sx={{
      position: 'absolute',
      top: '50%',
      height: '50%',
      transform: 'translateY(-50%)',
      ...(position === Position.Left ? { left: 0 } : { right: 0 })
    }}
  >
    {children}
  </Stack>
)

export const ModelNode: React.FC<ModelNodeProps> = ({ data }) => {
  const { name, fields, sourceRelations, targetRelations } = data

  const { selectedModelNode, nodesColors } = useDiagramEditorStore()

  return (
    <Card
      sx={(theme) => ({
        overflow: 'unset',
        borderColor: selectedModelNode === name ? theme.primaryColor : void 0
      })}
      withBorder
      shadow="lg"
    >
      <HandlesContainer position={Position.Left}>
        {targetRelations.map((relation) => (
          <Box
            key={relation}
            sx={{
              position: 'relative',
              width: 10
            }}
          >
            <Handle id={relation} type="target" position={Position.Left} isConnectable={false} />
          </Box>
        ))}
      </HandlesContainer>
      <Text color={nodesColors[name]}>{name}</Text>
      <Table>
        <tbody>
          {Object.entries(fields).map(([id, field]) => (
            <ModelNodeField key={id} fieldId={id} field={field} nodesColors={nodesColors} />
          ))}
        </tbody>
      </Table>
      <HandlesContainer position={Position.Right}>
        {sourceRelations.map((relation) => (
          <Box
            key={relation}
            sx={{
              position: 'relative',
              width: 10
            }}
          >
            <Handle id={relation} type="source" position={Position.Right} isConnectable={false} />
          </Box>
        ))}
      </HandlesContainer>
    </Card>
  )
}
