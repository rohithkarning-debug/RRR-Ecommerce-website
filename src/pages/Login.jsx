import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [err,setErr]=useState("");
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const { user, loginSuccess } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (user) nav("/"); 
  }, [user, nav]);

  function validate() {
    if (!email.includes("@")) return "Please enter a valid email.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return null;
  }

  async function submit(e){
    e.preventDefault();
    setErr("");
    const v = validate();
    if (v) return setErr(v);

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if(res.ok){ loginSuccess(data); nav("/"); } else { setErr(data.message||"Login failed"); }
    } catch (error) {
      setErr("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="stack gap" style={{maxWidth:420, margin:"0 auto"}}>
      <h1>Sign in</h1>
      <form onSubmit={submit} className="stack gap">
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" required />
        <div style={{ position: "relative" }}>
          <input
            type={showPwd ? "text" : "password"}
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button
            type="button"
            onClick={()=>setShowPwd(s => !s)}
            style={{ position: "absolute", right: 8, top: 8, background: "transparent", border: "none", cursor: "pointer" }}
            aria-label="Toggle password"
          >
            {showPwd ? "🙈" : "👁️"}
          </button>
        </div>

        {err && <div className="muted" style={{color:"var(--danger)"}}>{err}</div>}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button className="btn" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
          <Link to="/forgot-password" className="muted">Forgot password?</Link>
        </div>
      </form>
      <div className="muted">New here? <Link to="/signup">Create an account</Link></div>
    </section>
  );
}
