import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/api-client'
import type { MutationConfig } from '@/lib/react-query'

import { getDiscussionsQueryOptions } from './get-discussions'

export const deleteDiscussion = ({
  discussion_id
}: {
  discussion_id: string
}) => {
  return api.delete(`/discussions/${discussion_id}`)
}

type UseDeleteDiscussionOptions = {
  mutationConfig?: MutationConfig<typeof deleteDiscussion>
}

export const useDeleteDiscussion = ({
  mutationConfig
}: UseDeleteDiscussionOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getDiscussionsQueryOptions().queryKey
      })
      onSuccess?.(...args)
    },
    ...restConfig,
    mutationFn: deleteDiscussion
  })
}
