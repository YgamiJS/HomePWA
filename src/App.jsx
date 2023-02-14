import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from "react-router-dom";
import { useState } from "react";
import useFecth from "./hook/useFecth";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Articles from "./Components/Articles/Articles";
import CurrentArticle from "./Components/Articles/currentArticle";
import QuestionsAnwers from "./Components/Q&A/QuestionsAnwers";
import Qa from "./Components/Q&A/qa";
import ErrorElement from "./Components/Error/ErrorElement";
import New from "./Components/NewPost/NewPost";
import "./App.scss";

function App() {
    const [stateDataPost, setStateDataPost] = useState("");
    const [stateQuestion, setStateQuestion] = useState("");

    const [posts, setPosts] = useFecth(
        "https://jsonplaceholder.typicode.com/posts"
    );
    const [stateQuestions, setStateQuestions] = useFecth(
        "https://jsonplaceholder.typicode.com/comments"
    );

    const route = createBrowserRouter(
        createRoutesFromElements(
            <Route
                path="/HomePWA/"
                element={
                    <Layout
                        posts={posts}
                        setStateDataPost={setStateDataPost}
                        stateQuestions={stateQuestions}
                    />
                }
            >
                <Route
                    index
                    element={
                        <Home
                            textH1={"Добро пожаловать в Lite!"}
                            textPage={
                                "Lite - Сайт вопросов - ответов , а также статей и много другого. Здесь вы сможите задать интересующий вас вопрос и тут же получить ответ на него , также вы можете читать написанные статьи на интересующие вас темы и писать свои."
                            }
                        ></Home>
                    }
                ></Route>
                <Route
                    path="/HomePWA/articles"
                    element={
                        <Articles
                            posts={posts}
                            setPosts={setPosts}
                            setStateDataPost={setStateDataPost}
                        />
                    }
                ></Route>
                <Route
                    path="/HomePWA/currentArticle"
                    element={
                        <CurrentArticle
                            posts={posts}
                            stateDataPost={stateDataPost}
                        />
                    }
                ></Route>
                <Route
                    path="/HomePWA/newArticle"
                    element={
                        <New
                            settings={{
                                objectPost: {
                                    title: "",
                                    body: "",
                                    id: Math.random(),
                                },
                                urlFetch:
                                    "https://jsonplaceholder.typicode.com/posts",
                                urlLink: "articles",
                                data: posts,
                                setData: setPosts,
                                inputsName: {
                                    title: "title",
                                    body: "body",
                                },
                            }}
                        />
                    }
                ></Route>
                <Route
                    path="/HomePWA/questions-anwers"
                    element={
                        <QuestionsAnwers
                            stateQuestions={stateQuestions}
                            setStateQuestions={setStateQuestions}
                            setStateQuestion={setStateQuestion}
                        />
                    }
                ></Route>
                <Route
                    path="/HomePWA/qa"
                    element={
                        <Qa
                            stateQuestion={stateQuestion}
                            stateQuestions={stateQuestions}
                        />
                    }
                ></Route>
                <Route
                    path="/HomePWA/newQuestion"
                    element={
                        <New
                            settings={{
                                objectPost: {
                                    name: "",
                                    body: "",
                                    id: Math.random(),
                                },
                                urlFetch:
                                    "https://jsonplaceholder.typicode.com/comments",
                                urlLink: "questions-anwers",
                                data: stateQuestions,
                                setData: setStateQuestions,
                                inputsName: {
                                    title: "name",
                                    body: "body",
                                },
                            }}
                        />
                    }
                ></Route>
                <Route path="/Home/*" element={<ErrorElement />}></Route>
            </Route>
        )
    );

    return <RouterProvider router={route} />;
}

export default App;
