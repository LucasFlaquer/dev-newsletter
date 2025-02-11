import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode } from 'react'

interface Props {
  isOpen: boolean
  toggleModal: (open:boolean) => void
  children: ReactNode
}

export function NewsletterDialog({ isOpen, toggleModal, children }: Props) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={toggleModal}>
      <Dialog.Trigger asChild>
        <button className="bg-cyan-600 py-3 px-4 rounded mt-4 cursor-pointer">
          Newsletter
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className="h-screen w-screen fixed inset-0 bg-black opacity-50"
        />
        <Dialog.Content
          className="min-w-[480px] bg-gray-600 fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-lg"
        >
          <Dialog.Title className="text-2xl text-gray-200 mb-6">
            Newsletter
          </Dialog.Title>
          <Dialog.Description className="text-gray-200 mb-6">
            Me descreva quais temas do newsletter você deseja receber:
          </Dialog.Description>
          {children}
          <Dialog.Close asChild className="absolute top-4 right-4">
            <button className="text-white" aria-label="Close">
              X
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
