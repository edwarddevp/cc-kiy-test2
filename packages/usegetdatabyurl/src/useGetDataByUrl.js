import React, {useEffect, useState} from 'react'
import Comet from '@codecraft/comet';

export const useGetDataByUrl = (path, api) => {

  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() =>{
    execute()
  },[])

  const execute = async () => {
    setLoading(true)
    try {
      api && api.setToken(Cookies.get(process.env.TOKEN_KEY));
      const _api = api || Comet
      const res = await _api.call(path)
      const isArray = Array.isArray(res);
      setResults(api? isArray ? res.data || res : [] : res.data || res)
      setLoading(false)
    } catch (e) {
      setError(e)
    }
  }

  return [
    results,
    loading,
    execute,
    error
  ]

}
