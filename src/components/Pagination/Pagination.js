import React from "react";
import s from "./Pagination.module.css";

const Pagination = ({pagesQuantity, goTo, goBack, goNext, currentPage}) => {
    const pageNumbers = [];
    for (let i = 1; i <= pagesQuantity; i++) {
        pageNumbers.push(i)
    }

    return (
        <div className={s.pagination}>
            <button className={s.button} onClick={()=>goBack()}>back</button>
            <ul className={s.pages}>
                {
                    pageNumbers.map(num => (
                        <li key={num}
                        className={currentPage === num ? s.page_active : undefined}
                        onClick={()=>goTo(num)}
                        >
                            {num}
                        </li>
                    ))
                }
            </ul>
            <button className={s.button} onClick={()=>goNext()}>next</button>
        </div>
    )
        
    
}
export {Pagination};