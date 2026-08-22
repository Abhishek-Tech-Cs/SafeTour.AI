const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const SALT_ROUNDS = 12;

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        trim:true,
        minlength:[3,"Name should contain at least 3 characters"],
        maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Email is required to registered user"],
        trim:true,
        lowercase:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Please enter a valid email"],
    },
    mobileNumber:{
        type:String,
        unique:true,
        required:[true,"Mobile is required"],
        trim:true,
        match: [/^[6-9]\d{9}$/, "Please enter a valid mobile number"],
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:[8,"Password should be at least 8 characters"],
        select:false
    },
    role:{
        type:String,
        enum:["tourist","authority","admin"],
        default:"tourist",
    },
    isVerified:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true,

    toJSON: {
      virtuals: true,
      versionKey: false,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
    },

    toObject: {
      virtuals: true,
      versionKey: false,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
    },
})


userSchema.pre("save",async function (next){
    if(!this.isModified("password")){
        return ;
    }

    this.password=await bcrypt.hash(this.password,SALT_ROUNDS);

})

userSchema.methods.comparePassword=async function(userPassword){
    return await bcrypt.compare(userPassword,this.password);
}

const User=mongoose.model("User",userSchema);

module.exports=User;