import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide name'],
        minlength:5,
        trim:true
    },
    email:{
        type:String,
        required:true,
        validate:{
            validator:validator.isEmail,
            message:'Please provide a valid email address'
        },
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please provide password'],
        minlength:6,
        select:false
    }
})

userSchema.pre('save',async function() {
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password,salt)
})
userSchema.methods.createJWT = function(){
    return jwt.sign({userId:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}
userSchema.methods.comparePassword = async function(candidate){
    return await bcryptjs.compare(candidate,this.password)
}
const User = mongoose.model('User', userSchema);
export default User; 