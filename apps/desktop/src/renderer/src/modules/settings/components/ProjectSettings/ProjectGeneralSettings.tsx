import { Stack, TextInput } from '@mantine/core'
import { $selectedProject } from '@renderer/modules/projects'
import { IconFile, IconFolder } from '@tabler/icons'
import { useStore } from 'effector-react'
import { SettingsSection } from '../SettingsSection'
import { SettingsSectionPaper } from '../SettingsSectionPaper'

export const ProjectGeneralSettings = () => {
  const project = useStore($selectedProject)

  if (!project) return null

  const { name, schema, projectDirectory } = project

  return (
    <SettingsSection>
      <SettingsSectionPaper title="Project settings">
        <Stack>
          <TextInput
            label="Project name"
            value={name}
            // onChange={handleProjectNameInput}
            data-autofocus
            withAsterisk
          />
          <TextInput
            label="Schema file"
            value={schema}
            withAsterisk
            icon={<IconFile size={14} />}
            // onClick={handleGetFilePath}
            readOnly
          />
          <TextInput
            label="Project directory"
            value={projectDirectory}
            description="From project directory you will be able to run migrations scripts"
            icon={<IconFolder size={14} />}
            // onClick={handleGetProjectDirectory}
            readOnly
          />
        </Stack>
      </SettingsSectionPaper>
    </SettingsSection>
  )
}
