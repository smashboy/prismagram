import { useState } from 'react'
import { combine } from 'effector'
import { useStore } from 'effector-react'
import { Button, Group, LoadingOverlay, Stack } from '@mantine/core'
import {
  $isUpdatingProject,
  $selectedProject,
  ProjectFormBase,
  ProjectFormBaseValues,
  updateProjectEffect
} from '@renderer/modules/projects'
import { SettingsSectionPaper } from '../SettingsSectionPaper'
import { $schemaPath } from '../../stores'

const $store = combine({
  project: $selectedProject,
  isLoading: $isUpdatingProject,
  schemaPath: $schemaPath
})

export const ProjectGeneralSettings = () => {
  const { project, isLoading, schemaPath } = useStore($store)

  const { name, projectDirectory } = project!

  const [settings, setSettings] = useState({
    name,
    schemaPath,
    projectDirectory: projectDirectory ?? ''
    // prismaStudioPort: prismaStudioPort ?? DEFAULT_PRISMA_STUDIO_PORT
  })

  const handleBaseFormChange = (values: ProjectFormBaseValues) =>
    setSettings({ ...settings, ...values })

  // const handlePortInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSettings({
  //     ...settings,
  //     prismaStudioPort: parseInt(event.target.value, 10)
  //   })
  // }

  // const handlePortInputBlur = () => {
  //   const { prismaStudioPort } = settings

  //   if (!prismaStudioPort)
  //     setSettings({
  //       ...settings,
  //       prismaStudioPort: DEFAULT_PRISMA_STUDIO_PORT
  //     })
  // }

  const handleSaveProject = () => {
    const { name, projectDirectory } = settings

    return updateProjectEffect({
      ...project!,
      name,
      projectDirectory: projectDirectory ?? void 0
      // prismaStudioPort:
      //   !prismaStudioPort || prismaStudioPort === DEFAULT_PRISMA_STUDIO_PORT
      //     ? void 0
      //     : prismaStudioPort
    })
  }

  const disableSaveButton = !settings.name || !settings.schemaPath

  return (
    <SettingsSectionPaper title="Project settings">
      <Stack pos="relative">
        <LoadingOverlay visible={isLoading} />
        <ProjectFormBase values={settings} onChange={handleBaseFormChange} />
        {/* <TextInput
          label="Prisma studio port"
          description="What port should prisma studio run on. The default port is 5555."
          type="number"
          value={settings.prismaStudioPort}
          onChange={handlePortInput}
          onBlur={handlePortInputBlur}
          min={0}
          step={1}
        /> */}
        <Group position="right">
          <Button variant="filled" onClick={handleSaveProject} disabled={disableSaveButton}>
            Save
          </Button>
        </Group>
      </Stack>
    </SettingsSectionPaper>
  )
}
