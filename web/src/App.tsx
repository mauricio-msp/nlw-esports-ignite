import { useEffect, useState } from 'react'
import cx from 'classnames'

import * as Dialog from '@radix-ui/react-dialog'

import { CreateAdBanner } from '~/components/CreateAdBanner'
import { CreateAdDialog } from '~/components/CreateAdDialog'
import { GameBanner } from '~/components/GameBanner'

import { api } from '~/services/api'

import logoImage from '~/assets/logo-nlw-esports.svg'
import '~/styles/main.css'

interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    const handleGetGames = async () => {
      const response = await api.get<Game[]>('/games')

      setGames(response.data)
    }

    handleGetGames()
  }, [])

  return (
    <div className="max-w-full xl:max-w-[1344px] xl:mx-auto flex flex-col items-center my-20 mx-20">
      <img src={logoImage} alt="NLW-eSports" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{' '}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{' '}
        está aqui.
      </h1>

      <div
        className={cx(
          'flex gap-6 mt-16 py-4 w-full overflow-x-scroll',
          'snap-x snap-mandatory',
          'scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-500 scrollbar-thumb-rounded-full scrollbar-track-rounded-full',
        )}
      >
        {games.map(game => (
          <GameBanner
            key={game.id}
            bannerUrl={game.bannerUrl}
            title={game.title}
            adsCount={game._count.ads}
          />
        ))}
      </div>

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdDialog />
      </Dialog.Root>
    </div>
  )
}

export default App
