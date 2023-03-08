import { Background } from 'reactflow'
import { NodesToolbar } from './NodesToolbar'
import { EditorToolbar } from './EditorToolbar'
import { CreateRelationModal } from './CreateRelationModal'
import { CreateEnumFieldModal } from './CreateEnumFieldModal'
import { SchemaSidebarEditor } from './SchemaSidebarEditor'
import { DiagramEditorProvider } from './DiagramEditorProvider'
import '../css/editor.css'

export const DiagramEditor = () => {
  return (
    <>
      <DiagramEditorProvider>
        <Background />
        <EditorToolbar />
        <NodesToolbar />
        <SchemaSidebarEditor />
      </DiagramEditorProvider>
      <CreateEnumFieldModal />
      <CreateRelationModal />
    </>
  )
}
