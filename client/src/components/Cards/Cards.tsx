import { Card } from '../Card/Card'
import { useSelector, useDispatch } from 'react-redux'
import { StateType } from '../../redux/reducer/reducer'
import { Pet } from '../../redux/types'
import { useEffect } from 'react'
import { getPets } from '../../redux/actions/actions'
import { AnyAction } from 'redux'
import { useParams } from 'react-router-dom'


export const Cards = () => {
  const { allPets } = useSelector((state: StateType) => state)
  const { category } = useParams()
  // Filtramos los animales según la categoría seleccionada
  const filteredPets = allPets.filter((pet: Pet) => pet.type === category)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPets() as unknown as AnyAction)
  }, [])

  // Mostramos las tarjetas filtradas en el componente
  return (
    <div>
      {filteredPets.map((pet: Pet) => (
        <Card key={pet._id} pet={pet} />
      ))}
    </div>
  )
}

