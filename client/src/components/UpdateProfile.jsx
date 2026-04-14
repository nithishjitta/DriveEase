import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ✅ CHANGED: moved outside to fix cursor issue */
const Field = ({ label, field, form, set, errors, type="text", placeholder="" }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
    <label style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"1px", color:"var(--muted)" }}>{label}</label>
    <input
      type={type}
      value={form[field] || ""}  // ✅ CHANGED (safe value)
      onChange={e => set(field, e.target.value)}
      placeholder={placeholder}
      style={{
        background:"var(--surface2)", border:`1px solid ${errors[field] ? "var(--red)" : "var(--border)"}`,
        borderRadius:12, padding:"13px 16px", color:"var(--text)", fontSize:14, outline:"none",
        transition:"border-color .2s", fontFamily:"'Mulish',sans-serif",
      }}
      onFocus={e  => e.target.style.borderColor = errors[field] ? "var(--red)" : "var(--gold)"}
      onBlur={e   => e.target.style.borderColor = errors[field] ? "var(--red)" : "var(--border)"}
    />
    {errors[field] && <span style={{ fontSize:11, color:"var(--red)", fontWeight:600 }}>⚠ {errors[field]}</span>}
  </div>
);

export default function UpdateProfile({ user, setUser }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstname: user?.firstname || user?.name || "",
    lastname:  user?.lastname || "",
    email:     user?.email    || "",
    contact:   user?.contact  || "",
    image: null, // ✅ CHANGED (for file upload)
  });

  const [saving,  setSaving]  = useState(false);
  const [toast,   setToast]   = useState(null);
  const [errors,  setErrors]  = useState({});

  const set = (field, value) => {
    setForm(prev => {
      if (prev[field] === value) return prev;
      return { ...prev, [field]: value };
    });
  };
  const [previewUrl, setPreviewUrl] = useState(null);
  // ✅ CHANGED (file handler added)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setForm(prev => ({ ...prev, image: file }));
        setPreviewUrl(URL.createObjectURL(file));
    }
};

  const validate = () => {
    const e = {};
    if (!form.firstname.trim()) e.firstname = "Name is required";
    if (!form.email.trim())     e.email     = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (form.contact && !/^\d{10}$/.test(form.contact.replace(/\s/g,"")))
      e.contact = "Enter a valid 10-digit number"; // ✅ CHANGED (phone → contact)
    return e;
  };

  const handleSave = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    setSaving(true);
    try {

      // ✅ CHANGED: use FormData
      const formData = new FormData();

      Object.keys(form).forEach(key => {
        if (form[key] !== "" && form[key] !== null) {
          formData.append(key, form[key]);
        }
      });

      const res = await fetch("http://localhost:3000/me", {
        method: "PATCH", // ✅ CHANGED
        credentials: "include",
        body: formData,  // ✅ CHANGED
      });

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await res.json();
      setUser(data.user);
      setToast("success");
      setTimeout(() => { setToast(null); navigate("/profile"); }, 1800);

    } catch {
      setToast("error");
      setTimeout(() => setToast(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  const initials = (user?.firstname || user?.name || "U")[0]?.toUpperCase();

  return (
    <div className="page">
      <style>{`
        .up-btn:hover{background:var(--gold2)!important;transform:translateY(-1px);box-shadow:0 4px 16px rgba(212,168,83,.25)}
        .up-ghost:hover{border-color:var(--gold)!important;color:var(--gold)!important}
        @keyframes upIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .up-fade{animation:upIn .35s ease both}
        @keyframes toastIn{from{opacity:0;transform:translate(-50%,20px)}to{opacity:1;transform:translate(-50%,0)}}
        .up-toast{animation:toastIn .3s ease both}
      `}</style>

      {/* Toast */}
      {toast && (
        <div className="up-toast" style={{
          position:"fixed", bottom:32, left:"50%", transform:"translateX(-50%)",
          background: toast==="success" ? "var(--green)" : "var(--red)",
          color:"#fff", padding:"14px 28px", borderRadius:14,
          fontWeight:700, fontSize:14, zIndex:999,
          boxShadow: toast==="success" ? "0 8px 32px rgba(61,207,130,.35)" : "0 8px 32px rgba(224,82,82,.35)",
        }}>
          {toast==="success" ? "✓ Profile updated successfully!" : "✕ Something went wrong. Try again."}
        </div>
      )}

      <div className="up-fade" style={{ maxWidth:760, margin:"0 auto", padding:"52px 24px 80px" }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:36 }}>
          <button onClick={() => navigate(-1)} style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:10, padding:"9px 14px", fontSize:13, fontWeight:600, color:"var(--muted)", cursor:"pointer", display:"flex", alignItems:"center", gap:6, transition:"all .18s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor="var(--gold)"}
            onMouseLeave={e => e.currentTarget.style.borderColor="var(--border)"}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
            Back
          </button>
          <div>
            <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:26, fontWeight:900, letterSpacing:"-0.8px", lineHeight:1 }}>Edit Profile</h1>
            <div style={{ fontSize:13, color:"var(--muted)", marginTop:4 }}>Update your personal information</div>
          </div>
        </div>

        {/* Avatar section */}
        <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:20, padding:"24px", marginBottom:20, display:"flex", alignItems:"center", gap:20 }}>
          <div style={{ position:"relative", flexShrink:0 }}>
            <div style={{ width:80, height:80, borderRadius:"50%", border:"3px solid rgba(212,168,83,.4)", overflow:"hidden", background:"var(--surface2)" }}>
              {user?.imageUrl
                ? <img src={previewUrl || user.imageUrl} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                : <div style={{ width:"100%", height:"100%", background:"linear-gradient(135deg,rgba(212,168,83,.25),rgba(212,168,83,.06))", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Syne',sans-serif", fontSize:28, fontWeight:900, color:"var(--gold)" }}>{initials}</div>
              }
            </div>
          </div>
          <div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:800, marginBottom:4 }}>Profile Photo</div>
            <div style={{ fontSize:13, color:"var(--muted)", marginBottom:12 }}>JPG, PNG or GIF · Max 5MB</div>

            {/* hidden input */}
