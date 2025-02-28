import { Book } from "../models/bookModel.js"

export const createBook = async (req, res) => {
    try {
        // Check for missing fields
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).json({
                message: 'Send all required fields'
            })
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        }
        
        const book = await Book.create(newBook)

        return res.status(201).json({message: 'Book has been created!', book})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}

export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({})

        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message: error.message})
    }
}

export const getBook = async (req, res) => {
    try {
        const id = req.params.id
        const book = await Book.findById(id)

        return res.status(200).json(book)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message: error.message})
    }
}

export const updateBook = async (req, res) => {
    try {
        // Check for missing fields
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).json({
                message: 'Send all required fields'
            })
        }

        const id = req.params.id
        const result = await Book.findByIdAndUpdate(id, req.body)

        if(!result) return res.status(404).json({message: 'Book not found'})

        return res.status(200).json({message: 'Book has been updated!'})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message: error.message})
    }
}

export const deleteBook = async (req, res) => {
    try {
        const id = req.params.id
        const result = await Book.findByIdAndDelete(id)

        if(!result) return res.status(404).json({message: 'Book not found'})

        return res.status(200).json({message: 'Book has been deleted!'})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message: error.message})
    }
}