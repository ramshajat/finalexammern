var Recipie = require('../model/Recipie');
const path = require('path')


const add = async(req,res)=>{

    const create = await Recipie.create(req.body)
    res.send({status:"success"})
}


const getrecipie = async(req,res)=>{
    const recipies = await Recipie.find()
    res.json({recipies:recipies})
}

const getwithname = async(req,res)=>{

    const name=req.params.name
    const recipies=await recipies.find({name:name})
    res.json({recipies:recipies})

}

const deleterecipie = async(req,res)=>{
    const id = req.params.id
    await recipies.remove({_id:id})
    res.json({status:"success"})
}


module.exports = {
    add,
    getrecipie,
    getwithname,
    deleterecipie
}
