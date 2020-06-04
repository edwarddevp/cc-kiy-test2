import React, {useEffect, useRef, useState} from 'react'
import Comet from '@cc-test2/comet';
import {useQuery} from "@apollo/react-hooks";
/*
* hacer el llamado para recibir los datos a colocar en la tabla
* Guardar el total de items recibidos
* manejar el filtro (nuevo filtrar la pagina se devuelve a uno)
* manejar pagina (cambio de pagina el filtro se mantiene)
* reset filter
* */

export const useDataTable = ({limit=5,initialValues={},path,api,field,collection, QUERY, collectionCount, QueryCount}) => {
  const [actualPage, setActualPage] = useState(1);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState(initialValues);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const mountedFilter = useRef();
  const mountedPage = useRef();

  const gqlCount = QueryCount && useQuery(QueryCount,{
    variables:{search:filter.name},
    onCompleted:(data)=>{
      setTotal(data[collectionCount])
    }});

  const gql = QUERY && useQuery(QUERY,{
    variables:{
      options:{
        page:actualPage,
        limit:limit
      },
      search:filter.name
    },
    onCompleted:(data)=>{
      setList(data[collection])
    }});

  useEffect(() =>{
    if(!QUERY){
      setInitialLoading(true);
      listItems().then(()=> setInitialLoading(false))
    }
  },[]);

  useEffect(() =>{
    if (!mountedFilter.current) {
      mountedFilter.current = true;
    } else {
      listItems()
    }
  },[filter]);

  useEffect(() =>{
    if (!mountedPage.current) {
      mountedPage.current = true;
    } else {
      listItems()
    }
  },[actualPage]);

  const listItems = async () => {
    return QUERY? listItemsWithGql() : listItemsByCometOrAndApi()
  };

  const listItemsWithGql = async () =>{
    try {
      setLoading(true);
      const res = await gql?.refetch({
        options: {
          page:actualPage,
          limit:limit,
        },
        search:filter.name});
      const resCount = await gqlCount?.refetch({search:filter.name});
      setTotal(resCount.data[collectionCount]);
      setList(res.data[collection]);
      setLoading(false)
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };

  const listItemsByCometOrAndApi = async () => {
    setLoading(true);
    try {
      const params = api? {params :{
          page: actualPage,
          pagination: limit,
          filter: filter
        }}:{
        page: actualPage,
        pagination: limit,
        filter: filter
      };
      api && api.setToken(Cookies.get(process.env.TOKEN_KEY));
      const _api = api || Comet;
      const res = await _api.call(path, {...params}, { method: 'POST' });
      if (res) {
        if (field){
          const isArray = Array.isArray(res[field]);
          if(isArray) setList(res[field]);
          else {
            const data = res.data;
            const isArrayData = Array.isArray(data[field]);
            setList(isArrayData ? res.data[field] : [])
          }
          setTotal(res?.total || res?.data?.total || 0);
        }else{
          const isArray = Array.isArray(res);
          setList(isArray? res : []);
          setTotal(res?.length || 0);
        }
      }
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };

  const onFilterSubmit = (values) => {
    setActualPage(1);
    setFilter(values);
  };

  const onPageChange = (pageIndex) => {
    setActualPage(pageIndex?.selected + 1 || 1);
  };

  return [
    {limit,page:actualPage,list,loading:gql?.loading || loading || initialLoading},//object to dataTable component
    {total,limit,onPageChange,loading:gql?.loading || gqlCount?.loading || initialLoading},//object to Paginate component
    {filter, loading:gql?.loading || loading || initialLoading, onFilterSubmit, initialValues},//object to Filter component
    {refreshList:listItems,setDataTableLoading:setLoading,page:actualPage}, //utils
    gql?.error || error, //error
  ]
};
