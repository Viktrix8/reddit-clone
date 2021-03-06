import { useMutation, useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Timeago from 'react-timeago'
import Avatar from '../../components/Avatar'

import Post from '../../components/Post'
import { ADD_COMMENT } from '../../graphql/mutations'
import { Comment, Post as DbPost } from '../../typings'
import { GET_POST_BY_POST_ID } from '../../graphql/queries'

type FormData = {
  comment: string
}

const PostPage = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_POST_BY_POST_ID, 'getPostByPostId'],
  })
  const { data } = useQuery(GET_POST_BY_POST_ID, {
    variables: {
      post_id: router.query.postId,
    },
  })

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const post: DbPost = data?.getPostByPostId[0]

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const notification = toast.loading('Posting your comment...')

    await addComment({
      variables: {
        post_id: router.query.postId,
        text: data.comment,
        username: session?.user?.name,
      },
    })

    setValue('comment', '')

    toast.success("You've successfully commented on this post!", {
      id: notification,
    })
  }

  return (
    <div className="mx-auto my-7 max-w-5xl">
      <Post post={post} />

      <div className="-mt-1 rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16">
        <p className="text-sm">
          Comment as <span className="text-red-500">{session?.user?.name}</span>
        </p>

        <form
          className="flex max-w-5xl flex-col space-y-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <textarea
            {...register('comment', { required: true })}
            disabled={!session}
            className="h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50"
            placeholder={
              session ? 'What are your thoughts?' : 'Please sign in to comment.'
            }
          />

          <button
            type="submit"
            disabled={!session}
            className="rounded-full bg-red-500 p-3 font-semibold text-white disabled:bg-gray-200"
          >
            Comment
          </button>
        </form>
      </div>

      <div className="-my-5 rounded-b-md border border-t-0 border-gray-300 bg-white py-5 px-10">
        <hr className="py-2" />

        {post?.comments.map((comment: Comment) => (
          <div
            key={comment.id}
            className="relative flex items-center space-x-2 space-y-5"
          >
            <hr className="absolute top-10 left-7 z-0 h-16 border" />
            <div className="z-50">
              <Avatar seed={comment.username} />
            </div>

            <div className="flex flex-col">
              <p className="py-2 text-xs text-gray-400">
                <span className="font-semibold text-gray-600">
                  {comment.username}
                </span>{' '}
                ?? <Timeago date={comment.created_at} />
              </p>
              <p>{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostPage
