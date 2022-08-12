import React from 'react';
import loading from "../../img/loading.gif"
import style from  "./Loading.module.css"

export default function Loading() {
  return (
    <div className={style.contenedorLoading}>
        <img src={loading} alt="loading" />
    </div>
  )
}