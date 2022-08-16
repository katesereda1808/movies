import s from './Modal.module.css';
import Comments from '../Comments/Comments';

const Modal =({title, urlToImage, url, id, year, rating, description_full, closeBtn})=> {

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
                            {id}

                        </div>

                    </div>
                    
                </div>

                <div className={s.movie_comments}>
                    <div className={s.comments_box}>
                        <Comments movieId={id}/>
                        

                    </div>
                    {/* <div className={s.write_comment}>
                       

                    </div> */}

                </div>
            
                
            </div>
        </div>
    )
}
export {Modal};
