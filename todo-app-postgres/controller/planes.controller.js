const db = require('../db')

class PlanesController {
    async createPlane(req, res){
        const {model, speed, weight, passengers_amount} = req.body
        const newPlane = await db.query(`INSERT INTO planes (model, speed, weight, passengers_amount) VALUES ($1, $2, $3, $4) RETURNING *`, [model, speed, weight, passengers_amount])
        res.json(newPlane.rows[0])

    }

    async getPlanes(req, res){
        const planes = await db.query(`SELECT * FROM planes`)
        res.json(planes.rows)

    }

    async getOnePlane(req, res){
        const id = req.params.id
        const plane = await db.query(`SELECT * FROM planes WHERE id=$1`, [id])
        res.json(plane.rows[0])

    }

    async updatePlane(req, res){
        const {id, model, speed, weight, passengers_amount} = req.body
        const plane = await db.query(`UPDATE planes SET model= $1, speed=$2, weight=$3, passengers_amount=$4 WHERE id = $5 RETURNING *`, [model, speed, weight, passengers_amount, id])
        res.json(plane.rows[0])

    }

    async deletePlane(req, res){
        const id = req.params.id
        const plane = await db.query(`DELETE FROM planes WHERE id=$1`, [id])
        res.json(plane.rows[0])
    }
}

module.exports = new PlanesController()

