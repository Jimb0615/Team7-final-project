import { QueryForm } from './QueryForm';
import { Articles } from './Articles';
import { useState, useEffect } from 'react';
import { exampleQuery, exampleData } from './data';
import { SavedQueries } from './SavedQueries';
import { LoginForm } from './LoginForm';
import defaultQueries from './defaultqueries.json';

export function NewsReader() {
  const [query, setQuery] = useState(exampleQuery);
  const [data, setData] = useState(exampleData);
  const [queryFormObject, setQueryFormObject] = useState({ ...exampleQuery });
  const urlNews = "/news";
  const urlQueries = "/queries";
  const urlUsersAuth = "/users/authenticate";
  const [savedQueries, setSavedQueries] = useState([{ ...exampleQuery }]);
  const [currentUser, setCurrentUser] = useState(null);
  const [credentials, setCredentials] = useState({ user: "", password: "" });

  useEffect(() => {
    getNews(query);
  }, [query]);

  useEffect(() => {
    if (!currentUser) {
      // No user logged in, use default queries
      setSavedQueries(defaultQueries);
      setQuery(defaultQueries[0]);
      setQueryFormObject(defaultQueries[0]);
    } else {
      // Fetch customizable queries from backend
      getQueryList();
    }
  }, [currentUser]);

  async function getQueryList() {
    try {
      const response = await fetch(urlQueries);
      if (response.ok) {
        const data = await response.json();
        console.log("savedQueries has been retrieved: ", data);
        setSavedQueries(data);
      } else {
        console.error('Error fetching queries:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching queries:', error);
    }
  }

  async function login() {
    if (currentUser !== null) {
      // logout
      setCurrentUser(null);
    } else {
      // login
      try {
        const response = await fetch(urlUsersAuth, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        });
        if (response.status === 200) {
          setCurrentUser({ ...credentials });
          setCredentials({ user: "", password: "" });
        } else {
          alert("Error during authentication! " + credentials.user + "/" + credentials.password);
          setCurrentUser(null);
        }
      } catch (error) {
        console.error('Error authenticating user:', error);
        setCurrentUser(null);
      }
    }
  }

  async function saveQueryList(savedQueries) {
    try {
      const response = await fetch(urlQueries, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(savedQueries),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("savedQueries array has been persisted:", savedQueries);
    } catch (error) {
      console.error('Error saving queries:', error);
    }
  }

  function resetSavedQueries() {
    if (window.confirm("Are you sure you want to erase the list?")) {
      saveQueryList([]);
      setSavedQueries([]);
      setData({});
      setQuery({ ...exampleQuery });
      setQueryFormObject({ ...exampleQuery });
    }
  }

  function onSavedQuerySelect(selectedQuery) {
    setQueryFormObject(selectedQuery);
    setQuery(selectedQuery);
  }

  function currentUserMatches(user) {
    if (currentUser) {
      if (currentUser.user) {
        if (currentUser.user === user) {
          return true;
        }
      }
    }
    return false;
  }

  
  function onFormSubmit(queryObject) {
    if (currentUser === null) {
      alert("Log in if you want to create new queries!");
      return;
    }
    if (savedQueries.length >= 3 && currentUserMatches("guest")) {
      alert("Guest users cannot submit new queries once saved query count is 3 or greater!");
      return;
    }

    let newSavedQueries = [];
    newSavedQueries.push(queryObject);
    for (let query of savedQueries) {
      if (query.queryName !== queryObject.queryName) {
        newSavedQueries.push(query);
      }
    }
    console.log("Saving queries:", JSON.stringify(newSavedQueries));
    saveQueryList(newSavedQueries);
    setSavedQueries(newSavedQueries);
    setQuery(queryObject);
  }

  async function getNews(queryObject) {
    // If no query, clear data
    if (!queryObject.q) {
      setData({});
      return;
    }

    try {
      const response = await fetch(urlNews, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(queryObject)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.statusText}`);
      }

      const data = await response.json();
      setData(data);
    } catch (error) {
      setData({ error: error.message });
    }
  }
  return (
    <div className="news-container">
      <div className="login-box">
        <LoginForm
          login={login}
          credentials={credentials}
          currentUser={currentUser}
          setCredentials={setCredentials}
        />
      </div>

      <div className="query-row">
        {currentUser && (
          <div className="box small-box">
            <span className="title">Query Form</span>
            <QueryForm
              currentUser={currentUser}
              setFormObject={setQueryFormObject}
              formObject={queryFormObject}
              submitToParent={onFormSubmit}
            />
          </div>
        )}
        <div className="box small-box">
          <span className="title">Saved Queries</span>
          <SavedQueries
            savedQueries={savedQueries}
            selectedQueryName={query.queryName}
            onQuerySelect={onSavedQuerySelect}
            currentUser={currentUser}
            resetSavedQueries={resetSavedQueries}
          />
        </div>
      </div>

      <div className="box article-box">
        <span className='title'>Articles List</span>
        <Articles query={query} data={data} />
      </div>
    </div>
  );
}