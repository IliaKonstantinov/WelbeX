import { Item } from "../models/models.js"

export const createItem = async (req, res) => {
  try {
    const object = await Item.create({
      date: Date(),
      name: req.body.name,
      count: req.body.count,
      distance: req.body.distance
    })

    res.status(200).json(object);
  } catch (e) {
    console.log(e)
    res.status(500).json({message: 'Непредвиденная ошибка'})
  }
} 

export const getAllItems = async (req, res) => {
  try {
    const allItems = await Item.findAll()

    res.json(allItems)
    
  } catch (e) {
    console.log(e)
    res.status(500).json({message: 'Непредвиденная ошибка'})
  }
}

export const deleteItem = async (req, res) => {
  try {
    const deleted = await Item.destroy({
      where: {id: req.body._id}
    })

    res.status(200).json(deleted);
  } catch (e) {
    console.log(e)
    res.status(500).json({message: 'Непредвиденная ошибка'})
  }
}