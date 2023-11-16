import type { NextPage } from "next"
import { useEffect } from "react"
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from "react-redux";

const Index: NextPage = () => {
  const dispatchRedux = useDispatch();
  const authState = useSelector((state: any) => state.auth.authState)
  const router = useRouter()

  useEffect(() => {
    if (!authState) {
      router.push("/login")
    } else {
      router.push('/home')
    }
  }, [])

  return (
    <div>
      index-outer
    </div>
  )
}

export default Index