import classNames from "classnames/bind";
import styles from './content.module.css'
import Container from "../Container/Container.tsx";
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {useEffect, useState} from "react";
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

    function updMovies(){
        fetch("http://localhost:3000/movies")
            .then(response => response.json())
            .then(data => dispatch(addMovie(data)))
    }
    const movies = useAppSelector(state => state.defSlice.movies)
    useEffect(() => {
        updMovies()
    }, [movies]);

    // const clickCaerd = (i) =>{
    //     console.log(i)
    //     console.log('111')
    // }



// Предполагаем, что у вас есть данные из формы, которые нужно передать на бэкенд
    const formData =     {
            "duration": {
                "hours": 7,
                "minutes": 77
            },
            // "_id": "672cdc2524925866f5rHghb0566a",
            "title": "TEST TEST TEST TEST TEST TEST",
            "director": "TEST TEST TEST TEST TEST TEST",
            "year": 7777,
            "genres": [
                "TEST",
                "TEST",
                "TEST",
                "TEST"
            ],
        }

        function moviePOST(mov){

            fetch('http://localhost:3000/movies', {
                method: 'POST', // Указываем метод запроса
                headers: {
                    'Content-Type': 'application/json' // Устанавливаем заголовок Content-Type для указания типа данных
                },
                body: JSON.stringify(mov) // Преобразуем данные в формат JSON и передаем в теле запроса
            })
        }



// moviePOST(formData)

    const [postFormVisible, setPostFormVisible] = useState(false);

    const POST = {
        duration: {
            hours: 0,
            minutes: 0
        },
        title: "",
        director: "",
        year: 0,
        genres: [
            ''
        ],
        rating: 0,
    }

    const [postForm, setPostForm] = useState(POST)




    return (

        <>
            <div>
                <button
                    className={cx('btnPlus')}
                    onClick={()=>{
                        setPostFormVisible(!postFormVisible);
                        console.log(`push plus\n${postFormVisible}`)
                    }}>+</button>
                <div className={cx('postForm', {'postForm_visible': postFormVisible})}>

                    <div className={cx('container_vallue')}>
                        <div className={cx('container_vallue_title')}>Название:</div>
                        <input
                            onChange={(event)=>{
                                setPostForm({
                                    ...postForm,
                                    title: event.target.value
                                })
                            }}
                            value={postForm.title}
                            type="text"/>
                    </div>

                    <div className={cx('container_vallue')}>
                        <div className={cx('container_vallue_title')}>Режиссер:</div>
                        <input
                            onChange={(event)=>{
                                setPostForm({
                                    ...postForm,
                                    director: event.target.value
                                })
                            }}
                            value={postForm.director}
                            type="text"/></div>

                    <div className={cx('container_vallue')}>
                        <div className={cx('container_vallue_title')}>Год:</div>
                        <input
                            onChange={(event)=>{

                                const value = event.target.value

                                setPostForm({
                                    ...postForm,
                                    year: +event.target.value
                                })
                            }}
                            value={postForm.year}
                            type="text"/></div>

                    <div className={cx('container_vallue')}>
                        <div className={cx('container_vallue_title')}>Жанр:</div>
                        <input
                            onChange={(event)=>{
                                setPostForm({
                                    ...postForm,
                                    genres: [event.target.value]
                                })
                            }}
                            value={postForm.genres}
                            type="text"/></div>

                    <div className={cx('container_vallue')}>
                        <div className={cx('container_vallue_title')}>Продолжительность:</div>
                        <div>hours:</div>
                        <input
                            onChange={(event)=>{
                                setPostForm({
                                    ...postForm,
                                    duration: {
                                        hours: +event.target.value
                                    }
                                })

                            }}
                            value={postForm.duration.hours}
                            type="text"/>
                        <div>minutes:</div>
                        <input
                            onChange={(event)=>{
                                setPostForm({
                                    ...postForm,
                                    duration: {
                                        hours: postForm.duration.hours,
                                        minutes: +event.target.value
                                    }
                                })
                            }}
                            value={postForm.duration.minutes}
                            type="text"/>
                    </div>
                    <button
                        onClick={()=>{
                            fetch(`http://localhost:3000/movies/`, {
                                method: 'POST', // Указываем метод запроса
                                headers: {
                                    'Content-Type': 'application/json' // Устанавливаем заголовок Content-Type для указания типа данных
                                },
                                body: JSON.stringify(postForm)
                            })
                            updMovies()
                            setPostForm(POST)
                            setPostFormVisible(!postFormVisible);
                        }}
                    >Добавить запись</button>
                </div>
            </div>

            <div className={cx('content')}>

                {
                    movies.map((item: IProps) => (
                        <Container
                            onClick={() => {
                                console.log(item._id)
                                console.log(movies.length)
                                if (movies.length !== 1) {
                                    // fetch(`http://localhost:3000/movies/${item._id}`)
                                    //     .then(response => response.json())
                                    //     .then(data => dispatch(addMovie([data])))
                                } else {
                                    // fetch("http://localhost:3000/movies")
                                    //     .then(response => response.json())
                                    //     .then(data => dispatch(addMovie(data)))
                                }
                            }}
                            _id={item._id}
                            key={item._id}
                            title={item.title}
                            director={item.director}
                            year={item.year}
                            genres={item.genres}
                            hours={item.duration.hours}
                            minutes={item.duration.minutes}
                            addMomie={() => {
                                fetch(`http://localhost:3000/movies/${item._id}`)
                                    .then(response => response.json())
                                    .then(data => dispatch(addMovie([data])))
                                updMovies()
                            }}
                            DelMovie={() => {
                                fetch(`http://localhost:3000/movies/${item._id}`, {
                                    method: 'DELETE', // Указываем метод запроса
                                    headers: {
                                        'Content-Type': 'application/json' // Устанавливаем заголовок Content-Type для указания типа данных
                                    },
                                })
                                updMovies()
                            }}
                        />
                    ))
                }
            </div>
        </>

    )
};

export default Content;