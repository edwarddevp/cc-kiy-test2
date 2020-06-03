import React from 'react'
import ReactPaginate from "react-paginate";
import {Skeleton} from "@chakra-ui/core";
import PropTypes from 'prop-types'
import {PaginateStyles} from "./styles";

export const Paginate = ({ total, limit, onPageChange, loading }) =>
  <Skeleton isLoaded={!loading} d="grid" w='250px' justifyContent='end'>
    {
      (loading || total > 0) &&
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={Math.ceil(total / limit)}
        marginPagesDisplayed={1}
        pageRangeDisplayed={1}
        onPageChange={onPageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    }
    <PaginateStyles/>
  </Skeleton>;

Paginate.propTypes = {
  total:PropTypes.number,
  limit:PropTypes.number,
  onPageChange:PropTypes.func,
  loading:PropTypes.bool
};
