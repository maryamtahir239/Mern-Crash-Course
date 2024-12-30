import User from "../models/user.model.js"
export const register = async(req,res) => {
    try {
        const {name,email,password} = req.body
        const user = await User.create({name,email,password})
        const token = user.createJWT()
        res.status(201).json({user:{name:user.name,email:user.email,token}})
    } catch (error) {
        res.status(500).json({msg:'an error occurred'})
    }
}

export const login = async(req,res) =>{
     const {email,password} = req.body

     if(!email || !password){
       return res.status(500).json({msg:"please provide all values"})
     }
     const user = await User.findOne({email}).select('+password')
     if(!user){
       return res.status(500).json({msg:'Invalid credentials'})
     }

     const isCorrect = await user.comparePassword(password)
      if(!isCorrect){
       return res.status(500).json({msg:'Invalid credentials'})
      }

      const token = user.createJWT()
      user.password = undefined
      res.status(201).json({user,token})
}
