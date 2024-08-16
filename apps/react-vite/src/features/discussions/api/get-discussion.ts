import { useQuery, queryOptions } from '@tanstack/react-query'

import { api } from '@/lib/api-client'
import type { QueryConfig } from '@/lib/react-query'
import type { Discussion } from '@/types/api'

export const getDiscussion = ({
  discussion_id
}: {
  discussion_id: string
}): Promise<{ data: Discussion }> => {
  return api.get(`/discussions/${discussion_id}`)
}

export const getDiscussionQueryOptions = (discussion_id: string) => {
  return queryOptions({
    queryKey: ['discussions', discussion_id],
    queryFn: () => getDiscussion({ discussion_id })
  })
}

type UseDiscussionOptions = {
  discussionId: string
  queryConfig?: QueryConfig<typeof getDiscussionQueryOptions>
}

export const useDiscussion = ({
  discussionId,
  queryConfig
}: UseDiscussionOptions) => {
  return useQuery({
    ...getDiscussionQueryOptions(discussionId),
    ...queryConfig
  })
}
