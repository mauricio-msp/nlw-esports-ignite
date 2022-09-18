import { Request, Response } from 'express'

import { prisma } from '@config/prisma'
import { convertMinutesToHourString } from '@/utils/convert-minutes-to-hour-string'

class GameController {
  async getGames(request: Request, response: Response): Promise<Response> {
    const games = await prisma.game.findMany({
      orderBy: { title: 'asc' },
      include: { _count: { select: { ads: true } } },
    })

    if (!games || !games.length)
      return response.status(400).json({ message: '🛑 No games were found.' })

    return response.status(200).json(games)
  }

  async getAdsByGame(request: Request, response: Response): Promise<Response> {
    const gameId = request.params.id

    const ads = await prisma.ad.findMany({
      select: {
        id: true,
        name: true,
        weekdays: true,
        useVoiceChannel: true,
        yearsPlaying: true,
        hourStart: true,
        hourEnd: true,
      },
      where: { gameId },
      orderBy: { createdAt: 'desc' },
    })

    if (!ads || !ads.length)
      return response.status(400).json({ message: '🛑 No ads were found.' })

    return response.status(200).json(
      ads.map(ad => ({
        ...ad,
        weekdays: ad.weekdays.split(','),
        hourStart: convertMinutesToHourString(ad.hourStart),
        hourEnd: convertMinutesToHourString(ad.hourEnd),
      })),
    )
  }
}

export default new GameController()
