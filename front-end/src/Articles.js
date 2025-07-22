import './App.css';

export function Articles(params) {
  let articles = params.data.articles || [];
  let queryName = params.query.queryName || "na";
  let articleCount = params.data.totalResults || 0;

  return (
    <div>
      <p><strong>Query:</strong> {queryName}</p>
      <p><strong>Count:</strong> {articleCount}</p>
      <div>
        {
          articles.map((item, idx) => {
            if (!item) return <div key={idx}>No Item</div>;

            if (!item.title) return <div key={idx}>No Title</div>;

            if (item.title === "[Removed]") return <div key={idx}>Was Removed</div>;

            let trimTitle = item.title.substring(0, 80);

            return (
              <div className="article-card" key={idx}>
                {item.urlToImage && (
                  <img src={item.urlToImage} alt={item.title} className="thumbnail" />
                )}
                <div>
                  <strong>{trimTitle}</strong>
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
