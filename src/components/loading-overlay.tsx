import { ReactNode } from 'react'

interface Props {
  isLoading: boolean
  children: ReactNode
}

export function LoadingOverlay({ isLoading, children }: Props) {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white border-opacity-80" />
        </div>
      )}
    </div>
  )
}
