import { Card, Table, Text } from '@mantine/core'
import { ModelNodeData } from '@shared/common/models/Diagram'
import { ModelNodeField } from './ModelNodeField'

interface ModelNodeProps {
  data: ModelNodeData
}

export const ModelNode: React.FC<ModelNodeProps> = ({ data }) => {
  const { name, fields } = data

  return (
    <Card withBorder>
      <Text>{name}</Text>
      <Table>
        <tbody>
          {Object.entries(fields).map(([id, field]) => (
            <ModelNodeField key={id} fieldId={id} field={field} />
          ))}
        </tbody>
      </Table>
    </Card>
  )
}
