import React from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

function Home(props) {
    return (
        <Fragment>
            <link rel='stylesheet' href='/assets/styles/home/home.css' />
            <section id='Home'>
                <div className='content'>
                    <h2>با یک کلیک پروژه‌ای که می‌خوای رو تحویل بگیر</h2>
                    <form className='search-box'>
                        <input type='text' placeholder='جستجو در میان هزاران پروژه...' />
                        <button>
                            <img src='./assets/images/icons/search-24px.svg' alt='search' />
                        </button>
                    </form>
                    <ul className='popular'>
                        <li>محبوب:</li>
                        <li>
                            <h3>برنامه نویسی</h3>
                        </li>
                        <li>
                            <h3>طراحی لوگو</h3>
                        </li>
                        <li>
                            <h3>ترجمه</h3>
                        </li>
                    </ul>
                    <a className='next-section' href='#Categories'>
                        <img src='/assets/images/icons/fa-angle-down-light.svg' alt='angle' />
                    </a>
                </div>
            </section>
            <section id='Categories' className='container'>
                <h1>خدمات حرفه‌ای محبوب</h1>
                <div className='cat-list'>
                    <a href='#' className='cat-card'>
                        <img className='bg' src='/assets/images/computer.jpg' alt='' />
                        <h2>برنامه‌نویسی</h2>
                        <img className='icon' src='/assets/images/icons/fa-angle-down-light.svg' alt='' />
                    </a>
                    <a href='#' className='cat-card'>
                        <img className='bg' src='/assets/images/designer.webp' alt='' />
                        <h2>طراحی</h2>
                        <img className='icon' src='/assets/images/icons/fa-angle-down-light.svg' alt='' />
                    </a>
                    <a href='#' className='cat-card'>
                        <img className='bg' src='/assets/images/translator.webp' alt='' />
                        <h2>ترجمه</h2>
                        <img className='icon' src='/assets/images/icons/fa-angle-down-light.svg' alt='' />
                    </a>
                </div>
            </section>
            <section id='UserType' className='container'>
                <h1>همین حالا ملحق شوید</h1>
                <div className='grid'>
                    <div className='card'>
                        <img src='/assets/images/icons/document.svg' alt='' />
                        <h2>کارجو هستم</h2>
                        <p>من می‌خوام فلان کنم بهمان کنم، میخوام فلان کنم بهمان کنم میخوام</p>
                        <Link to='/login'>پروژه می‌خوام</Link>
                    </div>
                    <div className='card'>
                        <img src='/assets/images/icons/briefcase.svg' alt='' />
                        <h2>کارفرما هستم</h2>
                        <p>من می‌خوام فلان کنم بهمان کنم، میخوام فلان کنم بهمان کنم میخوام</p>
                        <Link to='/login'>پروژه می‌خوام</Link>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}

export default Home;
