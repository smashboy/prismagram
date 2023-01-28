import { useEffect, useRef } from 'react'
import { Accordion, MultiSelect, Table, Text, TextInput } from '@mantine/core'
import { Attribute, AttributeFunction } from 'prisma-state/attributes'
import { string2Color } from '@renderer/core/utils'

interface AttributesSettingsProps {
  attribute: Attribute<string, string>
  isBlock?: boolean
}

export const AttributeSettings: React.FC<AttributesSettingsProps> = ({
  attribute: { displayAttributeType, type, arguments: args },
  isBlock = false
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
    <Accordion.Item
      value={type}
      sx={
        isBlock
          ? (theme) => ({
              boxShadow: theme.shadows.sm,
              ['&:not(:first-child)']: {
                marginTop: theme.spacing.xs
              },
              ['&:last-child']: {
                marginBottom: theme.spacing.xl
              }
            })
          : void 0
      }
    >
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
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    <MultiSelect value={value} data={value} searchable readOnly />
                  ) : value instanceof AttributeFunction ? (
                    <TextInput value={value.displayType} readOnly />
                  ) : (
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
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
