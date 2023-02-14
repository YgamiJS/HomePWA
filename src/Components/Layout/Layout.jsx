import { Link, Outlet } from "react-router-dom";
import List from "../List/List.jsx";
import { useState } from "react";
import styled from "./Layout.module.scss";
import { getId } from "../../API/utils";
import NavigationLink from "../UI/NavLink/Link.jsx";
import { v4 as uuidv4 } from "uuid";
import "../../App.scss";

export default function Layout({ posts, setStateDataPost, stateQuestions }) {
    const [isVisible, setIsVisible] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const postsAndQuestions = [posts, stateQuestions];

    const [ArrMatches, setArrMatces] = useState([]);

    const postInfo = (event) => {
        const regexp = new RegExp(event.target.value, "gi");

        setArrMatces(
            postsAndQuestions
                .flat()
                .filter(
                    (post) =>
                        post?.title?.match(regexp) || post?.name?.match(regexp)
                )
        );

        ArrMatches.length && setIsVisible(true);
    };

    const View = () => setIsVisible(false);

    return (
        <>
            <header className={styled.header}>
                <div className={styled.header__container + " _container"}>
                    <nav className={styled.navbar}>
                        <div
                            className={styled.navbar__container + " _container"}
                        >
                            <div
                                className={
                                    isOpen
                                        ? styled.navbar__wrapper +
                                          " " +
                                          styled.list
                                        : styled.navbar__wrapper
                                }
                                onClick={(e) =>
                                    window.matchMedia("(max-width: 767px)")
                                        .matches &&
                                    !e.target.matches("input") &&
                                    setIsOpen(!isOpen)
                                }
                            >
                                <div className={styled.menuBtn}>
                                    <span />
                                </div>
                                <Link className={styled.logo} to="/Home/">
                                    Lite
                                </Link>
                                <ul
                                    className={
                                        isOpen
                                            ? styled.visible +
                                              " " +
                                              styled.listReverse
                                            : styled.menu
                                    }
                                >
                                    <li>
                                        <NavigationLink
                                            link="/Home/"
                                            text="Home"
                                        />
                                    </li>
                                    <li>
                                        <NavigationLink
                                            link="/Home/articles"
                                            text="Articles"
                                        />
                                    </li>
                                    <li>
                                        <NavigationLink
                                            link="/Home/questions-anwers"
                                            text="Questions & Anwers"
                                        />
                                    </li>
                                    <li>
                                        <input onInput={postInfo} type="text" />
                                        <div
                                            className={
                                                isVisible
                                                    ? styled.help__visible
                                                    : styled.help
                                            }
                                            onClick={(event) => {
                                                setStateDataPost(getId(event));
                                                View();
                                            }}
                                        >
                                            <List
                                                items={ArrMatches}
                                                renderList={(post) => (
                                                    <>
                                                        <Link
                                                            id={post.id}
                                                            key={uuidv4}
                                                            to="/Home/currentArticle"
                                                        >
                                                            {post?.title ||
                                                                post?.name}
                                                        </Link>
                                                        <br />
                                                    </>
                                                )}
                                            />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
            <div className={isOpen ? styled.open : styled.popup}></div>
            <main className="main _container" onClick={View}>
                <Outlet />
            </main>
            <footer className={isOpen ? styled.hidden : styled.footer}>
                <div className={styled.footer__container + " _container"}>
                    <nav className={styled.navbar}>
                        <div
                            className={styled.navbar__container + " _container"}
                        >
                            <div
                                className={
                                    styled.navbar__wrapper + " " + styled.list
                                }
                            >
                                <Link className={styled.logo} to="/Home/">
                                    Lite
                                </Link>
                                <ul>
                                    <li>
                                        <NavigationLink
                                            link="/Home/"
                                            text="Home"
                                        />
                                    </li>
                                    <li>
                                        <NavigationLink
                                            link="/Home/articles"
                                            text="Articles"
                                        />
                                    </li>
                                    <li>
                                        <NavigationLink
                                            link="/Home/questions-anwers"
                                            text="Questions & Anwers"
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </footer>
        </>
    );
}
