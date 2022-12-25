import { useState } from 'react'
import { combine } from 'effector'
import { useStore } from 'effector-react'
import { Button, Group, LoadingOverlay, Stack, TextInput } from '@mantine/core'
import {
  $isUpdatingProject,
  $selectedProject,
  ProjectFormBase,
  ProjectFormBaseValues,
  updateProjectEffect
} from '@renderer/modules/projects'
import { DEFAULT_PRISMA_STUDIO_PORT } from '@shared/common/configs/prisma'
import { SettingsSection } from '../SettingsSection'
import { SettingsSectionPaper } from '../SettingsSectionPaper'

const $store = combine({
  project: $selectedProject,
  isLoading: $isUpdatingProject
})

export const ProjectGeneralSettings = () => {
  const { project, isLoading } = useStore($store)

  const { name, schema, projectDirectory, prismaStudioPort } = project!

  const [settings, setSettings] = useState({
    name,
    schema,
    projectDirectory: projectDirectory ?? '',
    prismaStudioPort: prismaStudioPort ?? DEFAULT_PRISMA_STUDIO_PORT
  })

  const handleBaseFormChange = (values: ProjectFormBaseValues) =>
    setSettings({ ...settings, ...values })

  const handlePortInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      prismaStudioPort: parseInt(event.target.value, 10)
    })
  }

  const handlePortInputBlur = () => {
    const { prismaStudioPort } = settings

    if (!prismaStudioPort)
      setSettings({
        ...settings,
        prismaStudioPort: DEFAULT_PRISMA_STUDIO_PORT
      })
  }

  const handleSaveProject = () => {
    const { name, schema, projectDirectory, prismaStudioPort } = settings

    return updateProjectEffect({
      ...project!,
      name,
      schema,
      projectDirectory: projectDirectory ?? void 0,
      prismaStudioPort:
        !prismaStudioPort || prismaStudioPort === DEFAULT_PRISMA_STUDIO_PORT
          ? DEFAULT_PRISMA_STUDIO_PORT
          : prismaStudioPort
    })
  }

  const disableSaveButton = !settings.name || !settings.schema

  return (
    <SettingsSection>
      <SettingsSectionPaper title="Project settings">
        <Stack pos="relative">
          <LoadingOverlay visible={isLoading} />
          <ProjectFormBase values={settings} onChange={handleBaseFormChange} />
          <TextInput
            label="Prisma studio port"
            description="What port should prisma studio run on. The default port is 5555."
            type="number"
            value={settings.prismaStudioPort}
            onChange={handlePortInput}
            onBlur={handlePortInputBlur}
            min={0}
            step={1}
            // onClick={handleGetProjectDirectory}
          />
          <Group position="right">
            <Button variant="filled" onClick={handleSaveProject} disabled={disableSaveButton}>
              Save
            </Button>
          </Group>
        </Stack>
      </SettingsSectionPaper>
    </SettingsSection>
  )
}
