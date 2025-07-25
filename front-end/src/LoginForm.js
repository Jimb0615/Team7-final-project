export function LoginForm(params) {
  const handleChange = (event) => {
    let newCredentials = { ...params.credentials };
    newCredentials[event.target.name] = event.target.value;
    params.setCredentials(newCredentials);
  };

  function handleLogout() {
    if (window.confirm("Are you sure you want to logout?")) {
      params.login();
    }
  }

  return (
    <div className="box">
      <span className="title">Login</span>

      <div style={{ marginBottom: "10px" }}>
        User:{" "}
        <span style={{ fontWeight: "bold" }}>
          {params.currentUser ? params.currentUser.user : "not logged in"}
        </span>
      </div>

      <div className={params.currentUser ? "hidden" : "visible"}>
        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="user">User: </label>
          <input
            type="text"
            id="user"
            name="user"
            value={params.credentials.user}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            value={params.credentials.password}
            onChange={handleChange}
          />
        </div>

        <div style={{ textAlign: "center" }}>
          <button onClick={params.login} className="action-button">
            Login
          </button>
        </div>
      </div>

        {params.currentUser && (
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <button onClick={handleLogout} className="action-button">
            Logout
          </button>
        </div>
      )}

    </div>
  );
}
