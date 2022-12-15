const Router = require('express')
const router  = new Router()
const PlaneController = require('../controller/planes.controller')

router.post('/plane', PlaneController.createPlane)
router.get('/plane', PlaneController.getPlanes)
router.get('/plane/:id', PlaneController.getOnePlane)
router.put('/plane/', PlaneController.updatePlane)
router.delete('/plane/:id', PlaneController.deletePlane)


module.exports = router