import { HttpResponse, http } from 'msw'

import { env } from '@/config/env'

import { db, persistDb } from '../db'
import { networkDelay, requireAuth, sanitizeUser } from '../utils'

type CreateCommentBody = {
  body: string
  discussion_id: string
}

export const commentsHandlers = [
  http.get(`${env.API_URL}/comments`, async ({ request, cookies }) => {
    await networkDelay()

    try {
      const { error } = requireAuth(cookies)
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 })
      }
      const url = new URL(request.url)
      const discussion_id = url.searchParams.get('discussion_id') || ''
      const page = Number(url.searchParams.get('page') || 1)

      const total = db.comment.count({
        where: {
          discussion_id: {
            equals: discussion_id
          }
        }
      })

      const totalPages = Math.ceil(total / 10)

      const comments = db.comment
        .findMany({
          where: {
            discussion_id: {
              equals: discussion_id
            }
          },
          take: 10,
          skip: 10 * (page - 1)
        })
        .map(({ author_id, ...comment }) => {
          const author = db.user.findFirst({
            where: {
              id: {
                equals: author_id
              }
            }
          })
          return {
            ...comment,
            author: author ? sanitizeUser(author) : {}
          }
        })
      return HttpResponse.json({
        data: comments,
        meta: {
          page,
          total,
          total_pages: totalPages
        }
      })
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 }
      )
    }
  }),

  http.post(`${env.API_URL}/comments`, async ({ request, cookies }) => {
    await networkDelay()

    try {
      const { user, error } = requireAuth(cookies)
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 })
      }
      const data = (await request.json()) as CreateCommentBody
      const result = db.comment.create({
        author_id: user?.id,
        ...data
      })
      await persistDb('comment')
      return HttpResponse.json(result)
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 }
      )
    }
  }),

  http.delete(
    `${env.API_URL}/comments/:commentId`,
    async ({ params, cookies }) => {
      await networkDelay()

      try {
        const { user, error } = requireAuth(cookies)
        if (error) {
          return HttpResponse.json({ message: error }, { status: 401 })
        }
        const commentId = params.commentId as string
        const result = db.comment.delete({
          where: {
            id: {
              equals: commentId
            },
            ...(user?.role === 'USER' && {
              author_id: {
                equals: user.id
              }
            })
          }
        })
        await persistDb('comment')
        return HttpResponse.json(result)
      } catch (error: any) {
        return HttpResponse.json(
          { message: error?.message || 'Server Error' },
          { status: 500 }
        )
      }
    }
  )
]
