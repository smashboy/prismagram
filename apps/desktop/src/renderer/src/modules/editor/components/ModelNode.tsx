import { Box, Card, Group, Stack, Table, Text } from '@mantine/core'
import { string2Color } from '@renderer/core/utils'
import { RelationIOType } from '@shared/common/configs/diagrams'
import { ModelNodeData } from '@shared/common/models/Diagram'
import { Handle, Position } from 'reactflow'
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
  const { name, fields, relations } = data

  const source = relations.filter((relation) => relation.type === RelationIOType.SOURCE)
  const target = relations.filter((relation) => relation.type === RelationIOType.TARGET)

  return (
    <Card sx={{ overflow: 'unset' }} withBorder>
      <HandlesContainer position={Position.Left}>
        {target.map((relation) => (
          <Box
            key={relation.id}
            sx={{
              position: 'relative',
              width: 10
            }}
          >
            <Handle
              id={relation.id}
              type={relation.type}
              position={Position.Left}
              isConnectable={false}
            />
          </Box>
        ))}
      </HandlesContainer>
      <Text color={string2Color(name)}>{name}</Text>
      <Table>
        <tbody>
          {Object.entries(fields).map(([id, field]) => (
            <ModelNodeField key={id} fieldId={id} field={field} />
          ))}
        </tbody>
      </Table>
      <HandlesContainer position={Position.Right}>
        {source.map((relation) => (
          <Box
            key={relation.id}
            sx={{
              position: 'relative',

              width: 10
            }}
          >
            <Handle
              id={relation.id}
              type={relation.type}
              position={Position.Right}
              isConnectable={false}
            />
          </Box>
        ))}
      </HandlesContainer>
    </Card>
  )
}
