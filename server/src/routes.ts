import express from 'express'
import multer from 'multer'
import { celebrate, Joi } from 'celebrate'

import multerConfig from './config/multer'

import PointsController from './controllers/PointsController'
import ItemsController from './controllers/ItemsController'

// index, show, create, update, delete

const routes = express.Router()

const upload = multer(multerConfig)

const pointsConroller = new PointsController()
const itemsConroller = new ItemsController()

routes.get('/items', itemsConroller.index)

routes.get('/points', pointsConroller.index)
routes.get('/points/:id', pointsConroller.show)

routes.post(
  '/points',
  upload.single('image'),
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required()
      })
    },
    {
      abortEarly: false
    }
  ),
  pointsConroller.create
)

export default routes
