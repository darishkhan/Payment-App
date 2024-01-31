const express = require('express');
const zod = require("zod");
const json = require("jsonwebtoken");
const {JWT_SECRET}  = require("../config");
const { User, Account } = require('../db');
const bcrypt = require('bcrypt');
const { authMiddleware } = require('../middleware');

const router =  express.Router();

const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    lastname: zod.string(),
    firstname: zod.string()
});

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

const updateBody = zod.object({
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string()
})

router.post('/signup', async (req, res)=>{
    const {success} = signupBody.safeParse(req.body);
    
    if(!success)
    {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    });

    if(existingUser)
    {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    

    const user = await User.create({
        username: req.body.username,
        password: hashedPassword,
        lastname: req.body.lastname,
        firstname:req.body.firstname 
    });

    const userId = user._id;

    const account = await Account.create({
        userId: userId,
        balance: 1 + Math.random() * 1000
    })

    if(!account){
        return res.status(411).json({
            message: "Server down"
        });
    }


    const token = json.sign({
        userId
    }, JWT_SECRET);

    return res.status(200).json({
        message: "User created successfully",
        token
    });

});



router.post('/signin', async (req, res)=>{
    const {success} = signinBody.safeParse(req.body);
    if(!success)
    {
        return res.status(411).json({
            message: "Error while logging in"
        })
    }

    const user = await User.findOne({
        username: req.body.username
    });

    if(!user)
    {
        return res.status(411).json({
            message: "Error while logging in"
        });
    }

    const matchPassword = await bcrypt.compare(req.body.password, user.password);

    if(!matchPassword)
    {
        return res.status(411).json({
            message: "Error while logging in"
        });
    }

    const userId = user._id;

    const token = json.sign({
        userId
    }, JWT_SECRET);

    return res.status(200).json({
        token
    });

});

router.put('/', authMiddleware, async (req, res) => {
    const {success} = updateBody.safeParse(req.body);
    
    if(!success){
        return res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne({
        _id: req.userId 
    }, req.body);

    return res.status(200).json({
        message:"Updated successfully!"
    })
});


router.get('/bulk', authMiddleware, async (req, res) => {
    const searchWord = req.query.filter || "";

    const users = await User.find({
        $or:[
            {
                firstname:{
                    $regex: searchWord 
                }
            },
            {
                lastname:{
                    $regex: searchWord
                }
            }
        ]
    });

    return res.status(200).json({
        user: users.map((user)=>({
            username: user.username,
            lastname: user.lastname,
            firstname: user.firstname,
            _id: user._id
        }))
    })
});


module.exports = router;