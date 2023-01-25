import { Accordion } from '@mantine/core'
import { FieldAttribute } from 'prisma-state/attributes'
import { AttributeSettings } from './AttributeSettings'

interface FieldAttributesSettingsProps {
  attributes: FieldAttribute[]
}

export const FieldAttributesSettings: React.FC<FieldAttributesSettingsProps> = ({ attributes }) => {
  return (
    <>
      {attributes.length > 0 && (
        <Accordion>
          {[...attributes.entries()].map(([id, attr]) => (
            <AttributeSettings key={id} attribute={attr} />
          ))}
        </Accordion>
      )}
    </>
  )
}
