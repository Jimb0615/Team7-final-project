import { useState } from 'react';
import './App.css';

export function Articles(params) {
  let articles = params.data.articles || [];
  let queryName = params.query.queryName || "na";
  let articleCount = params.data.totalResults || 0;

  const [showDetails, setShowDetails] = useState(true);

  function renderQueryDetails(query) {
    if (!query) return null;

    const items = Object.entries(query).map(([key, value]) => (
      <li key={key}>
        <strong>{key}:</strong> {value?.toString()}
      </li>
    ));

    return <ul>{items}</ul>;
  }

  return (
    <div>
      <p><strong>Query:</strong> {queryName}</p>
      <p><strong>Count:</strong> {articleCount}</p>

      <button
  onClick={() => setShowDetails(!showDetails)}
  className="query-details-button"
>
  Query Details
      </button>

      {showDetails && (
        <div className="query-details-horizontal">
          {Object.entries(params.query).map(([key, value]) => (
            <span key={key} className="query-detail-item">
              <strong>{key}:</strong> {value?.toString()}
            </span>
          ))}
        </div>
      )}

      <div className="articles-scroll">
        {
          articles.map((item, idx) => {
            if (!item) return <div key={idx}>No Item</div>;
            if (!item.title) return <div key={idx}>No Title</div>;
            if (item.title === "[Removed]") return <div key={idx}>Was Removed</div>;

            return (
              <div className="article-card" key={idx}>
                {item.urlToImage && (
                  <img src={item.urlToImage} alt={item.title} className="thumbnail" />
                )}
                <div className="article-content">
                  <strong>{item.title}</strong>
                  <br />
                  <a href={item.url} target="_blank" rel="noreferrer">Read More</a>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}
