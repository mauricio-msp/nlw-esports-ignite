import { FormEvent, useEffect, useState } from 'react'
import cx from 'classnames'

import * as Checkbox from '@radix-ui/react-checkbox'
import * as Dialog from '@radix-ui/react-dialog'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

import { Check, GameController } from 'phosphor-react'

import { Input } from './Form/Input'
import { Tooltip } from './Primitives/Tooltip'

import { weekdays } from '../helpers/weekdays'

interface Game {
  id: string
  title: string
}

export function CreateAdDialog() {
  const [games, setGames] = useState<Game[]>([])
  const [selectedWeekdays, setSelectedWeekdays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false)

  const handleCreateAd = (event: FormEvent) => {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    fetch(`http://localhost:3333/games/${data.game}/ads`, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel,
        weekdays: selectedWeekdays,
      }),
    })
      .then(response => response.json())
      .then(responseData => console.log(responseData))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => setGames(data))
  }, [])

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[500px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl font-black">
          Publique um anúncio
        </Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>
            <select
              required
              id="game"
              name="game"
              className="form-select bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
              defaultValue=""
            >
              <option disabled value="">
                Selecione o game que deseja jogar
              </option>
              {games.map(game => (
                <option key={game.id} value={game.id}>
                  {game.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input
              required
              id="name"
              name="name"
              type="text"
              placeholder="Como te chamam dentro do game?"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input
                required
                id="yearsPlaying"
                type="number"
                name="yearsPlaying"
                min={0}
                placeholder="Tudo bem ser ZERO"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu Discord?</label>
              <Input
                required
                id="discord"
                type="text"
                name="discord"
                placeholder="usuario#0000"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekdays">Quando costuma jogar?</label>

              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-2"
                value={selectedWeekdays}
                onValueChange={setSelectedWeekdays}
              >
                {weekdays.map(({ value, title }) => (
                  <Tooltip key={value} title={title}>
                    <ToggleGroup.Item
                      value={value}
                      className={cx(
                        'w-8 h-8 rounded',
                        selectedWeekdays.includes(value)
                          ? 'bg-violet-500'
                          : 'bg-zinc-900',
                      )}
                    >
                      {title.charAt(0)}
                    </ToggleGroup.Item>
                  </Tooltip>
                ))}
              </ToggleGroup.Root>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-1">
                <Input
                  required
                  id="hourStart"
                  type="time"
                  name="hourStart"
                  placeholder="De"
                />
                <Input
                  required
                  id="hourEnd"
                  type="time"
                  name="hourEnd"
                  placeholder="Até"
                />
              </div>
            </div>
          </div>

          <label className="mt-2 flex items-center gap-2 text-sm">
            <Checkbox.Root
              checked={useVoiceChannel}
              onCheckedChange={checked => setUseVoiceChannel(!!checked)}
              className="w-6 h-6 p-1 rounded bg-zinc-900"
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex gap-4 justify-end">
            <Dialog.Close
              type="button"
              className="bg-zinc-500 hover:bg-zinc-600 px-5 h-12 rounded-md font-semibold"
            >
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
