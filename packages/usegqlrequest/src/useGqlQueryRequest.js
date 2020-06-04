import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'

/**
 * Este hook se puede usar para todos los call bacicos de un query
 * Si es necesario, se puede crear un nuevo hook a partir de este para
 * casos donde se debe extender la logica
 * @param collection
 * @param QUERY
 * @param options
 * @param defaultValue
 * @param verbose
 * @returns {[ data, call, boolean, ApolloError]}
 */
export const useGqlQueryRequest = (collection, QUERY, options = {}, defaultValue = [], verbose) => {

  const [data, setData] = useState(defaultValue)
  const { refetch, loading, error } = useQuery(QUERY, options)

  const call = async variables => {
    try {
      const res = await refetch(variables)
      if(verbose){
        console.log('%c res.data', 'color:white;background-color:red', res.data);
      }
      setData(res.data[collection])
    } catch (e) {
      console.log('%c useGqlQueryRequest', 'color:white;background-color:red', e);
    }
  }

  return [
    data,
    call,
    loading,
    error
  ]
}
