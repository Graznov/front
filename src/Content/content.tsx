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

    // const dispatch = useAppDispatch()
    // const movies = useAppSelector(state => state.defSlice.movies)

    const [movies, setMovies] = useState([])

    function updMovies(){
        console.log('updMovies()')
        fetch("http://localhost:3000/movies")
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(error => console.error('Fetch error:', error));
    }

    useEffect(() => {
        updMovies()
        console.log('EFFECT')
    }, []);

    const [postFormVisible, setPostFormVisible] = useState(false);

    const POST = {
        // _id:0,
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

    const [changeMovie, setChangeMovie] = useState(POST)

    const [postForm, setPostForm] = useState(POST)
    const [changeFormVisible, setChangeFormVisible] = useState(false);

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

                                // const value = event.target.value

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
                                        hours: +event.target.value,
                                        minutes: 0
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
                        onClick={async ()=>{
                            console.log(postForm)
                            await fetch(`http://localhost:3000/movies/`, {
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

            <div className={cx('changeForm', {'changeFormVisible': changeFormVisible})}>
                <div>{changeMovie._id}</div>
                <div className={cx('container_vallue')}>
                    <div className={cx('container_vallue_title')}>Название:</div>
                    <input
                        onChange={(event) => {
                            setChangeMovie({
                                ...changeMovie,
                                title: event.target.value
                            })
                        }}
                        value={changeMovie.title}
                        type="text"/>
                </div>
                <div className={cx('container_vallue')}>
                    <div className={cx('container_vallue_title')}>Режиссер:</div>
                    <input
                        onChange={(event) => {
                            setChangeMovie({
                                ...changeMovie,
                                director: event.target.value
                            })
                        }}
                        value={changeMovie.director}
                        type="text"/></div>
                <div className={cx('container_vallue')}>
                    <div className={cx('container_vallue_title')}>Год:</div>
                    <input
                        onChange={(event) => {

                            // const value = event.target.value

                            setChangeMovie({
                                ...changeMovie,
                                year: +event.target.value
                            })
                        }}
                        value={changeMovie.year}
                        type="text"/></div>

                <div className={cx('container_vallue')}>
                    <div className={cx('container_vallue_title')}>Жанр:</div>
                    <input
                        onChange={(event) => {
                            setChangeMovie({
                                ...changeMovie,
                                genres: [event.target.value]
                            })
                        }}
                        value={changeMovie.genres}
                        type="text"/></div>

                <div className={cx('container_vallue_title')}>Продолжительность:</div>
                <div>hours:</div>
                <input
                    onChange={(event) => {
                        setChangeMovie({
                            ...changeMovie,
                            duration: {
                                hours: +event.target.value,
                                minutes: changeMovie.duration.minutes
                            }
                        })

                    }}
                    value={changeMovie.duration.hours}
                    type="text"/>

                <div>minutes:</div>
                <input
                    onChange={(event) => {
                        setChangeMovie({
                            ...changeMovie,
                            duration: {
                                hours: changeMovie.duration.hours,
                                minutes: +event.target.value
                            }
                        })
                    }}
                    value={changeMovie.duration.minutes}
                    type="text"/>

                <button
                    onClick={async () => {
                        await fetch(`http://localhost:3000/movies/${changeMovie._id}`, {
                            method: 'PATCH', // Указываем метод запроса
                            headers: {
                                'Content-Type': 'application/json' // Устанавливаем заголовок Content-Type для указания типа данных
                            },
                            body: JSON.stringify(changeMovie)
                        })
                        updMovies()
                        setPostForm(POST)
                        setChangeFormVisible(!changeFormVisible);
                    }}
                >Сохранить изменения
                </button>


            </div>


            <div className={cx('content')}>

                {
                    movies.map((item: IProps) => (
                        <Container
                            _id={item._id}
                            key={item._id}
                            title={item.title}
                            director={item.director}
                            year={item.year}
                            genres={item.genres}
                            hours={item.duration.hours}
                            minutes={item.duration.minutes}
                            AddMovie={() => {
                                console.log(item._id)
                                console.log(movies.length)
                                if (movies.length !== 1) {
                                        fetch(`http://localhost:3000/movies/${item._id}`)
                                            .then(response => response.json())
                                            // .then(data => dispatch(addMovie([data])))
                                            .then(data => setMovies([data]))
                                            .catch(error => console.error('Fetch error:', error));
                                    } else {
                                        fetch("http://localhost:3000/movies")
                                            .then(response => response.json())
                                            // .then(data => dispatch(addMovie(data)))
                                            .then(data => setMovies(data))
                                            .catch(error => console.error('Fetch error:', error));

                                    }
                            }}
                            DelMovie={async () => {
                               await fetch(`http://localhost:3000/movies/${item._id}`, {
                                    method: 'DELETE', // Указываем метод запроса
                                    headers: {
                                        'Content-Type': 'application/json' // Устанавливаем заголовок Content-Type для указания типа данных
                                    },
                                })
                                updMovies()
                                console.log(movies)
                            }}
                            PatchMovie={async ()=>{
                                setChangeFormVisible(!changeFormVisible);
                                await setChangeMovie(item)
                                console.log(`push PUTCH\nid: ${item._id}\ntitle: ${item.title}\nchangeFormVisible: ${changeFormVisible}`);
                                console.log(changeMovie)
                            }}
                        />
                    ))
                }
            </div>
        </>

    )
};

export default Content;