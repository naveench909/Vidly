const express = require('express');
const mongoose = require('mongoose');
const {Movie,validateMovie} = require('../Models/movie');
const {Genre} = require('../Models/genre');
const router = express.Router();

router.get('/',async(req,res)=>{
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

router.get('/:id', async(req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) return res.status(404).send('The customer with the given ID was not found.');
    res.send(movie);
  });

router.post('/', async(req,res)=>{
    const {error} = validateMovie(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid Genre.');

    const movie = new Movie({           //let movie = new Movie({})
        title: req.body.title,
        genre: {
          _id: genre._id,
          name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    await movie.save();       // movie = await movie.save();
    res.send(movie);
});

router.put('/:id', async(req, res) => {
    const { error } = validateMovie(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const movie = await Movie.findByIdAndUpdate(req.params.id,{
       title: req.body.title,
        genre: {
          _id: genre._id,
          name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate},
        {new:trim})
  
    if (!movie) return res.status(404).send('The Movie with the given ID was not found.');
   
    res.send(movie);
  });
  
router.delete('/:id', async(req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
  
    res.send(movie);
  });
  
  module.exports = router;