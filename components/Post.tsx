import { useMutation, useQuery } from '@apollo/client'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  ChatAltIcon,
  DotsHorizontalIcon,
  GiftIcon,
  ShareIcon,
} from '@heroicons/react/outline'
import { Jelly } from '@uiball/loaders'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import TimeAgo from 'react-timeago'
import { ADD_VOTE } from '../graphql/mutations'
import { GET_ALL_VOTES_BY_POST_ID } from '../graphql/queries'
import { Post, Vote } from '../typings'

import Avatar from './Avatar'

type Props = {
  post: Post
}

const Post = ({ post }: Props) => {
  const [vote, setVote] = useState<boolean>()
  const { data: session } = useSession()
  const topic = post?.subreddit[0]?.topic

  const { data, loading } = useQuery(GET_ALL_VOTES_BY_POST_ID, {
    variables: {
      post_id: post?.id,
    },
  })

  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_ALL_VOTES_BY_POST_ID, 'getVotesByPostId'],
  })

  const upVote = async (isUpvote: boolean) => {
    if (!session) return toast.error('You must be logged in to vote!')
    if (vote && isUpvote) return toast.error('You can only vote once!')
    if (vote === false && !isUpvote)
      return toast.error('You can only vote once!')

    const notification = toast.loading("We're voting for you...")

    await addVote({
      variables: {
        post_id: post?.id,
        username: session?.user?.name,
        upvote: isUpvote,
      },
    })

    toast.success("We've voted for you!", {
      id: notification,
    })
  }

  useEffect(() => {
    const votes: Vote[] = data?.getVotesByPostId

    const vote = votes?.find(
      (vote: Vote) => vote.username === session?.user?.name
    )?.upvote

    setVote(vote)
  }, [data])

  if (!post)
    return (
      <div className="flex w-full items-center justify-center p-10 text-xl">
        <Jelly size={50} color="#ff4501" />
      </div>
    )

  const displayVotes = (data: any) => {
    const votes: Vote[] = data?.getVotesByPostId
    const displayNumber = votes?.reduce(
      (total, vote) => (vote.upvote ? (total += 1) : (total -= 1)),
      0
    )

    if (votes?.length === 0) return 0

    if (displayNumber === 0) {
      return votes[0].upvote ? 1 : -1
    }

    return displayNumber
  }

  return (
    <Link href={`/post/${post.id}`}>
      <div className="flex w-full flex-1 cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border hover:border-gray-600">
        <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
          <ArrowUpIcon
            onClick={() => upVote(true)}
            className={`voteButtons hover:text-red-400 ${
              vote && 'text-red-400'
            }`}
          />
          <p className="text-xs font-bold text-black">{displayVotes(data)}</p>
          <ArrowDownIcon
            onClick={() => upVote(false)}
            className={`voteButtons hover:text-blue-400 ${
              vote === false && 'text-blue-400'
            }`}
          />
        </div>

        <div className="p-3 pb-1">
          <div className="flex items-center space-x-2">
            <Avatar seed={topic} />
            <p className="text-xs text-gray-400">
              <Link href={`/subreddit/${post.subreddit[0].topic}`}>
                <span className="font-bold text-black hover:text-blue-400 hover:underline">
                  r/{topic}
                </span>
              </Link>
              · Posted By u/ {post.username} <TimeAgo date={post.created_at} />
            </p>
          </div>

          <div className="py-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm font-light">{post.body}</p>
          </div>

          <img src={post.image} className="w-full" alt="" />

          <div className="flex space-x-4 text-gray-400">
            <div className="postButtons">
              <ChatAltIcon className="h-5 w-6" />
              <p className="">{post.comments.length} Comments</p>
            </div>
            <div className="postButtons">
              <GiftIcon className="h-5 w-6" />
              <p className="hidden sm:inline">{post.comments.length} Award</p>
            </div>
            <div className="postButtons">
              <ShareIcon className="h-5 w-6" />
              <p className="hidden sm:inline">{post.comments.length} Share</p>
            </div>
            <div className="postButtons">
              <BookmarkIcon className="h-5 w-6" />
              <p className="hidden sm:inline">{post.comments.length} Save</p>
            </div>
            <div className="postButtons">
              <DotsHorizontalIcon className="h-5 w-6" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Post
