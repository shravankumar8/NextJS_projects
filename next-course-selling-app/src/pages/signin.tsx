import { BASE_URL } from "@/config";
import { userState } from "@/store/atoms/user";
import { Button, Card, TextField, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { inputvalidation } from "./_zodvalidation";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const setUser = useSetRecoilState(userState);
  return (
    <div>
      <div
        style={{
          paddingTop: 150,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography>Welcome to coursera sign in below</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant={"outlined"} style={{ width: 400, padding: 20 }}>
          <TextField
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            fullWidth={true}
            label="Email"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            fullWidth={true}
            label="password"
            type="password"
            variant="outlined"
          />
          <br />
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              size={"large"}
              onClick={async () => {
                try {
                    let parsedInput=await inputvalidation(email,password)
                    if(parsedInput.success){
                        const res = await axios.post(
                          `${BASE_URL}/admin/login`,
                          {
                            email: email,
                            password: password,
                          },
                          {
                            headers: {
                              "Content-Type": "application/json",
                            },
                          }
                        );
                        const data = res.data;
                        localStorage.setItem("token", data.token);
                        setUser({
                          isLoading: false,
                          userEmail: email,
                        });
                        router.push("/courses");

                    }else{
                        alert(parsedInput.error.errors[0].message);
                    }
                    

                } catch (error) {
                    console.log(error);
                    
                }
                
              }}
            >
              Signin
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
export default Signin;
