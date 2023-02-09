import Link from "../UI/Link/Link.jsx";
import List from "../List/List";
import Pagination from "../Pagination/Pagination";
import { getId } from "../../API/utils";
import styled from "./qa.module.scss";
import { Card } from "../UI/Card/Card";
import { v4 as uuidv4 } from "uuid";

export default function QuestionsAnwers({
    stateQuestions,
    setStateQuestions,
    setStateQuestion,
}) {
    const setDataQuesion = (event) => {
        if (event.target.classList.contains(styled.Wrapperposts)) return;
        setStateQuestion(getId(event));
    };

    return (
        <div className={styled.Wrapperposts}>
            <Link to="/Home/newQuestion" title="Create a Question" />
            <List
                className={styled.posts}
                onClick={setDataQuesion}
                items={stateQuestions}
                renderList={(question) => (
                    <Card
                        to="/Home/qa"
                        title={question.name}
                        id={question.id}
                        key={uuidv4()}
                    />
                )}
            />
            <Pagination
                posts={stateQuestions}
                setPosts={setStateQuestions}
                settings={{
                    url: "https://jsonplaceholder.typicode.com/comments",
                    limit: 40,
                }}
            />
        </div>
    );
}
