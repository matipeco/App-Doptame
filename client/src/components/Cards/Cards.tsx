import { Card } from '../Card/Card'
import { useSelector, useDispatch } from 'react-redux'
import { StateType } from '../../redux/reducer/reducer'
import { Pet } from '../../redux/types'
import { useEffect, useState } from 'react'
import { getPets } from '../../redux/actions/actions'
import { AnyAction } from 'redux'
import { useParams } from 'react-router-dom'
import PaginationControlled from '../Pagination/PaginationTry'

export const Cards= () => {
  const { allPets } = useSelector((state: StateType) => state);
  const { category } = useParams();

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1); // Agregamos estado para currentPage

  const PageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber); // Actualizamos el estado de currentPage al seleccionar una página
  };

  useEffect(() => {
    dispatch(getPets() as unknown as AnyAction)
  }, [dispatch])

  
  const filteredPets = allPets.filter((pet: Pet) => pet.type === category);
  const itemsPerPage = 5;
  const totalItems = filteredPets.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredPets.slice(startIndex, endIndex);

  console.log(filteredPets)
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
            onPageChange={PageChange}
          />
        </>

  );
};


 //necesitoayuda