<input
  type="file"
  accept="image/*"
  id="fileUpload"
  style={{ display: "none" }}
  onChange={handleFileChange}
/>

<button
  style={{
    background:"rgba(212,168,83,.1)",
    border:"1px solid rgba(212,168,83,.25)",
    borderRadius:9,
    padding:"8px 16px",
    fontSize:12,
    fontWeight:700,
    color:"var(--gold)",
    cursor:"pointer",
    transition:"all .18s"
  }}
  onClick={() => document.getElementById("fileUpload").click()}
  onMouseEnter={e => e.currentTarget.style.background="rgba(212,168,83,.18)"}
  onMouseLeave={e => e.currentTarget.style.background="rgba(212,168,83,.1)"}
>
  Upload Photo
</button>

          </div>
        </div>

        {/* Form */}
        <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:20, padding:"28px" }}>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:800, marginBottom:22 }}>Personal Information</div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginBottom:18 }}>
            <Field label="First Name" field="firstname" form={form} set={set} errors={errors} placeholder="Your first name" />
            <Field label="Last Name" field="lastname" form={form} set={set} errors={errors} placeholder="Your last name (optional)" />
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginBottom:18 }}>
            <Field label="Email" field="email" type="email" form={form} set={set} errors={errors} placeholder="you@example.com" />
            <Field label="Phone Number" field="contact" form={form} set={set} errors={errors} placeholder="10-digit mobile number" />
          </div>

          {/* Actions */}
          <div style={{ display:"flex", gap:12, justifyContent:"flex-end" }}>
            <button className="up-ghost" onClick={() => navigate(-1)} style={{ background:"transparent", border:"1px solid var(--border)", borderRadius:11, padding:"12px 24px", fontSize:14, fontWeight:700, color:"var(--text)", cursor:"pointer", transition:"all .18s" }}>
              Cancel
            </button>
            <button className="up-btn" onClick={handleSave} disabled={saving} style={{
              background:"var(--gold)", border:"none", borderRadius:11, padding:"12px 28px",
              fontSize:14, fontWeight:800, color:"#08090C", cursor: saving ? "not-allowed" : "pointer",
              fontFamily:"'Syne',sans-serif", transition:"all .18s",
              opacity: saving ? 0.75 : 1, display:"flex", alignItems:"center", gap:8,
            }}>
              {saving
                ? <><span style={{ width:14, height:14, border:"2px solid rgba(0,0,0,.3)", borderTopColor:"#08090C", borderRadius:"50%", display:"inline-block", animation:"spin .7s linear infinite" }} />Saving…</>
                : "Save Changes"
              }
            </button>
          </div>
        </div>

        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  );
}