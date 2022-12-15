import { Stack, Text } from '@mantine/core'
import { $schemaDatasourceIds, $schemaGeneratorIds } from '@renderer/modules/editor'
import { useList } from 'effector-react'
import { PrismaDatasourceSettings } from './PrismaDatasourceSettings'
import { PrismaGeneratorSettings } from './PrismaGeneratorSettings'

export const PrismaProjectSettings = () => {
  const datasources = useList($schemaDatasourceIds, (id) => (
    <PrismaDatasourceSettings settingsId={id} />
  ))

  const generators = useList($schemaGeneratorIds, (id) => (
    <PrismaGeneratorSettings settingsId={id} />
  ))

  return (
    <Stack w="45%" h="100%" sx={{ overflow: 'hidden' }}>
      <Text fz="xl" fw="bold">
        Datasource
      </Text>
      {datasources}
      <Text fz="xl" fw="bold">
        Generator
      </Text>
      {generators}
    </Stack>
  )
}
