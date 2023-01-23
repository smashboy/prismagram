import { useStore, useStoreMap } from 'effector-react'
import { Select, Stack } from '@mantine/core'
import {
  prismaDatasourceProvidersArray,
  prismaRelationModesList
} from '@shared/common/configs/prisma'
import { SettingsSectionPaper } from '../../SettingsSectionPaper'
import { EnvInput } from '../../EnvInput'
import { $schemaDatasources, $schemaState, setPrismaSchemaEvent } from '@renderer/modules/editor'
import { OptionField, EnvField } from 'prisma-state/fields'
import {
  PrismaDatasourceProviderType,
  PrismaDatasourceRelationModeType
} from 'prisma-state/constants'

interface PrismaDatasourceSettingsProps {
  settingsId: string
}

export const PrismaDatasourceSettings: React.FC<PrismaDatasourceSettingsProps> = ({
  settingsId
}) => {
  const state = useStore($schemaState)

  const datasource = useStoreMap({
    store: $schemaDatasources,
    keys: [settingsId],
    fn: (datasources, [id]) => datasources.get(id)!
  })

  const provider = datasource.field<OptionField>('provider')
  const url = datasource.field<EnvField>('url')
  const shadowDatabaseUrl = datasource.field<EnvField>('shadowDatabaseUrl')
  const relationMode = datasource.field<OptionField>('relationMode')

  const envFields = {
    url,
    shadowDatabaseUrl
  }

  const optionFields = {
    provider,
    relationMode
  }

  const handleSelectInputChange =
    (input: 'provider' | 'relationMode') => (value: string | null) => {
      const optionField = optionFields[input]

      if (!value) {
        datasource.removeField(input)
      } else if (value && optionField) {
        optionField.setValue(value)
      } else if (input === 'provider') {
        datasource.addProvider(value as PrismaDatasourceProviderType)
      } else if (input === 'relationMode') {
        datasource.addRelationMode(value as PrismaDatasourceRelationModeType)
      }

      setPrismaSchemaEvent(state.toString())
    }

  const handleEnvFlagChange = (input: 'url' | 'shadowDatabaseUrl') => (flag: boolean) => {
    const envField = envFields[input]
    if (envField) {
      envField.toggleIsEnv(flag)
      setPrismaSchemaEvent(state.toString())
    }
  }

  const handleEnvInputChange =
    (input: 'url' | 'shadowDatabaseUrl') => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      const envField = envFields[input]

      if (!value) {
        datasource.removeField(input)
      } else if (envField) {
        envField.setValue(event.target.value)
      } else if (input === 'shadowDatabaseUrl') {
        datasource.addShadowDatabaseUrl(value)
      } else if (input === 'url') {
        datasource.addUrl(value)
      }

      setPrismaSchemaEvent(state.toString())
    }

  return (
    <SettingsSectionPaper title="Datasource">
      <Stack>
        {/* <Text>{settingsId}</Text> */}
        <Select
          label="Provider"
          description="Describes which data source connectors to use."
          value={provider?.value ?? ''}
          onChange={handleSelectInputChange('provider')}
          data={prismaDatasourceProvidersArray}
          searchable
          required
        />
        <EnvInput
          label="Url"
          description="Connection URL including authentication info."
          field={url}
          onChange={handleEnvInputChange('url')}
          onEnvChange={handleEnvFlagChange('url')}
          required
        />
        <EnvInput
          label="Shadow database url"
          description="Connection URL to the shadow database used by Prisma Migrate. Allows you to use a cloud-hosted database as the shadow database."
          field={shadowDatabaseUrl}
          onChange={handleEnvInputChange('shadowDatabaseUrl')}
          onEnvChange={handleEnvFlagChange('shadowDatabaseUrl')}
        />
        <Select
          label="Relation mode"
          description="Sets whether referential integrity is enforced by foreign keys in the database or emulated in the Prisma Client."
          value={relationMode?.value ?? ''}
          onChange={handleSelectInputChange('relationMode')}
          data={prismaRelationModesList as unknown as string[]}
          searchable
          clearable
        />
      </Stack>
    </SettingsSectionPaper>
  )
}
