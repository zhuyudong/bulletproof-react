import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query'

import { api } from '@/lib/api-client'
import type { QueryConfig } from '@/lib/react-query'
import type { Comment, Meta } from '@/types/api'

export const getComments = ({
  discussionId,
  page = 1
}: {
  discussionId: string
  page?: number
}): Promise<{ data: Comment[]; meta: Meta }> => {
  return api.get(`/comments`, {
    params: {
      discussion_id: discussionId,
      page
    }
  })
}

export const getInfiniteCommentsQueryOptions = (discussionId: string) => {
  return infiniteQueryOptions({
    queryKey: ['comments', discussionId],
    queryFn: ({ pageParam = 1 }) => {
      return getComments({ discussionId, page: pageParam as number })
    },
    getNextPageParam: lastPage => {
      if (lastPage?.meta?.page === lastPage?.meta?.total_pages) return undefined
      const nextPage = lastPage.meta.page + 1
      return nextPage
    },
    initialPageParam: 1
  })
}

type UseCommentsOptions = {
  discussionId: string
  page?: number
  queryConfig?: QueryConfig<typeof getComments>
}

export const useInfiniteComments = ({ discussionId }: UseCommentsOptions) => {
  return useInfiniteQuery({
    ...getInfiniteCommentsQueryOptions(discussionId)
  })
}
