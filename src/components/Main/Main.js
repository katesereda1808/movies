  import React, { useEffect, useState } from 'react';
  import s from './Main.module.css';
  import { Modal } from '../Modal/Modal';
  import { Movie } from '../Movie/Movie';
  import { Pagination } from '../Pagination/Pagination';

  

const Main =()=> {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [chosenMovie, setChosenMovie] = useState({});
    const [pressed, setPressed] = useState(false);
    const [pagesQuantity, setpagesQuantity] = useState(0);


    function handleClick(image, title, url, id, year, rating){
      if(!pressed){
        setPressed(true);
        setChosenMovie({image, title, url, id, year, rating})
      } else {
        setPressed(false)
      }
    }
    const min_rating = 8.5;
    const itemsPerPage = 10;

    const goTo = (num) => {
      console.log(num);
      setCurrentPage(num);
      return 'clicked'

    }
    const goBack = (currentPage) => {
      setCurrentPage(currentPage-1)
    }
    const goNext = (currentPage) => {
      setCurrentPage(currentPage+1)
    }


    useEffect(()=>{
                setLoading(true);
                fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=${min_rating}&limit=${itemsPerPage}&page=${currentPage}`)
                .then(resp=>{
                    if(resp.ok){
                        return resp.json();
                    }else{
                      // console.log('if no resp'+' '+ resp)
                      setMovies(false);
                    }
                })
                .then(data=>{
                    if(data){
                      // data.data.movies - список фильмов
                      let listOfMovies = data.data.movies;
                      
                        // если данные с сервера пришли
                        if(listOfMovies.length>0){
                          console.log(data)
                        // setMovieCount()
                        setMovies(listOfMovies);
                        const numberOfPages = Math.ceil(data.data.movie_count / itemsPerPage);
                        setpagesQuantity(numberOfPages);
                        }else{
                          // console.log('if theres no data'+' '+ data)
                          setMovies(false);
                          // props data
                        }
                    }
                    setLoading(false);
                })
                .catch((error)=>{
                    console.log('Error: '+ error);
                })
                
    }, [currentPage])
    
      if(loading){
        return <h2>loading...</h2>
      } else {
        return(
          <>
          <Pagination pagesQuantity={pagesQuantity}
           goTo={goTo}
           goBack={()=>goBack(currentPage)}
           goNext={()=>goNext(currentPage)}
           currentPage={currentPage}
           />
          <div className={s.container}>
              {/* если данные с сервера пришли */}
              {movies?
              <>
              
              {movies.map(movieItem=>(
                  <Movie 
                  urlToImage={movieItem.medium_cover_image} title={movieItem.title} url={movieItem.url} 
                  key={movieItem.id}
                  id={movieItem.id}
                  year={movieItem.year}
                  rating={movieItem.rating}
                  description_full={movieItem.description_full}
                  onClick={()=>handleClick(movieItem.medium_cover_image, movieItem.title, movieItem.url, movieItem.id, movieItem.year, movieItem.rating, movieItem.description_full)}
                  />
              ))}
              </>
              :
              <>
              <div className={s.not_found}> По запросу ничего не найдено</div>
              </>
              }
              {pressed?
              <Modal closeBtn={handleClick} urlToImage={chosenMovie.image} title={chosenMovie.title} rating={chosenMovie.rating} year={chosenMovie.year} url={chosenMovie.url} id={chosenMovie.id} description_full={chosenMovie.description_full}/>
              :
              <></>}
          </div>
          </>
      )}
}
   
  export {Main};