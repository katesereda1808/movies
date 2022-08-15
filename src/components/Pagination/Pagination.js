import React from "react";
import s from "./Pagination.module.css";

const Pagination = ({itemsPerPage, totalItems, paginate}) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems/itemsPerPage); i++) {
        pageNumbers.push(i)
        
    }
    return (
        <div className={s.pagination}>
            <button className={s.button}>back</button>
            <ul className={s.pages}>
                {
                    pageNumbers.map(num => (
                        <li key={num} onClick={()=>paginate(num)}>
                            {num}
                        </li>
                    ))
                }
            </ul>
            <button className={s.button} >next</button>
        </div>
    )
        
    
}
export {Pagination};