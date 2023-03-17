import { Card } from '../Card/Card'
import { useSelector, useDispatch } from 'react-redux'
import { StateType } from '../../redux/reducer/reducer'
import { Pet } from '../../redux/types'
import { useEffect } from 'react'
import { getPets } from '../../redux/actions/actions'
import { AnyAction } from 'redux'


export const Cards = () => {
  const { selectedCategory, allPets } = useSelector((state: StateType) => state)

  // Filtramos los animales según la categoría seleccionada
  const filteredPets = allPets.filter((pet: Pet) => pet.type === selectedCategory)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPets() as unknown as AnyAction)
  }, [])

  // Mostramos las tarjetas filtradas en el componente
  return (
    <div>
      {filteredPets.map((pet: Pet) => (
        <Card key={pet.id} pet={pet} />
      ))}
    </div>
  )
}

