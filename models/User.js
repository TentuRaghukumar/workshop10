const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require ('bcrypt');



const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please Enter An Email'],
        unique: true,
        lowercase: true,
        validate:[isEmail,'please Enter A valid Email Address']
    },
    password: {
        type: String,
        required: [true, 'Please Enter A password'],
        minlength: [6, 'Password Should Be Minimum 6 Characters']
    }
});

//Fire A Function After Doc Saved To db
// userSchema.post('save',function(doc,next){
//     console.log('new User Was Created & Saved',doc);
//     next();
// });

//Fire A Function Before Doc Saved To Db
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

//Static Meathod To Create Login User
userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email});
    if (user){
        const auth = await bcrypt.compare(password,user.password);
        if (auth){
            return user;
        }
        throw Error('incorrect password')
    }
    throw Error("incorrect Email")
}

const User = mongoose.model('user', userSchema);

module.exports = User;