import classNames from "classnames/bind";
import styles from './content.module.css'
import Container from "../Container/Container.tsx";
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {useEffect} from "react";
import {addMovie} from "../store/defSlice.ts";

const cx = classNames.bind(styles);

interface IProps {
    _id:string,
    onClick?: () => void;
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

        fetch("http://localhost:3000/movies")
            .then(response => response.json())
            .then(data => dispatch(addMovie(data)))

    }, []);

    // const clickCaerd = (i) =>{
    //     console.log(i)
    //     console.log('111')
    // }

    const movies = useAppSelector(state => state.defSlice.movies)


    return (
        <div className={cx('content')}>
            {
                movies.map((item:IProps) => (
                    <Container
                        onClick={()=> {
                            console.log(item._id)
                            console.log(movies.length)
                            if(movies.length!==1){
                                fetch(`http://localhost:3000/movies/${item._id}`)
                                    .then(response => response.json())
                                    .then(data => dispatch(addMovie([data])))
                            } else {
                                fetch("http://localhost:3000/movies")
                                    .then(response => response.json())
                                    .then(data => dispatch(addMovie(data)))
                            }
                        }}
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