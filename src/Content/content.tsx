import classNames from "classnames/bind";
import styles from './content.module.css'
import Container from "../Container/Container.tsx";
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {useEffect} from "react";
import {addMovie} from "../store/defSlice.ts";
import arr from "../storage.ts";

const cx = classNames.bind(styles);

async function componentDidMount() {
    fetch("http://localhost:3000/movies")
        .then(response => response.json())
        .then(data => console.log(data))
}
componentDidMount()

interface IProps {
    _id:string,
    title:string,
    director:string,
    year:number,
    genres: Array<string>,
    duration:{
        hours:number,
        minutes:number
    }

}


const Content = () =>{

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(addMovie(arr))
    }, []);

    const movies = useAppSelector(state => state.defSlice.movies)

    // console.log(movies)


    return (
        <div className={cx('content')}>
            {
                movies.map((item:IProps) => (
                    <Container
                        key={item._id}
                        title={item.title}
                        director={item.director}
                        year={item.year}
                        genres={item.genres}
                        hours={item.duration.hours}
                        minutes={item.duration.minutes}
                    />
                ))
            }
        </div>
    )
};

export default Content;