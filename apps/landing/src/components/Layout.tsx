import { ScrollArea } from '@mantine/core'
import { Navbar } from './Navbar'

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      <ScrollArea type="auto" h="100vh">
        {children}
      </ScrollArea>
    </>
  )
}
