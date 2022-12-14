import { Group, Paper, Stack } from '@mantine/core'
import { Editor, EditorToolbar, Sidebar } from './modules/editor'
import { CreateProjectModal, ProjectSelectorModal } from './modules/projects'
import { SettingsModal } from './modules/settings'
import 'reactflow/dist/style.css'
import './transports'

function App() {
  return (
    <>
      <Group w="100%" h="100%" p="xs" noWrap>
        <Sidebar />
        <Stack w="100%" h="100%" sx={{ flex: 1 }}>
          <EditorToolbar />
          <Paper
            // w={isRighSidebarOpen ? 'calc(100vw - 690px)' : 'calc(100vw - 330px)'}
            w="100%"
            h="100%"
            shadow="md"
            sx={{ transition: 'width 400ms ease' }}
          >
            <Editor />
          </Paper>
        </Stack>
        <SettingsModal />
        <CreateProjectModal />
        <ProjectSelectorModal />
      </Group>
    </>
  )
}

export default App
