// imports external libraries
const express = require ('express');
const cors = require ('cors');

// people profile
const edensProfile = {
  firstName: "Eden",
  middleName: "Lindy",
  lastName: "Smith-Wint",
  preferences: {
    foods: ["grapes", "popcorn"],
    colour: "purple",
    number: 16
  },
  hoursOfSleep: 6
}

// books 

const harryPotter = {
  title: 'Philosophers Stone',
  author: 'J.K. Rowling',
  order: 'This is the 1st book'
}


const db ={
  profiles: {
    1000: edensProfile,
  },
  books: {
    300: harryPotter,
  },

    //  1: {
    //    title: 'Harry Potter and the Chamber of Secrets',
    //    author: 'J. K. Rowling'
    //  },

    //  2: {
    //    title: 'Harry Potter and the Prisoner of Azkaban',
    //    author: 'J. K. Rowling'
    //  }
  }


const app = express()
app.use(cors())
app.use(express.json())


// GET/ Profiles

app.get('/profiles',  (req, res) => {
  res.status(200).json({
    status: 'success',
    data: db.profiles,
    
  })
})

// // Get/ Books
app.get('/books', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: db.books
  })
})


// // GET/Profiles

// app.get('./profiles', (req, res) => {
//   res.status(200).json({
//     status: 'success', 
//     data: 'db.profiles'
//   })
// })

// // GET/books

// app.get('./books', (req, res) => {
//   res.status(200).json({
//     status: 'good', 
//     data: 'db.books'
//   })
// })

// POST/Profiles

app.post('/profiles', (req, res) => {

  // find the largest key and increment it
  const existingIds = Object.keys(db.profiles)
  const largestKey = Math.max(...existingIds)

  const newKey = largestKey + 1

  db.profiles[newKey] =req.body

  res.status(201).json({
    status: 'success',
    message: `Created a profile with id of ${newKey}`
  })
})

// POST/Books

app.post('/books', (req, res) => {

  const newExistingIds = Object.keys(db.books)
  const newLargestKey = Math.max(...newExistingIds)

  const theNewKey = newLargestKey +1

  db.books[theNewKey] =req.body

  res.status(201).json({
    status:'success',
    message:`Created new book with id of ${theNewKey}`
  })
})




// Get profile after adding new-save time typing- don't have to specify route parameter
app.get('/profiles/:userId', (req, res) => {
  console.log(req.params.userId)

  const matchingProfile = db.profiles[req.params.userId]

  if (matchingProfile) {
    res.json({
      status: 'success',
      data: matchingProfile
    })
  } else {
    res.status(404).json({
      message:"Couldn't find user with that id"
    })
  }
  
})

// Get books after adding new-save time typing- don't have to specify route parameter

app.get('/books/:userId', (req, res) => {
  console.log(req.params.userId)

  const matchingBooks = db.books[req.params.userId]

  if (matchingBooks) {
    res.json({
      status: 'success',
      data: matchingBooks
    })
  } else {
    res.status(404).json({
      message:"Couldn't find Book with that id"
    })
  }
  
})



// Delete Profile
app.delete('/profiles/:userId', (req, res) => {
  delete db.profiles[req.params.userId]

  res.status(200).json({
    status: 'success',
    message: ' deleted profile'
  })
})

// Delete Book
app.delete('/books/:userId', (req, res) => {
  delete db.books[req.params.userId]

  res.status(200).json({
    status: 'success',
    message: ' deleted book'
  })
})



// Put / profiles- update entire code/overwrite

app.put ('/profiles/:userId', (req, res) => {
  const idToUpdate = req.params.userId

  db.profiles[idToUpdate] = req.body

  res.status(200).json({
    message: "User updated"
  })

})


// Put / books- update entire code/overwrite

app.put ('/books/:userId', (req, res) => {
  const newIdToUpdate = req.params.userId

  db.books[newIdToUpdate] = req.body

  res.status(200).json({
    message: "Book updated"
  })

})

// Patch /profiles- updates pieces / adds to code

app.patch ('/profiles/:userId', (req, res) => {
  
  db.profiles[req.params.userId] = {
    ...db.profiles[req.params.userId],
    ...req.body
  }

  res.status(200).json({
    message: "User is now updated"
  })
})


// Patch /Books- updates pieces / adds to code

app.patch ('/books/:userId', (req, res) => {
  
  db.books[req.params.userId] = {
    ...db.books[req.params.userId],
    ...req.body
  }

  res.status(200).json({
    message: "Book is now updated"
  })
})






app.listen(4000, () => {
    console.log('it is working woop!')
})