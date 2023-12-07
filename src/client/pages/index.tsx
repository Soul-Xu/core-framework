import type { NextPage } from "next";
import { useRouter } from 'next/router';
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Login from '../pages/login';

const Index: NextPage = () => {
  const router = useRouter()
  const authState = useSelector((state: any) => state.auth.authState)

  useEffect(() => {
    if (!authState) {
      router.push("/login")
    } else {
      router.push('/app')
    }
  }, [authState, router])

  return (
    <div>
      <Login />
    </div>
  )
}

export default Index