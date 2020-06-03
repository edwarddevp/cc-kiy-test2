import React from 'react'
{ /*language=CSS*/}
export const PaginateStyles = () =><style jsx global>{`
  .pagination {
          display: flex !important;
          padding: 0 !important;
          list-style: none !important;
        }

        .pagination li {
          min-width: 2.5rem;
          text-align: center;
          -webkit-transition: all 250ms;
          transition: all 250ms;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          height: 2.5rem;
          display: grid;
          align-items: center;
          /*background-color: #fff;*/
        }

        .pagination li a:focus {
          outline: none;
        }

        .pagination li.active {
          background-color: #EDF2F7;
          padding: 0 10px;
          border-radius: 0.25rem;
          font-weight: 600;
          font-size: 1rem;
        }

        .pagination li.active:hover {
          background-color: #E2E8F0;
        }

        .pagination li.previous, li.next {
          /*background-color: #fff;*/
          color: #767676;
          font-size: 20px;
          font-weight: bold;
        }

`}</style>

