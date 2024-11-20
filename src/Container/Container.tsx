import styles from './container.module.css'
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface IProps {
    _id:string,
    onClick?: () => void;
    title:string,
    director:string,
    year:number,
    genres: Array<string>,
    hours:number,
    minutes:number,
    AddMovie?:()=>void,
    DelMovie?:()=>void,
    PatchMovie:()=>void
}

const Container = ({_id, title, director, year, genres, hours, minutes, onClick, AddMovie, DelMovie, PatchMovie}:IProps) =>{

    return(
        <div onClick={onClick} className={cx('container')}>
            <div>{_id}</div>

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

            <button onClick={AddMovie}>Выбрать</button>
            <button onClick={DelMovie}>Удалить</button>
            <button onClick={PatchMovie}>Редактировать</button>

        </div>
    )
}

export default Container;