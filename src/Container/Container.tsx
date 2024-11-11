import styles from './container.module.css'
import classNames from "classnames/bind";


const cx = classNames.bind(styles);

interface IProps {
    // _id:string,
    title:string,
    director:string,
    year:number,
    genres: Array<string>,
    hours:number,
    minutes:number
}


const Container = ({title, director, year, genres, hours, minutes}:IProps) =>{


    return(
        <div className={cx('container')}>

            <div className={cx('container_vallue')}>
                <div className={cx('container_vallue_title')}>Название:</div>
                <div>{title}</div>
            </div>

            <div className={cx('container_vallue')}>
                <div className={cx('container_vallue_title')}>Режиссер:</div>
                <div>{director}</div>
            </div>

            <div className={cx('container_vallue')}>
                <div className={cx('container_vallue_title')}>Год:</div>
                <div>{year}</div>
            </div>

            <div className={cx('container_vallue')}>
                <div className={cx('container_vallue_title')}>Жанр:</div>
                <div>{genres.join(', ')}</div>
            </div>

            <div className={cx('container_vallue')}>
                <div className={cx('container_vallue_title')}>Продолжительность:</div>
                <div>{hours} ч., {minutes} м.</div>
            </div>

        </div>
    )
}

export default Container;