import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Header from './components/ui/Header'
import Search from './components/ui/Search'

import CharacterGrid from './components/charaters/CharacterGrid'
const BASE_URL  ='https://www.breakingbadapi.com/api/'
export default function App() {
  const [items,setItems] =useState([])
  const [isLoading,setIsLoading] = useState(true)
  const [query,setQuery] = useState('')

  useEffect(() => {
    setIsLoading(true)
    const fetchItems = async () => {
      const result = await axios(`${BASE_URL}characters?name=${query}`)
      console.log(result.data)
      setItems(result.data)
      setIsLoading(false)
    }
    fetchItems()
  },[query])

  return (
    <div className="container">
      <Header />
      <Search getQUery={(q) => {
        setQuery(q)
      }}/>
      <CharacterGrid isLoading={isLoading} items={items}/>
    </div>
  )
}
