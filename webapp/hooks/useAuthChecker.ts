import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function (authUser) {
  const router = useRouter()
  useEffect(() => {
    if (!authUser) {
      router.push("/login")
    }
  }, [authUser])
}