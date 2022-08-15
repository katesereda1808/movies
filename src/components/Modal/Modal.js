import s from './Modal.module.css';

const Modal =({title, urlToImage, url, year, rating, closeBtn})=> {

    return(
        <div className={s.modalWindow} >
            <div className={s.modalWindow__container}>
                <div className={s.close_btn} onClick={closeBtn}>
                    X
                </div>
            
                <img className="modalWindow__img" src={urlToImage}>
                </img>
                <a href={url}>
                    <div className="modalWindow__title">
                    {title}
                    </div>
                </a>
                <div className="modalWindow__rating">
                    {rating}
                </div>
                <div className="modalWindow__year">
                    {year}
                </div>
            </div>
        </div>
    )
}
export {Modal};
