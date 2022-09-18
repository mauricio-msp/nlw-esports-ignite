import { Router } from 'express'

import AdController from '@/controllers/AdController'
import GameController from '@controllers/GameController'

const routes = Router()

routes.get('/games', GameController.getGames)
routes.get('/games/:id/ads', GameController.getAdsByGame)
routes.post('/games/:id/ads', AdController.createAdByGame)
routes.get('/ads/:id/discord', AdController.getDiscordByAd)

export default routes
