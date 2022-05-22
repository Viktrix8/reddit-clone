import { useSession } from 'next-auth/react'
import Image from 'next/image'

type Props = {
  seed?: string
  large?: boolean
}

const Avatar = ({ seed, large }: Props) => {
  const { data: sessions } = useSession()

  return (
    <div
      className={`relative ${
        large ? 'h-20 w-20' : 'h-10 w-10'
      } overflow-hidden rounded-full border border-gray-300 bg-white`}
    >
      <Image
        src={`https://avatars.dicebear.com/api/open-peeps/${
          seed || sessions?.user?.name || 'placeholder'
        }.svg`}
        layout="fill"
        objectFit="cover"
      />
    </div>
  )
}

export default Avatar
