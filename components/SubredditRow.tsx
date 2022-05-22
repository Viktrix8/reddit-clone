import { ChevronUpIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import Avatar from './Avatar'

type Props = {
  topic: string
  index: number
}

const SubredditRow = ({ topic, index }: Props) => {
  return (
    <div className="last_rounded-b flex items-center space-x-2 border-t bg-white px-4 py-2">
      <p>{index + 1}</p>
      <ChevronUpIcon className="h-4 w-4 flex-shrink-0 text-green-400" />
      <Avatar seed={topic} />
      <p className="flex-1 truncate">r/{topic}</p>
      <Link href={`/subreddit/${topic}`}>
        <div className="cursor-pointer rounded-full bg-blue-500 px-3 text-white">
          View
        </div>
      </Link>
    </div>
  )
}

export default SubredditRow
