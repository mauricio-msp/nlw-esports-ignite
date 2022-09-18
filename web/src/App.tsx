import { MagnifyingGlassPlus } from 'phosphor-react'

import logoImage from './assets/logo-nlw-esports.svg'
import './styles/main.css'

function App() {
  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImage} alt="NLW eSports" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu{' '}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{' '}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        <a href="">
          <img src="/game-1.png" alt="Game 1" />
        </a>
        <a href="">
          <img src="/game-2.png" alt="Game 2" />
        </a>
        <a href="">
          <img src="/game-3.png" alt="Game 3" />
        </a>
        <a href="">
          <img src="/game-4.png" alt="Game 4" />
        </a>
        <a href="">
          <img src="/game-5.png" alt="Game 5" />
        </a>
        <a href="">
          <img src="/game-6.png" alt="Game 6" />
        </a>
      </div>

      <div className="pt-1 mt-8 bg-nlw-gradient self-stretch rounded-lg overflow-hidden">
        <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
          <div>
            <strong className="text-2xl text-white font-black block">
              Não encontrou seu duo?
            </strong>
            <span className="text-zinc-400">
              Publique um anúncio para encontrar novos players!
            </span>
          </div>

          <button className="py-3 px-4 bg-violet-500 hover:bg-violet-700 text-white rounded flex items-center gap-3">
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
