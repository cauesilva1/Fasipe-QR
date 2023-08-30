import "./pages.css";

export default function Login() {
  return (
    <div class="containerlogin">
      <div class="heading">Login</div>
      <form action="" class="form">
        <input
          required=""
          class="input"
          type="Username"
          name="Username"
          id="Username"
          placeholder="Username"
        />
        <input
          required=""
          class="input"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
        <input class="login-button" type="submit" value="Sign In" />
      </form>
        </div>
    
    
  );
}
