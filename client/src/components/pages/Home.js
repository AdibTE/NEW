import React from 'react';
import { Fragment } from 'react';

function Home(props) {
    return (
        <Fragment>
            <link rel='stylesheet' href={process.env.PUBLIC_URL + '/assets/styles/home/home.css'} />
            <section id='Home'>
                <div class='content'>
                    <h2>با یک کلیک پروژه‌ای که می‌خوای رو تحویل بگیر</h2>
                    <form class='search-box'>
                        <input type='text' placeholder='جستجو در میان هزاران پروژه...' />
                        <button>
                            <img src={process.env.PUBLIC_URL + './assets/images/icons/search-24px.svg'} />
                        </button>
                    </form>
                    <ul class='popular'>
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
                    <a class='next-section' href='#whatIsNew'>
                        <img src={process.env.PUBLIC_URL + '/assets/images/icons/fa-angle-down-light.svg'} />
                    </a>
                </div>
            </section>
        </Fragment>
    );
}

export default Home;
