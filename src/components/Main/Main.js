  import React, { useEffect, useState } from 'react';
  import s from './Main.module.css';
  import { Modal } from '../Modal/Modal';
  import { Movie } from '../Movie/Movie';
  import store from '../redux/store';

  

const Main =()=> {

    const [movies, setMovies] = useState([]);
    const [chosenMovie, setChosenMovie] = useState({});
    const [pressed, setPressed] = useState(false);
    function handleClick(image, title, url, id, year, rating){
      // console.log(image, title, url, id, year, rating)
      if(!pressed){
        setPressed(true);
        // updateGlobalState(image, title, url, id, year, rating)
        setChosenMovie({image, title, url, id, year, rating})
      } else {
        setPressed(false)
      }
    }
    // function renderChosenMovie(image, title, url, id, year, rating){
    //   setChosenMovie([image, title, url, id, year, rating])

    // }
    function updateGlobalState(image, title, url, id, year, rating){
      console.log(title);
    //   store.dispatch({
    //     type: 'ADD_TO_FAVS',
    //     payload:{
    //         id:imdbID,
    //         title: Title,
    //         year: Year,
    //         poster: Poster,
    //     }
    // })
      
    }
    useEffect(()=>{
        // store.subscribe(()=>{
        //     const globalState=store.getState();
                fetch(`https://yts.mx/api/v2/list_movies.json?quality=3D`)
                .then(resp=>{
                    if(resp.ok){
                      // console.log('no error')
                        return resp.json();
                    }else{
                      setMovies(false);
                      // console.log('error')
                    }
                })
                .then(data=>{
                    if(data){
                      // data.data.movies - список фильмов
                      // console.log(data.data.movies);
                      let listOfMovies = data.data.movies;
                      // console.log(listOfMovies.length>0)
                    
                        if(listOfMovies.length>0){
                        // console.log('data aquired');
                        setMovies(listOfMovies)
                        }else{
                          setMovies(false)
                        }
                        
                    }
                })
                .catch((error)=>{
                    console.log('Error: '+ error);
                })
                
        // })
    }, [])
    // console.log(movies)

    return(
        <>
        <div>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>

        </div>
        <div className={s.container}>
            {movies?
            <>
            {movies.map(movieItem=>(
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
    )
}
   
  export {Main};