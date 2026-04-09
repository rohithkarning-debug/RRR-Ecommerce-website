
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Signup(){
  const [username,setUsername]=useState("");
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
    if (!username.trim()) return "Please enter a username.";
    if (!email.includes("@")) return "Please enter a valid email.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return null;
  }

  async function submit(e){
    e.preventDefault(); setErr("");
    const v = validate();
    if (v) return setErr(v);

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5001/api/auth/signup", {
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();
      if(res.ok){ loginSuccess(data); nav("/"); } else { setErr(data.message||"Signup failed"); }
    } catch (error) {
      setErr("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="stack gap" style={{maxWidth:420, margin:"0 auto"}}>
      <h1>Create account</h1>
      <form onSubmit={submit} className="stack gap">
        <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Username" required />
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" required />
        <div style={{ position: "relative" }}>
          <input type={showPwd ? "text" : "password"} value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" required />
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
        <button className="btn" disabled={loading}>{loading ? "Creating..." : "Create account"}</button>
      </form>
      <div className="muted">Already have an account? <Link to="/login">Sign in</Link></div>
    </section>
  );
}
