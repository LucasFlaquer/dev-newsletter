import { useCallback, useEffect, useState, useRef } from 'react'
import { api } from '../lib/api'
import { authenticate } from '../lib/authenticate'

interface Props {
  taskId: string
  timeout?: number
}

export function useTask({ taskId, timeout = 800 }: Props) {
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const isCompleted = useRef(false)

  const taskPulling = useCallback(async (accesToken: string) => {
    if (!taskId || isCompleted.current) return

    try {
      const { data } = await api.get(`/tasks/${taskId}`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${accesToken}`,
        },
      })

      if (data.status === 'SUCCESS') {
        isCompleted.current = true // Stop further requests
        setIsLoading(false)
        setContent(data.result.content)
      }
    } catch (error) {
      console.error('Error fetching task:', error)
      setIsLoading(false)
    }
  }, [taskId])

  useEffect(() => {
    if (!taskId) return
    setIsLoading(true)
    authenticate().then((accessToken: string) => {
      const interval = setInterval(() => {
        if (!isCompleted.current) {
          taskPulling(accessToken)
        } else {
          clearInterval(interval) // Stop polling once completed
        }
      }, timeout)

      return () => clearInterval(interval)
    })
  }, [taskId, timeout, taskPulling])

  return {
    content,
    isLoading,
  }
}
