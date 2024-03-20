import mongoose from 'mongoose';
import { boolean, string } from 'zod';

let flag = false;

export default function modelmaker(){
    if(!flag){
    
        const userSchema=new mongoose.Schema({
            email:String,
            password:String,
            purchasedCourses:[{type:mongoose.Schema.Types.ObjectId,ref:'Course'}]
        })
        const adminSchema= new mongoose.Schema({
            email:String,
            password:String,
        
        })
        const courseSchema=new mongoose.Schema({
            title:String,
            description:String,
            price:String,
            imageLink:String,
            published:Boolean
        })
        
        const User = mongoose.model("User",userSchema);
        
        const Admin = mongoose.model("Admin", adminSchema);
        
        const Course = mongoose.model("Course",courseSchema);
        flag=true
        return {User,Admin,Course}

    
    
    }

}



