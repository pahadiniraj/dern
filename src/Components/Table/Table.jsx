import React from 'react'

const Table = ({children}) => {
  return (
    <table class="w-full bg-white  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
     {children}

  </table>
  )
}

export default Table