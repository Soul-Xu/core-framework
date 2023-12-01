import type { NextPage } from "next";
import { useRouter } from 'next/router';
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Login from '../pages/login';
import { useDispatch } from "react-redux";
import { setBaseApi } from "../store/modules/commonSlice";

const Index: NextPage = () => {
  const router = useRouter()
  const dispatchRedux = useDispatch();
  const authState = useSelector((state: any) => state.auth.authState)

  useEffect(() => {
    if (!authState) {
      router.push("/login")
    } else {
      router.push('/app')
    }
  }, [authState, router])

  useEffect(() => {
    const hostName = window.location.hostname
    const origin = window.location.origin
    if (hostName === "localhost") {
      const apiPre = "http://localhost:3001/api/sys-auth"
      dispatchRedux(setBaseApi({
        baseApi: apiPre
      }))
    } else {
      dispatchRedux(setBaseApi({
        baseApi: `${origin}/api/sys-auth`
      }))
    }
  }, [])

  return (
    <div>
      <Login />
    </div>
  )
}

export default Index