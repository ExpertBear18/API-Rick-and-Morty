import { useEffect, useRef, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import LocationCard from './components/LocationCard';
import ResidentCard from './components/ResidentCard';
import Pagination from './components/Pagination';

function App() {

  const [finder, setFinder] = useState(Math.floor(Math.random() * 126 + 1));
  const [location, getLocation, isLoading, hasError] = useFetch();

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${finder}`
    getLocation(url)
  }, [finder])

  const textInput = useRef()

  const handleSubmit = event => {
    event.preventDefault();
    setFinder(textInput.current.value.trim())
  }

  const quantity = 8
  const second = currentPage * quantity;
  const first = second - quantity
  const residentsPart = location && location.residents.slice(first, second);
  const totalPages = location && Math.floor(location.residents.length / quantity) + 1

  return (
    <div className='app'>
      {
        isLoading ?
        <figure>
          <img src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/c50a4a55883023.5996f8afa3f5c.gif" alt="" />
        </figure>
        :
        <div className='app__container'>
          <div>
            <img className='app__banner' src="https://i.redd.it/o6cwlzg3exk41.png" alt="banner" />
          </div>
          <form
            onSubmit={handleSubmit}
            className='app__form'
            >
            <input
              className='app__input'
              type="number"
              ref={textInput}
              placeholder='Type a number (1 to 126)'
            />
            <button className='app__btn'>Search</button>
          </form>
          {
            hasError || finder==='0' ?
              <h2 className='app__error'>❌ This location does not exist ❌</h2>
            :
            <>
              <LocationCard
                location={location}
              />
              <div className='app__resident'>
              {
                residentsPart.map(resident => (
                  <ResidentCard
                    key={resident}
                    url={resident}
                  />
                ))
              }
              </div>
              < Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            </>
          }
        </div>
      }
    </div>
  )
}

export default App
