import { BASE_URL } from "@/config";
import { userState } from "@/store/atoms/user";
import { Button, Card, TextField, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";

import { inputvalidation } from "./_zodvalidation";

const singup = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
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
        <Typography>Welcome to coursera admin sign up below</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant={"outlined"} style={{ width: 400, padding: 20 }}>
          <TextField
            onChange={(event) => {
              setemail(event.target.value);
            }}
            fullWidth={true}
            label="Email"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={(event) => {
              setpassword(event.target.value);
            }}
            fullWidth={true}
            label="password"
            variant="outlined"
            type={"password"}
          />
          <br />
          <br />
          <Button
            size={"large"}
            variant="outlined"
            onClick={async () => {
              try {
                const parsedInput = await inputvalidation(email, password);
                if (parsedInput.success) {
                  const response = await axios.post(
                    `${BASE_URL}/api/admin/signup`,
                    {
                      email: email,
                      password: password,
                    }
                  );
                  let data = response.data;
                  localStorage.setItem("token", data.token);
                  if(data.token){
                    setUser({ userEmail: email, isLoading: false });
                    alert("user saved successfully");
                    router.push("/courses");

                  }
                } else {
                  console.log(parsedInput);
                  alert(parsedInput.error.errors[0].message);
                }
              } catch (error) {
                console.log("error", error);
              }
            }}
          >
            signup
          </Button>
        </Card>
      </div>
    </div>
  );
};
export default singup;
