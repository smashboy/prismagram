import { useEffect, useRef } from 'react'
import { Accordion, MultiSelect, Table, Text, TextInput } from '@mantine/core'
import { FieldAttribute } from '@renderer/core/prisma/attributes/FieldAttribute'
import { string2Color } from '@renderer/core/utils'
import { AttributeFunction } from '@renderer/core/prisma/attributes/AttributeFunction'

interface AttributesSettingsProps {
  attribute: FieldAttribute
}

export const AttributeSettings: React.FC<AttributesSettingsProps> = ({
  attribute: { displayAttributeType, type, arguments: args }
}) => {
  const controlRef = useRef<HTMLButtonElement>(null)

  const argsList = [...args.entries()]

  const hasArguments = argsList.length > 0

  useEffect(() => {
    if (hasArguments) {
      controlRef.current!.style.pointerEvents = 'auto'
    } else {
      controlRef.current!.style.pointerEvents = 'none'
    }
  }, [hasArguments])

  return (
    <Accordion.Item value={type}>
      <Accordion.Control
        ref={controlRef}
        sx={{
          ['.mantine-Accordion-chevron']: {
            minWidth: hasArguments ? void 0 : 0,
            width: hasArguments ? void 0 : 0
          }
        }}
        chevron={hasArguments ? void 0 : <div />}
      >
        <Text sx={{ color: string2Color(displayAttributeType), userSelect: 'none' }}>
          {displayAttributeType}
        </Text>
      </Accordion.Control>
      <Accordion.Panel>
        <Table
          sx={(theme) => ({
            '& td': {
              padding: `${theme.spacing.xs}px 0!important`
            }
          })}
        >
          <tbody>
            {argsList.map(([id, value]) => (
              <tr key={id}>
                <td>{id}</td>
                <td>
                  {value instanceof Array ? (
                    <MultiSelect value={value} data={value} searchable readOnly />
                  ) : value instanceof AttributeFunction ? (
                    <TextInput value={value.displayType} readOnly />
                  ) : (
                    <TextInput value={value} readOnly />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Accordion.Panel>
    </Accordion.Item>
  )
}
