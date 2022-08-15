import s from './Movie.module.css';
const Movie =({title, urlToImage, url, year, rating, onClick})=> {

    return(
        <div className={s.movieItem} onClick={onClick}>
            
            <img className={s.movieItem__img} src={urlToImage}>
            </img>
            {/* <a href={url}> */}
                <div className={`${s.movieItem__title} ${s.movieItem__info}`}>
                {title}
                </div>
            {/* </a> */}
            <div className={`${s.movieItem__rating} ${s.movieItem__info}`}>
                {rating}
            </div>
            <div className={`${s.movieItem__year} ${s.movieItem__info}`}>
                {year}
            </div>
        </div>
    )
}
export {Movie};
