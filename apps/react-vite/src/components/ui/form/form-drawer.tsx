import { useEffect, type ReactElement, type ReactNode } from 'react'

import { useDisclosure } from '@/hooks/use-disclosure'

import { Button } from '../button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
  DrawerTitle
} from '../drawer'

type FormDrawerProps = {
  isDone: boolean
  triggerButton: ReactElement
  submitButton: ReactElement
  title: string
  children: ReactNode
}

export const FormDrawer = ({
  title,
  children,
  isDone,
  triggerButton,
  submitButton
}: FormDrawerProps) => {
  const { close, open, isOpen } = useDisclosure()

  useEffect(() => {
    if (isDone) {
      close()
    }
  }, [isDone, close])

  return (
    <Drawer
      open={isOpen}
      onOpenChange={isOpen => {
        if (!isOpen) {
          close()
        } else {
          open()
        }
      }}
    >
      <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
      <DrawerContent className="flex max-w-[800px] flex-col justify-between sm:max-w-[540px]">
        <div className="flex flex-col">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          <div>{children}</div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" type="submit">
              Close
            </Button>
          </DrawerClose>
          {submitButton}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
