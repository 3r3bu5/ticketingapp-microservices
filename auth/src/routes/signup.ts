import express from "express";

const router = express.Router()

router.post('/api/users/signup', (req,res) => {
    res.json({message: "register"})
})


export {router as signupRouter}