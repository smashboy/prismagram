import { ScrollArea } from '@mantine/core'
import { Navbar } from './Navbar'

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      <ScrollArea w="100%" h="100%">
        {children}
      </ScrollArea>
    </>
  )
}
