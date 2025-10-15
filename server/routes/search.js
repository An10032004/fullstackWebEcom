const express = require('express')
const router = express.Router()
const {Product} = require('../models/product')
const mongoose = require('mongoose')

router.get('/',async (req,res) => {
    try {
        const query = req.query.q
        if(!query) {
             return res.status(400).json({msg:'Queyry is require'})
        }

        const items = await Product.find({
            $or:[
                {name:{$regex:query,$options:'i'}},
                {brand:{$regex:query,$options:'i'}},
                {subCategory:{$regex:query,$options:'i'}}
            ]
        })

        res.json(items)
    } catch (error) {
        res.status(500).json({msg:'Server errors'})
    }
})

module.exports = router