import express from 'express'
import { createBook, deleteBook, getAllBooks, getBook, updateBook } from '../controllers/bookController.js'

const router = express.Router()

router.get('/', (req, res) => {
    console.log('HOME')
    return res.status(200).json({message: 'Home'})
})

router.post('/books', createBook)
router.get('/books', getAllBooks)
router.get('/books/:id', getBook)
router.put('/books/:id', updateBook)
router.delete('/books/:id', deleteBook)

export default router