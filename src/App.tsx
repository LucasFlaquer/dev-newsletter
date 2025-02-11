import { useEffect, useRef, useState } from 'react'
import Markdown from 'react-markdown'
import { api } from './lib/api'
import { useTask } from './hooks/use-task'
import { NewsletterDialog } from './components/newsletter-dialog'
import { NewsletterForm } from './components/newsletter-form'
import { LoadingOverlay } from './components/loading-overlay'
import { authenticate } from './lib/authenticate'

interface FormValues {
  topics: string
}

export function App() {
  const [taskId, setTaskId] = useState('')
  const { content, isLoading } = useTask({ taskId })
  const [isModalOpen, setIsModalOpen] = useState(false)

  async function handleSubmit({ topics }: FormValues) {
    const formData = new FormData()
    formData.append('topics', topics)
    const accesToken = await authenticate()
    const { data } = await api.post('/generate-newsletter', formData, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${accesToken}`,
      },
    })
    setIsModalOpen(false)
    setTaskId(data.task_id)
  }

  return (
    <LoadingOverlay isLoading={isLoading}>
      <div>
        <main className="bg-gray-700 h-screen">
          <div className="flex h-full items-center justify-between max-w-[1180px] w-full mx-auto px-6">
            <div className="text-white">
              <span className="text-cyan-600 font-stretch-90%">
                <small>Newsletter exclusiva</small>
              </span>
              <h2 className="text-6xl ">Work inspiration</h2>
              <NewsletterDialog isOpen={isModalOpen} toggleModal={setIsModalOpen}>
                <NewsletterForm onSubmit={handleSubmit} />
              </NewsletterDialog>
            </div>

            <div className="text-white">
              <div className="max-w-[700px] h-[600px] overflow-y-auto  mx-auto">
                <Markdown className="markdonw-content">{content}</Markdown>
              </div>
            </div>

          </div>
        </main>
      </div>
    </LoadingOverlay>
  )
}
