"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
const page = () => {
  const notify = () =>
    toast("✅ Verification succesfull / navigating to signin");
  const notify1 = () =>
    toast("❌ Verification Failed.session expied");
  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, SetError] = useState(false);
  const VerifyUser = async () => {
    setLoading(true)
    try{

      const response = await axios.post(`http://localhost/api/user/verify`, {
        token: token,
      });
    setLoading(false);

      if(response.status=200){
        
        notify()
      }else{
        notify1()
      }
      

    }catch(error:any){
      console.log(error)

    }
  };
  useEffect(() => {
const Urltoken=window.location.search.split("=")[1]
setToken(Urltoken)

  }, []);




  return (
    <div className="w-full min-h-screen items-center flex flex-col justify-center">
      <Loadingshow />

      <div className="m-auto self-center">
        <button
          className="bg-white text-black px-4 py-2 rounded-xl"
          onClick={VerifyUser}
        >
          Click to Verify
        </button>
        <button onClick={()=>{setLoading(false)}}>yujy</button>
      </div>
      <Toaster />
    </div>
  );
function Loadingshow() {
  if (loading) {
    return <div className="text-lg">loading...</div>;
  }
  
}
};

export default page;
