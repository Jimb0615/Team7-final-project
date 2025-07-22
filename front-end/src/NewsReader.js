import { QueryForm } from './QueryForm';
import { Articles } from './Articles';
import { useState, useEffect } from 'react';
import { exampleQuery, exampleData } from './data';
import { SavedQueries } from './SavedQueries';

export function NewsReader() {
  const [query, setQuery] = useState(exampleQuery);
  const [data, setData] = useState(exampleData);
  const [queryFormObject, setQueryFormObject] = useState({ ...exampleQuery });
  const urlNews = "/news";
  const urlQueries = "/queries";
  const [savedQueries, setSavedQueries] = useState([{ ...exampleQuery }]);

  useEffect(() => {
    getNews(query);
  }, [query]);

  function onSavedQuerySelect(selectedQuery) {
    setQueryFormObject(selectedQuery);
    setQuery(selectedQuery);
  }

  function onFormSubmit(queryObject) {
    const newSaved = [queryObject, ...savedQueries.filter(q => q.queryName !== queryObject.queryName)];
    setSavedQueries(newSaved);
    setQuery(queryObject);
  }

  async function getNews(queryObject) {
    if (queryObject.q) {
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
    <div>
      <div className="top-row">
        <div className="box">
          <span className="title">Query Form</span>
          <QueryForm
            setFormObject={setQueryFormObject}
            formObject={queryFormObject}
            submitToParent={onFormSubmit}
          />
        </div>
        <div className="box">
          <span className="title">Saved Queries</span>
          <SavedQueries
            savedQueries={savedQueries}
            selectedQueryName={query.queryName}
            onQuerySelect={onSavedQuerySelect}
          />
        </div>
      </div>
      <div className="bottom-row">
        <div className="box full-width">
          <span className="title">Articles List</span>
          <Articles query={query} data={data} />
        </div>
      </div>
    </div>
  );
}
