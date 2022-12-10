import { Group, Paper, Stack } from '@mantine/core'
import { useStore } from 'effector-react'
import 'reactflow/dist/style.css'
import { Editor, EditorToolbar, Sidebar } from './modules/editor'
import { RightSidebar } from './modules/editor/components/RightSidebar'
import { CreateProjectModal, ProjectSelectorModal } from './modules/projects'
import { $isOpenRightSidebarModeNodel } from './stores/ui/modals'
import './transports'

function App() {
  const { isOpen, isOpenDebounced } = useStore($isOpenRightSidebarModeNodel)

  const isRighSidebarOpen = isOpen || isOpenDebounced

  return (
    <>
      <Group w="100%" h="100%" p="xs" noWrap>
        <Sidebar />
        <Stack w="100%" h="100%" sx={{ flex: 1 }}>
          <EditorToolbar />
          <Paper
            w={isRighSidebarOpen ? 'calc(100vw - 690px)' : 'calc(100vw - 330px)'}
            h="100%"
            shadow="md"
            sx={{ transition: 'width 400ms ease' }}
          >
            <Editor />
          </Paper>
        </Stack>
        <RightSidebar />
        <CreateProjectModal />
        <ProjectSelectorModal />
      </Group>
    </>
  )
}

export default App
