import { useEffect, useRef } from 'react'
import { useStore } from 'effector-react'
import { TextInput } from '@mantine/core'
import { $schemaState, setPrismaSchemaEvent } from '@renderer/modules/editor/stores'
import { EnumModelField, RelationField, ScalarField } from 'prisma-state/_new/fields'
import { Model } from 'prisma-state/_new/blocks'
import { RelationFieldData } from 'prisma-state/_new/types'
import { RelationAttribute } from 'prisma-state/_new/attributes'

interface FieldNameInputProps {
  model: Model
  field: ScalarField | RelationField | EnumModelField
}

export const FieldNameInput: React.FC<FieldNameInputProps> = ({ model, field }) => {
  const state = useStore($schemaState)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (field.name.length < 2) inputRef.current?.select()
  }, [field.name])

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    if (!newValue) return

    const prevName = field.name

    field.setName(newValue)

    const updatedField = field._data()

    // TODO: move to relation field
    for (const field of model.fields.values()) {
      if ((field as RelationFieldData)?.isRelationField && field.attributes.has('relation')) {
        const relationAttr = new RelationAttribute(field.attributes.get('relation'))

        if (relationAttr.fields.includes(prevName)) {
          relationAttr.setFields([
            ...relationAttr.fields.filter((fieldName) => fieldName !== prevName),
            newValue
          ])
        }
      }
    }

    model.removeField(prevName)
    model.addField(newValue, updatedField)

    setPrismaSchemaEvent(state._clone())
  }

  return <TextInput ref={inputRef} label="Name" value={field.name} onChange={handleInput} />
}
