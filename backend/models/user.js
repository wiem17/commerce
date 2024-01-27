const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, 'is required']

    },
    lastname: {
        type: String
    },
    age: {
        type: Number
    },
    email:{
        type:String,
        required:[true, 'is required'],
        unique:true,
        index:true,
        validator:function(str){
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/g.test(str);
        },
        message:props =>"${props.value} is not a valid email"
    },
    password:{
        type:String,
        required:[true, 'is required'],
    },

    isAdmin:{
        type:Boolean,
        default: false
    },
    cart:{
        type:Object,
        default:{
            total:0,
            count:0
        }
    },
    notifications:{
        type:Array,
        default:[]

    },
    orders: [{
        type: Schema.Types.ObjectId,
        ref: "Order"  
    }]
},
{minimize:false}
);


const User = mongoose.model('User', userSchema);

module.exports = User;
