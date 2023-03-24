
import { Card } from '../Card/Card'
import { useSelector, useDispatch } from 'react-redux'
import { StateType } from '../../redux/reducer/reducer'
import { Pet } from '../../redux/types'
import { useEffect, useState } from 'react'
import { getPets, OrderByAge, FilteredBySize,FilterByLocation } from '../../redux/actions/actions'
import { AnyAction } from 'redux'
import { Route, useParams } from 'react-router-dom'
import PaginationControlled from '../Pagination/Pagination'

export const Cards = () => {
  const { allPets, petsFilter } = useSelector((state: StateType) => state);
  console.log(petsFilter)
  const { category } = useParams();

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1); // Agregamos estado para currentPage
  const [orden, setOrden] = useState('');
  const PageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber); // Actualizamos el estado de currentPage al seleccionar una pÃ¡gina
  };

  const HandlerOrderByAge: React.ChangeEventHandler<HTMLSelectElement> = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    e.preventDefault();
    const age = e.target.value;
    dispatch(OrderByAge(age))
    setCurrentPage(1);
    setOrden (`Ordenado ${age}`)
  }


  const HandlerFilteredSize: React.ChangeEventHandler<HTMLSelectElement> = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    e.preventDefault();
    const size = e.target.value;
    dispatch(FilteredBySize(size))
    setCurrentPage(1);
    setOrden (`Ordenado ${e.target.value}`)
  }

  const HandlerFilteredLocation: React.ChangeEventHandler<HTMLSelectElement> = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    e.preventDefault();
    const location = e.target.value;
    dispatch(FilterByLocation(location))
    setCurrentPage(1);
    setOrden (`Ordenado ${e.target.value}`)
  }

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
  



  return (

    <>
    <select value="" onChange={e=>HandlerOrderByAge(e)}>
    <option value="" disabled>(Seleccionar por edad)</option>
    <option value="asc">Menor</option>
    <option value="desc">Mayor</option>
    </select>

    {window.location.pathname !== "/pets/gato" && (
      <select value="" onChange={e => HandlerFilteredSize(e)}>
        <option value="" disabled>(Seleccionar por tamaño)</option>
        <option value="chico">Pequeños</option>
        <option value="mediano">Mediano</option>
        <option value="grande">Grande</option>
      </select>
    )}

    <select onChange={HandlerFilteredLocation}>
      <option value="Parana">Parana</option>
      <option value="Godoy Cruz, Mendoza">Godoy Cruz, Mendoza</option>
      <option value="Cordoba">Cordoba</option>
    </select>
    {/* <label>
              <select
                onChange={HandlerFilteredLocation}
              >
                <option value="" disabled>
                  Filter b/Location
                </option>
                <option value="All">Todas las localidades</option>
                {  petsFilter.map((t) => {
                    return (
                      <option value={t.apa?.location}>
                        {t.apa?.location}
                      </option>
                    );
                  })}
              </select>
      </label>  */}

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

