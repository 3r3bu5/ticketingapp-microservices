import express from "express";

const router = express.Router()

router.post('/api/users/signout', (req,res) => {
    res.json({message: "signout"})
})


export {router as signoutRouter}