import s from './Modal.module.css';
import Comments from '../Comments/Comments';

const Modal =({title, urlToImage, url, id, year, rating, description_full, closeBtn})=> {
console.log(description_full)
    return(
        <div className={s.modalWindow} >
            <div className={s.container}>
                <button className={s.close_btn} onClick={closeBtn}>
                    x
                </button>
                <div className={s.movie_info}>
                    <img className={s.img} src={urlToImage}>
                    </img>
                    <div className={s.movie_info_text}>
                        <a className={s.title} href={url} target="_blank">
                            <div>
                            {title}
                            </div>
                        </a>
                        <div className={s.rating}>
                            Rating: {rating}
                        </div>
                        <div className={s.year}>
                            {year}
                        </div>
                        <div className={s.description}>
                            {description_full}
                        </div>

                    </div>
                    
                </div>

                <div className={s.movie_comments}>
                        <Comments movieId={id}/>
                </div>
            
                
            </div>
        </div>
    )
}
export {Modal};
