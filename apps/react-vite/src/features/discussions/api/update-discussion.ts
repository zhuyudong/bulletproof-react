import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { api } from '@/lib/api-client'
import type { MutationConfig } from '@/lib/react-query'
import type { Discussion } from '@/types/api'

import { getDiscussionQueryOptions } from './get-discussion'

export const updateDiscussionInputSchema = z.object({
  title: z.string().min(1, 'Required'),
  body: z.string().min(1, 'Required')
})

export type UpdateDiscussionInput = z.infer<typeof updateDiscussionInputSchema>

export const updateDiscussion = ({
  data,
  discussion_id
}: {
  data: UpdateDiscussionInput
  discussion_id: string
}): Promise<Discussion> => {
  return api.patch(`/discussions/${discussion_id}`, data)
}

type UseUpdateDiscussionOptions = {
  mutationConfig?: MutationConfig<typeof updateDiscussion>
}

export const useUpdateDiscussion = ({
  mutationConfig
}: UseUpdateDiscussionOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getDiscussionQueryOptions(data.id).queryKey
      })
      onSuccess?.(data, ...args)
    },
    ...restConfig,
    mutationFn: updateDiscussion
  })
}
