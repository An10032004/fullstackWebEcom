
const User   = require(`../models/user`)

const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const multer = require('multer');
const fs = require('fs');


let avatarFileName = '';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}_${file.originalname}`;
    avatarFileName = uniqueName;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// 🧩 Route upload avatar
router.post('/upload/upload-avatar', upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, msg: 'No file uploaded' });

    res.status(200).json({
      success: true,
      avatar: avatarFileName
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: 'Upload failed' });
  }
});






router.post('/signup',async (req,res) => {
    const {name,phone,email,password} = req.body
    try {
        const existingUser = await User.findOne({email:email})

        if(existingUser) {
            res.status(400).json({msg:'User Already exist'})
        }
        const hashPassword = await bcrypt.hash(password,10)

        const result = await User.create({
            name:name,
            phone:phone,
            email:email,
            password:hashPassword,
            isAdmin: req.body.isAdmin || false,
        })

        const token = jwt.sign({email:result.email,id:result._id,isAdmin: result.isAdmin},
            process.env.JSON_WEB_TOKEN_SECRET_KEY
        )

        res.status(200).json({
            user:result,
            token:token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"SignUp not process"})
    }

}) 

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
       
        

        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id ,isAdmin: existingUser.isAdmin},
            process.env.JSON_WEB_TOKEN_SECRET_KEY,
            
        );

        res.status(200).json({
            user: existingUser,
            token: token,
            isAdmin: existingUser.isAdmin,
            msg:"USER authenicated"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "SignIn not processed" });
    }
});


router.get('/', async (req, res) => {
    try {
        const users = await User.find().select("-password");
        if(!users) {
             res.status(500).json({success:false});
        }
        res.send(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Cannot fetch users" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Cannot fetch user" });
    }
});

// DELETE user by ID
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json({ msg: "User deleted successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error deleting user" });
    }
});


// GET total users count
router.get('/get/count', async (req, res) => {
    try {
        const userCount = await User.countDocuments();

        res.send({
            userCount: userCount
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error getting user count" });
    }
});


// UPDATE user by id
router.put('/:id', async (req, res) => {
    try {
        const { name, phone, email, password,avatar } = req.body;

        // nếu có password mới thì hash lại
        const userExist = await User.findById(req.params.id)
        let newPassword
        let updatedData = { name, phone, email };
        if (password) {
            newPassword = await bcrypt.hash(password, 10);
            updatedData.password = newPassword;
        }else {
            newPassword = userExist.password
            updatedData.password = newPassword
        }

           if (avatar) {
      // Xóa avatar cũ nếu có
      if (userExist.avatar && fs.existsSync(`uploads/${userExist.avatar}`)) {
        fs.unlinkSync(`uploads/${userExist.avatar}`);
      }
      updatedData.avatar = avatar;
    }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true } // trả về document mới sau khi update
        );

        if (!updatedUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json({
            msg: "User updated successfully",
            user: updatedUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error updating user" });
    }
});

router.post('/check-password/:id', async (req, res) => {
    try {
        const { password } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ valid: false, msg: "User not found" });

        const isValid = await bcrypt.compare(password, user.password);
        res.status(200).json({ valid: isValid });
    } catch (error) {
        console.error(error);
        res.status(500).json({ valid: false, msg: "Error checking password" });
    }
});
module.exports = router