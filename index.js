const express = require ('express');
const cors = require ('cors');

const edensProfile = {
    firstName: 'Eden',
    lastName: "Smith-Wint",
    preferences: {
      foods: ["grapes", "popcorn"],
      colour: 'purple',
      number: 16
    },
    hoursOfSleep: 5
  }
  
  const db = {
    profiles: {
      1000: edensProfile,
    },
    books: {
      0: {
        title: 'Philosophers Stone',
        author: 'J. K. Rowling'
      },
      1: {
          title: 'Harry Potter and the Chamber of Secrets',
          author: 'J. K. Rowling'
        //   price: 8
      },
      2: {
          title: 'Harry Potter and the Prisoner of Azkaban',
      author: 'New J. K. Rowling'
      }
      
    }
  }
  
  const app = express()
  app.use(cors())
  app.use(express.json()) // for parsing application/json
  
  
  // GET /profiles
  app.get('/profiles', (req, res) => {
    res.json({
      status: 'success',
      data: db.profiles
    })
  })
  
  // POST /profiles
  app.post('/profiles', (req, res) => {
  
    // find the largest key and increment it
    const existingIds = Object.keys(db.profiles)
    const largestKey = Math.max(...existingIds)
  
    const newKey = largestKey + 1
  
    db.profiles[newKey] = req.body
  
    res.json({
      status: 'success',
      message: `Created a profile with id of ${newKey}`
    })
  })
  
  app.get('/profiles/:userId', (req, res) => {
    console.log(req.params.userId)
  
    const matchingProfile = db.profiles[req.params.userId]
  
    if (matchingProfile) {
      res.json({
        status: 'success',
        data: matchingProfile
      })
    } else {
      res.json({
        message: "Couldn't find user with that id"
      })
    }
    
  })
  
  



app.listen(2040, () => {
    console.log('it is working woop!')
})