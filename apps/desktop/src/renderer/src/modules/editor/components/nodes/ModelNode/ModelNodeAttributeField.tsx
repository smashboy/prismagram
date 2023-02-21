import { Text } from '@mantine/core'
import { AttributeBase } from 'prisma-state/_new/attributes'
import { BlockAttributeData } from 'prisma-state/_new/types'

interface ModelNodeAttributeFieldProps {
  attr: BlockAttributeData
}

export const ModelNodeAttributeField: React.FC<ModelNodeAttributeFieldProps> = ({ attr }) => {
  return <Text>{AttributeBase._toString('@@', attr)}</Text>
}
