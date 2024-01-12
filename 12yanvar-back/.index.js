import express from 'express'
const app = express()
const port = process.env.PORT
app.use(express.json())
import cors from 'cors'
import mongoose, { Schema } from 'mongoose'
app.use(cors())
import 'dotenv/config'

app.get('/', async (req, res) => {
    try {
        const services = await ServiceModel.find({})
        res.send(services)
    } catch (error) {
        res.send(error.message)
    }
    
  })
  app.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const service = await ServiceModel.findById(id)
        res.send(service)
    } catch (error) {
        res.send(error.message)
    }

  
    
  })

  app.post('/', async (req, res) => {
    const {icon,name,description} = req.body
    try {
        const services = new ServiceModel({icon,name,description})
        await services.save()
        res.send(services)
        
    } catch (error) {
        res.send(error.message)
    }
    
  })
  
  app.put('/:id', async (req, res) => {
    const {id} = req.params
    const {icon,name,description} = req.body
    try {
        const services = await ServiceModel.findByIdAndUpdate(id, {icon,name,description})
        res.send(services)
        
    } catch (error) {
        res.send(error.message)
    }
  })
  
  app.delete('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const services = await ServiceModel.findByIdAndDelete(id)
        res.send(services)
         
    } catch (error) {
        res.send(error.message) 
    }
  })
  const serviceSchema = new Schema({
    icon: String, 
    name: String,
    description: String,
  })

  const ServiceModel = mongoose.model('ServiceModel', serviceSchema);
  
  mongoose.connect(process.env.DB_SECRET_KEY)
  .then(() => console.log('Connected!'))
  .catch(() => console.log('Not Connected!'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})