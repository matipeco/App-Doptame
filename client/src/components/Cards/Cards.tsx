import { Card } from '../Card/Card'
import { useSelector, useDispatch } from 'react-redux'
import { StateType } from '../../redux/reducer/reducer'
import { Pet } from '../../redux/types'
import { useEffect, useState } from 'react'
import { getPets } from '../../redux/actions/actions'
import { AnyAction } from 'redux'
import { useParams } from 'react-router-dom'
import PaginationControlled from '../Pagination/PaginationTry'

export const Cards = () => {
  const { allPets } = useSelector((state: StateType) => state)
  const { category } = useParams()

  // Filtramos los animales según la categoría seleccionada
  const filteredPets = allPets.filter((pet: Pet) => pet.type === category)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPets() as unknown as AnyAction)
  }, [])

  // Definimos el número de elementos que deseamos mostrar por página
  const itemsPerPage = 5

  // Calculamos el número total de elementos y el número de páginas necesarias
  const totalItems = filteredPets.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  // Mantenemos un array con los elementos a mostrar en la página actual
  const [currentItems, setCurrentItems] = useState<Pet[]>([])

  // Actualizamos los elementos a mostrar cada vez que cambia la página
  const handlePageChange = (pageNumber: number) => {
    const startIndex = (pageNumber - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    setCurrentItems(filteredPets.slice(startIndex, endIndex))
  }

  // Mostramos las tarjetas filtradas en el componente, paginadas
  return (
    <>
      <div>
        {currentItems.map((pet: Pet) => (
          <Card key={pet._id} pet={pet} />
        ))}
      </div>
      <PaginationControlled
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </>
  )
}