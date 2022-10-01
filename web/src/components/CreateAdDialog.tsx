import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { GameController } from 'phosphor-react'

import * as Dialog from '@radix-ui/react-dialog'

import { SelectWeekdays } from '~/components/SelectWeekdays'

import { Input } from '~/components/Form/Input'
import { Select } from '~/components/Form/Select'
import { Checkbox } from '~/components/Form/Checkbox'

import { api } from '~/services/api'

interface Game {
  id: string
  title: string
}

interface Ad {
  game: string
  name: string
  yearsPlaying: number
  discord: string
  hourStart: string
  hourEnd: string
  useVoiceChannel: boolean
  weekdays: Array<string>
}

export function CreateAdDialog() {
  const { control, handleSubmit, reset } = useForm<Ad>()

  const [games, setGames] = useState<{ value: string; label: string }[]>([])

  const handleSubmitAd = async (values: Ad) => {
    console.log('TCL: ~ handleSubmitAd ~ values', values)

    await api.post(`/games/${values.game}/ads`, {
      ...values,
      yearsPlaying: Number(values.yearsPlaying),
    })
  }

  useEffect(() => {
    const handleGetGames = async () => {
      const response = await api.get<Game[]>('/games')
      const dataFormatted = response.data.map(game => ({
        label: game.title,
        value: game.id,
      }))

      setGames(dataFormatted)
    }

    handleGetGames()
  }, [])

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[500px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl font-black">
          Publique um anúncio
        </Dialog.Title>

        <form
          onSubmit={handleSubmit(handleSubmitAd)}
          className="mt-8 flex flex-col gap-4"
        >
          <Controller
            name="game"
            defaultValue=""
            control={control}
            rules={{
              required: 'Campo obrigatório',
            }}
            render={({ field, fieldState }) => (
              <Select
                title="Qual o game?"
                placeholder="Selecione o game que deseja jogar"
                name="game"
                options={games}
                error={fieldState.error}
                onSelect={field.onChange}
              />
            )}
          />

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Controller
              name="name"
              defaultValue=""
              control={control}
              rules={{
                minLength: {
                  value: 3,
                  message: 'Precisa ter no mínimo 3 caracteres.',
                },
                required: 'Campo obrigatório',
              }}
              render={({ field, fieldState }) => (
                <Input
                  id="name"
                  type="text"
                  placeholder="Como te chamam dentro do game?"
                  error={fieldState.error}
                  {...field}
                />
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Controller
                name="yearsPlaying"
                defaultValue={0}
                control={control}
                rules={{
                  min: {
                    value: 0,
                    message: 'Insira um valor válido',
                  },
                  required: 'Campo obrigatório',
                }}
                render={({ field, fieldState }) => (
                  <Input
                    id="yearsPlaying"
                    type="number"
                    placeholder="Tudo bem ser ZERO"
                    error={fieldState.error}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu Discord?</label>

              <Controller
                name="discord"
                defaultValue=""
                control={control}
                rules={{
                  pattern: {
                    value:
                      /(https?:\/\/)?(www\.|canary\.|ptb\.)?discord(\.gg|(app)?\.com\/invite|\.me)\/([^ ]+)\/?/gi,
                    message:
                      'Precisa informar uma url válida. Ex.: https://discord.gg/46Msp',
                  },
                  required: 'Campo obrigatório',
                }}
                render={({ field, fieldState }) => (
                  <Input
                    id="discord"
                    type="text"
                    placeholder="usuario#0000"
                    error={fieldState.error}
                    {...field}
                  />
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Controller
              name="weekdays"
              defaultValue={[]}
              control={control}
              rules={{ required: 'Precisa ter no mínimo um dia selecionado.' }}
              render={({ field, fieldState }) => (
                <SelectWeekdays
                  selected={field.value}
                  onSelect={field.onChange}
                  error={fieldState.error}
                />
              )}
            />

            <div className="flex flex-col gap-2">
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-1">
                <Controller
                  name="hourStart"
                  defaultValue=""
                  control={control}
                  rules={{ required: 'Campo obrigatório' }}
                  render={({ field, fieldState }) => (
                    <Input
                      id="hourStart"
                      type="time"
                      placeholder="De"
                      error={fieldState.error}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="hourEnd"
                  defaultValue=""
                  control={control}
                  rules={{ required: 'Campo obrigatório' }}
                  render={({ field, fieldState }) => (
                    <Input
                      id="hourEnd"
                      type="time"
                      placeholder="Até"
                      error={fieldState.error}
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
          </div>

          <Controller
            name="useVoiceChannel"
            defaultValue={false}
            control={control}
            render={({ field }) => (
              <Checkbox
                label="Costumo me conectar ao chat de voz"
                checked={field.value}
                onChecked={field.onChange}
              />
            )}
          />

          <footer className="mt-4 flex gap-4 justify-end">
            <Dialog.Close
              onClick={() => reset({})}
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
