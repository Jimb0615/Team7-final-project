export function QueryForm(params) {
  const handleChange = (event) => {
    let newQueryObject = { ...params.formObject };
    newQueryObject[event.target.name] = event.target.value;
    params.setFormObject(newQueryObject);
  };

  function onSubmitClick(event) {
    event.preventDefault();
    if (!params.formObject.queryName) {
      alert("Please provide a name for the query!");
      return;
    }
    if (!params.formObject.q || params.formObject.q.length === 0) {
      alert("Please provide some text for the query field!");
      return;
    }
    params.submitToParent(params.formObject);
  };

  return (
    <div>
      <form>
        <div>
          <label htmlFor="queryName">Query Name:</label>
          <input
            type="text"
            id="queryName"
            name="queryName"
            placeholder="e.g., My News Search"
            value={params.formObject.queryName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="q">Query Text:</label>
          <input
            type="text"
            id="q"
            name="q"
            placeholder="e.g., Technology, Sports"
            value={params.formObject.q}
            onChange={handleChange}
          />
        </div>
        <div>
          <input type="button" value="Submit" onClick={onSubmitClick} />
        </div>
      </form>
    </div>
  );
}
