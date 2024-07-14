import mongoose from "mongoose";

export async function connection(){
try{
await mongoose.connect(process.env.DATABASE_URL!)
mongoose.connection.on("connected",()=>{
console.log("Mongodb connected succesfully")

})
mongoose.connection.on("error",(err)=>{
console.log('connection error make sure db is up and runnig'+err)
process.exit() 
})
}catch(error){
console.log("ohh something went wront")
	 console.log(error)
}

}
