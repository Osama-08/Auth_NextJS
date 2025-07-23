import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required: [true,"Username is required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"]
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: {
        forgotPasswordTokenExpiry:Date,
        forgotPasswordToken: String,
        verifyToken: String,
        verifyTokenExpiry: Date
    }, 

})



const User = mongoose.model('user', userSchema);
export default User;