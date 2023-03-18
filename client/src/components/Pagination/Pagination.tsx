import {useState, FC, useEffect, SetStateAction} from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Pet } from '../../redux/types';


type Props = {
  filteredPets: Pet[], 
  setCurrentPets: React.Dispatch<React.SetStateAction<Pet[]>>
 }

 const PaginationControlled: FC<Props> = ({filteredPets, setCurrentPets}) => {
 
   
   const [page, setPage] = useState(1);
   const PerPage = 4; //cuantas cartas quiero por pagina
   const indexOfLast = page * PerPage
   const indexOfFirst = indexOfLast - PerPage
   const currentPets = filteredPets.slice(indexOfFirst, indexOfLast)
   const count = Math.ceil(filteredPets.length/PerPage)
   
  useEffect(()=>{
    setCurrentPets(currentPets)
  }, [page, setCurrentPets, filteredPets])

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
  setPage(value);
  };
  
  return (
  <Stack spacing={2}>
    <Typography>Page: {page}</Typography>
    <Pagination count={count} page={page} onChange={handleChange}  />
  </Stack>
  );

 } 

 export default PaginationControlled;