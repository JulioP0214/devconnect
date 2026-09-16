import "../App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newQuestionTitle, setNewQuestionTitle] = useState("");
  const [newQuestionBody, setNewQuestionBody] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/");
  }
  useEffect(function () {
    fetch("http://localhost:5000/api/categories")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setCategories(data);
      })
      .catch(function (error) {
        console.log("Error loading categories:", error);
      });
  }, []);

  async function loadQuestions(category) {
    setSelectedCategory(category);

    const response = await fetch(
      `http://localhost:5000/api/questions/category/${category._id}`,
    );

    const data = await response.json();

    setQuestions(data);
  }

  async function loadAnswers(question) {
    setSelectedQuestion(question);

    const response = await fetch(
      `http://localhost:5000/api/answers/question/${question._id}`,
    );

    const data = await response.json();

    setAnswers(data);
  }

  async function createAnswer() {
    if (!selectedQuestion || !newAnswer) {
      return;
    }

    const response = await fetch("http://localhost:5000/api/answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: newAnswer,
        question: selectedQuestion._id,
        user: user.id,
      }),
    });

    if (response.ok) {
      setNewAnswer("");
      loadAnswers(selectedQuestion);
    }
  }
  async function createQuestion() {
    if (!selectedCategory) {
      return;
    }

    if (!newQuestionTitle || !newQuestionBody) {
      return;
    }

    const response = await fetch("http://localhost:5000/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newQuestionTitle,
        body: newQuestionBody,
        category: selectedCategory._id,
        user: user.id,
      }),
    });

    if (response.ok) {
      setNewQuestionTitle("");
      setNewQuestionBody("");

      loadQuestions(selectedCategory);
    }
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>DevConnect</h1>

        <div className="user-area">
          <span>Welcome, {user?.username}</span>

          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-layout">
        <aside className="category-sidebar">
          <h2>Categories</h2>

          {categories.map(function (category) {
            return (
              <button
                className="category-button"
                key={category._id}
                onClick={function () {
                  loadQuestions(category);
                }}
              >
                {category.name}
              </button>
            );
          })}
        </aside>

        <main className="dashboard-content">
          {!selectedCategory ? (
            <p>Select a Category to view its questions</p>
          ) : (
            <>
              <h2>{selectedCategory.name}</h2>

              <div className="question-form">
                <h3>Ask a Question</h3>

                <input
                  type="text"
                  placeholder="Question title"
                  value={newQuestionTitle}
                  onChange={function (event) {
                    setNewQuestionTitle(event.target.value);
                  }}
                />

                <textarea
                  placeholder="Describe your question"
                  value={newQuestionBody}
                  onChange={function (event) {
                    setNewQuestionBody(event.target.value);
                  }}
                />

                <button onClick={createQuestion}>Post Question</button>
              </div>

              <h2>Questions</h2>

              {questions.length > 0 ? (
                questions.map(function (question) {
                  return (
                    <div className="question-card" key={question._id}>
                      <h3
                        onClick={function () {
                          loadAnswers(question);
                        }}
                      >
                        {question.title}
                      </h3>

                      <p>{question.body}</p>
                      <small>Asked by: {question.user?.username}</small>
                    </div>
                  );
                })
              ) : (
                <p>No questions in this category yet.</p>
              )}

              {selectedQuestion && (
                <div className="selected-question">
                  <h2>{selectedQuestion.title}</h2>
                  <p>{selectedQuestion.body}</p>

                  <div className="answer-form">
                    <h3>Post an Answer</h3>

                    <textarea
                      placeholder="Write your answer"
                      value={newAnswer}
                      onChange={function (event) {
                        setNewAnswer(event.target.value);
                      }}
                    />

                    <button onClick={createAnswer}>Post Answer</button>
                  </div>

                  <h3>Answers</h3>

                  {answers.length > 0 ? (
                    answers.map(function (answer) {
                      return (
                        <div className="answer-card" key={answer._id}>
                          <p>{answer.body}</p>
                          <small>Answered by: {answer.user?.username}</small>
                        </div>
                      );
                    })
                  ) : (
                    <p>No answers yet.</p>
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
