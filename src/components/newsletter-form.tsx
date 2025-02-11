import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface Props {
  onSubmit: (data: { topics: string })=> void
}

const schema = z.object({
  topics: z.string(),
})

type FormValues = z.infer<typeof schema>

export function NewsletterForm({ onSubmit }: Props) {
  const { register, handleSubmit } =
    useForm<FormValues>({
      resolver: zodResolver(schema),
      defaultValues: {
        topics: 'Livros, inteligência artificial',
      },
    })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label className="block text-gray-200 mb-2" htmlFor="temas">
          Me descreva quais temas do newsletter você deseja receber:
        </label>
        <input
          {...register('topics')}
          className="w-full p-2 rounded bg-gray-500 text-gray-200 placeholder-gray-400"
          type="text" id="temas"

        />
      </div>
      <button
        type="submit"
        className="bg-cyan-600 py-3 px-4 rounded mt-4 text-white"
      >
        buscar
      </button>
    </form>
  )
}
