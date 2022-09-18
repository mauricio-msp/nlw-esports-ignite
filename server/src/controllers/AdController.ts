import { Request, Response } from 'express'

import { prisma } from '@config/prisma'
import { convertHourStringToMinutes } from '@utils/convert-hour-string-to-minutes'

class AdsController {
  async createAdByGame(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const gameId = request.params.id
    const body = request.body

    const ad = await prisma.ad.create({
      data: {
        gameId,
        name: body.name,
        yearsPlaying: body.yearsPlaying,
        discord: body.discord,
        weekdays: body.weekdays.join(','),
        hourStart: convertHourStringToMinutes(body.hourStart),
        hourEnd: convertHourStringToMinutes(body.hourEnd),
        useVoiceChannel: body.useVoiceChannel,
      },
    })

    return response.status(201).json(ad)
  }

  async getDiscordByAd(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const adId = request.params.id

    const ad = await prisma.ad.findUnique({
      select: { discord: true },
      where: { id: adId },
    })

    if (!ad)
      return response.status(400).json({ message: '🛑 No discord were found.' })

    return response.status(200).json(ad)
  }
}

export default new AdsController()
