import React from "react";
import styles from './Paginator.module.css'

type propsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (p: number) => void
}

export let Paginator = ({totalUsersCount, pageSize, onPageChanged, currentPage}: propsType) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages = [];
    for (let i = 1; i < pagesCount; i++) {
        pages.push(i);
    }

    return <div>
        {pages.map(p => <span className={currentPage === p ? styles.selectedPage : ''} onClick={(e) => {
            onPageChanged(p)
        }}> {p} </span>)}
    </div>;
}

export default Paginator
