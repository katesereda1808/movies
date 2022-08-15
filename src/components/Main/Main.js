  import React, { useEffect, useState } from 'react';
  import s from './Main.module.css';
  import { Modal } from '../Modal/Modal';
  import { Movie } from '../Movie/Movie';
  import { Pagination } from '../Pagination/Pagination';

  

const Main =()=> {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [chosenMovie, setChosenMovie] = useState({});
    const [pressed, setPressed] = useState(false);



    function handleClick(image, title, url, id, year, rating){
      if(!pressed){
        setPressed(true);
        setChosenMovie({image, title, url, id, year, rating})
      } else {
        setPressed(false)
      }
    }

    useEffect(()=>{
                setLoading(true);
                fetch(`https://yts.mx/api/v2/list_movies.json?quality=3D`)
                .then(resp=>{
                    if(resp.ok){
                        return resp.json();
                    }else{
                      setMovies(false);
                    }
                })
                .then(data=>{
                    if(data){
                      // data.data.movies - список фильмов
                      let listOfMovies = data.data.movies;
                        // если данные с сервера пришли
                        if(listOfMovies.length>0){
                        setMovies(listOfMovies);
                        }else{
                          setMovies(false);
                        }
                    }
                    setLoading(false);
                })
                .catch((error)=>{
                    console.log('Error: '+ error);
                })
                
        // })
    }, [])

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = movies.slice(firstItemIndex, lastItemIndex)

    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber)
    }
    
      if(loading){
        return <h2>loading</h2>
      } else {
        return(
          <>
          <Pagination itemsPerPage={itemsPerPage} totalItems={movies.length} paginate={paginate}/>
          <div className={s.container}>
              {/* если данные с сервера пришли */}
              {movies?
              <>
              
              {currentItems.map(movieItem=>(
                  <Movie 
                  urlToImage={movieItem.medium_cover_image} title={movieItem.title} url={movieItem.url} key={movieItem.id}
                  year={movieItem.year}
                  rating={movieItem.rating}
                  onClick={()=>handleClick(movieItem.medium_cover_image, movieItem.title, movieItem.url, movieItem.id, movieItem.year, movieItem.rating)}
                  />
              ))}
              </>
              :
              <>
              <div className={s.not_found}> По запросу ничего не найдено</div>
              </>
              }
              {pressed?
              <Modal closeBtn={handleClick} urlToImage={chosenMovie.image} title={chosenMovie.title} rating={chosenMovie.rating} year={chosenMovie.year} url={chosenMovie.url}/>
              :
              <></>}
          </div>
          </>
      )}
}
   
  export {Main};