const mongoose= require('mongoose');
mongoose.connect('mongodb+srv://brahmiwiem359:hxFTL6BDEGpVnYIQ@cluster0.8lyr5jw.mongodb.net/iset?retryWrites=true&w=majority')
.then(
    ()=>{
        console.log('connected')
    }
)
.catch(
    (err)=>{
        console.log(err)
    }
)
module.exports=mongoose;
//hxFTL6BDEGpVnYIQ