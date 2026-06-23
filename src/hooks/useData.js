import apiClient from '../utils/api-client'
import React, {useEffect, useState} from 'react'

const useData = (endpoint, customConfig, deps) => {
    const [data, setdata] = useState(null)
    const [error, seterror] = useState("")
    const [isLoading, setisLoading] = useState(false)

    useEffect(() => {
        let isMounted = true
        setisLoading(true)
        apiClient.get(endpoint, customConfig).then(res=> {
            if (!isMounted) return
            if (endpoint === "/products" && data && data.products && customConfig?.params?.page !== 1) {
                setdata(prev=>({...prev, products: [...prev.products, ...res.data.products]}))
            } else {
                setdata(res.data)
            }
            setisLoading(false)
        }).catch(err=> {
            if (!isMounted) return
            seterror(err.message)
            setisLoading(false)
        })

        return () => { isMounted = false }
    }, deps ? deps : [endpoint, customConfig ? JSON.stringify(customConfig) : null])

    return {data, error, isLoading}
}

export default useData