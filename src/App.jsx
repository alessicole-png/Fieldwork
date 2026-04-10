import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Home as HomeIcon, Calendar, Users, ClipboardList, FileText, Plus, X, Check, Pencil, Trash2, Search, ChevronLeft, ChevronRight, Mic, Square, Lock, MapPin, Phone, Send, Copy, Bot, Table2, Eye, EyeOff } from "lucide-react";

const SK="fw-v10";
const uid=()=>Date.now().toString(36)+Math.random().toString(36).substr(2,6);
const fmt$=n=>"$"+Number(n||0).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:0});
const fD=d=>d?new Date(d+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric"}):"";
const fDF=d=>d?new Date(d+"T12:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"";
const td=()=>new Date().toISOString().split("T")[0];
const dfn=d=>Math.ceil((new Date(d)-new Date(td()))/864e5);
const GSHEET="https://docs.google.com/spreadsheets/d/11aZf227nbOfEYda3R2OCzVBxZydGv-y_1FGHpUIU-jA/copy";
const MO=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const BUSI={name:"Cole's Landscape Co.",owner:"Cole Alessi",phone:"(248) 838-8847"};
const NW={pin:"7525",cats:[{t:"Liquid",items:[{n:"Checking",v:2866},{n:"Amex Savings",v:15000},{n:"Webull",v:15000},{n:"Fidelity",v:4800},{n:"Venmo",v:500}]},{t:"Physical",items:[{n:"Truck",v:14000},{n:"RV",v:14600},{n:"Boat",v:2500}]},{t:"Equipment",items:[{n:"Leaf Blower",v:350},{n:"Snowblower",v:400}]},{t:"Electronics",items:[{n:"MacBook",v:1000},{n:"iPhone",v:1000},{n:"Drone",v:300},{n:"Guitar",v:300}]},{t:"Outdoor",items:[{n:"Shotgun",v:600},{n:"Gear",v:500},{n:"Sunglasses",v:300},{n:"Misc",v:500}]}],gross:74516,debt:3800,net:70716};
const YR=[{y:2023,r:32716,e:15584,p:17131},{y:2024,r:42289,e:11765,p:30524},{y:2025,r:50210,e:20232,p:29978},{y:2026,r:7360,e:8847,p:-1487}];

const CL=[
  {id:"c1",name:"Michael",phone:"",address:""},{id:"c2",name:"Kevin",phone:""},
  {id:"c3",name:"Pam",phone:"",notes:"John's friend"},{id:"c4",name:"Joan",phone:"",notes:"Airport"},
  {id:"c5",name:"Matt",phone:"",notes:"Recurring"},{id:"c6",name:"Matt's MIL",phone:""},
  {id:"c7",name:"Kelly Marsh",phone:""},{id:"c8",name:"Char Marquette",phone:""},
  {id:"c9",name:"Valarie",phone:""},{id:"c10",name:"Joan Heckman",phone:"",notes:"Guaranteed"},
  {id:"c11",name:"Jan & Jim",phone:""},{id:"c12",name:"Jenna",phone:""},{id:"c13",name:"Kathy",phone:""},
  {id:"c14",name:"Bernie",phone:""},{id:"c15",name:"Pete",phone:"248-917-1422",address:"4937 Huron Dr, Clarkston MI"},
  {id:"c16",name:"Emily Irvin",phone:"(734) 548-0804",address:"1350 Orchard Ridge, Bloomfield Hills"},
  {id:"c17",name:"Carole",phone:""},{id:"c18",name:"Celeste",phone:""},
  {id:"c19",name:"Janette",phone:""},{id:"c20",name:"Peg",phone:""},
  {id:"c21",name:"Gary",phone:""},{id:"c22",name:"Gill & Chris",phone:""},
  {id:"c23",name:"Erin Lewinski",phone:"(586) 604-3655",address:"2950 Eastways Rd, Bloomfield Hills"},
  {id:"c24",name:"Dale",phone:""},{id:"c25",name:"Andrew",phone:"586-258-8932",address:"22434 Lydgate Ct, Novi"},
  {id:"c26",name:"Joanne Edwards",phone:"734-629-7256",address:"2360 Ford Rd, White Lake"},
  {id:"c27",name:"KLee Loskill",phone:"(248) 496-0315"},{id:"c28",name:"Jan",phone:"(248) 672-3719"},
  {id:"c29",name:"Machelle",phone:"(248) 535-0578"},{id:"c30",name:"Veeresh Nama",phone:"(248) 207-7022"},
  {id:"c31",name:"Ron",phone:"(248) 505-5311"},{id:"c32",name:"Tyler",phone:"(517) 819-3817"},
  {id:"c33",name:"Steve",phone:"(248) 804-6633"},{id:"c34",name:"Sanjeev",phone:"(248) 252-1773"},
  {id:"c35",name:"Tree Bob",phone:"(248) 249-2046"},
];
const JB=[
  {id:"j1",cn:"Michael",d:"2025-03-09",sv:"Leaf Removal",h:2,p:120,ex:0,n:"",ps:"paid"},
  {id:"j2",cn:"Kevin",d:"2025-03-09",sv:"Hauling",h:1.5,p:70,ex:0,n:"Bottles",ps:"paid"},
  {id:"j3",cn:"Pam",d:"2025-03-11",sv:"Salt",h:1,p:100,ex:0,ps:"paid"},
  {id:"j4",cn:"Joan",d:"2025-03-11",sv:"Airport",h:2,p:85,ex:15,n:"$15 gas",ps:"paid"},
  {id:"j5",cn:"Matt",d:"2025-03-23",sv:"Spring Cleanup",h:5,p:350,ex:20,n:"$20 dump",ps:"paid"},
  {id:"j6",cn:"Matt's MIL",d:"2025-03-24",sv:"Spring Cleanup",h:2,p:100,ex:10,ps:"paid"},
  {id:"j7",cn:"Kelly Marsh",d:"2025-03-26",sv:"Cleanup+Fertilizer",h:2,p:125,ex:25,ps:"paid"},
  {id:"j8",cn:"Char Marquette",d:"2025-03-26",sv:"Mulch",h:3,p:250,ex:30,ps:"paid"},
  {id:"j9",cn:"Valarie",d:"2025-03-30",sv:"Spring Cleanup",h:1.5,p:60,ex:0,ps:"paid"},
  {id:"j10",cn:"Joan Heckman",d:"2025-03-31",sv:"Pickup",h:1.5,p:75,ex:15,ps:"paid"},
  {id:"j11",cn:"Jan & Jim",d:"2025-03-30",sv:"Mulch",h:3,p:250,ex:100,ps:"paid"},
  {id:"j12",cn:"Jenna",d:"2025-03-30",sv:"Cleanup",h:1,p:50,ex:0,ps:"paid"},
  {id:"j13",cn:"Kathy",d:"2025-03-31",sv:"Spring Cleanup",h:2.5,p:150,ex:0,n:"PENDING",ps:"pending"},
  {id:"j14",cn:"Bernie",d:"2025-04-01",sv:"Spring Cleanup",h:3,p:200,ex:0,ps:"paid"},
  {id:"j15",cn:"Pete",d:"2025-04-01",sv:"Mulch+Cleanup",h:6,p:600,ex:346,n:"$220 mulch+$90 Rick+$10 dump+$26 lunch",ps:"paid"},
];
const SC=[
  {id:"s1",cn:"Carole",d:"2025-04-17",t:"08:00",eh:5,sv:"Dock/Boat",n:"Power wash",st:"scheduled"},
  {id:"s2",cn:"Carole",d:"2025-04-18",t:"08:00",eh:5,sv:"Shrubs",st:"scheduled"},
  {id:"s3",cn:"Janette",d:"2025-04-16",t:"09:00",eh:3,sv:"Cleanup",st:"scheduled"},
  {id:"s4",cn:"Peg",d:"2025-04-14",t:"09:00",eh:3,sv:"Leaf Removal",st:"scheduled"},
  {id:"s5",cn:"Emily Irvin",d:"2025-04-07",t:"07:30",eh:11,sv:"Cleanup+Edging+Mulch",n:"$1568 total",st:"scheduled"},
  {id:"s6",cn:"Kelly Marsh",d:"2025-04-03",t:"10:00",eh:1.5,sv:"Dirt/Seed",st:"scheduled"},
  {id:"s7",cn:"Char Marquette",d:"2025-04-05",t:"10:00",eh:1.5,sv:"Stones",st:"scheduled"},
  {id:"s8",cn:"Pete",d:"2025-04-10",t:"09:00",eh:4,sv:"Bricks",n:"Railroad ties",st:"confirmed"},
  {id:"s9",cn:"Joan Heckman",d:"2025-04-12",t:"09:00",eh:4,sv:"Cleanup+Mulch",st:"confirmed"},
  {id:"s10",cn:"Pam",d:"2025-04-12",t:"13:00",eh:3,sv:"Cleanup",st:"confirmed"},
  {id:"s11",cn:"Celeste",d:"2025-04-14",t:"09:00",eh:5,sv:"Cleanup",n:"Front+back",st:"confirmed"},
];
const LD=[{id:"l1",cn:"Gary",sv:"Mowing+Cleanup"},{id:"l2",cn:"Gill & Chris",sv:"Cleanup+Mulch"},{id:"l3",cn:"Erin Lewinski",sv:"Cleanup+Mulch"},{id:"l4",cn:"Dale",sv:"Handyman"}];
const QT=[
  {id:"q1",cn:"Erin Lewinski",d:"2025-10-19",tot:810,st:"sent",n:"9yd mulch",li:[{nm:"Mulch",q:9,pr:90,t:810}]},
  {id:"q3",cn:"Andrew",d:"2025-08-25",tot:5448,st:"accepted",n:"Trees+removal",li:[{nm:"Green Giant",q:6,pr:230,t:1380},{nm:"Emerald Green",q:27,pr:155,t:4185}]},
  {id:"q4",cn:"Emily Irvin",d:"2025-09-04",tot:1100,st:"sent",n:"Sod+weeding",li:[{nm:"Sod",q:45,pr:10,t:450},{nm:"Install",q:1,pr:350,t:350},{nm:"Weeding",q:1,pr:300,t:300}]},
];
const PR=[
  {id:"p1",nm:"Spring Cleanup",pr:200,cat:"Cleanup"},{id:"p2",nm:"Fall Cleanup",pr:225,cat:"Cleanup"},
  {id:"p3",nm:"Leaf Removal",pr:50,cat:"Cleanup"},{id:"p4",nm:"Mulch Install",pr:90,cat:"Mulch"},
  {id:"p5",nm:"Mowing-Sm",pr:35,cat:"Mow"},{id:"p6",nm:"Mowing-Md",pr:50,cat:"Mow"},{id:"p7",nm:"Mowing-Lg",pr:75,cat:"Mow"},
  {id:"p8",nm:"Hedge Trim",pr:55,cat:"Trim"},{id:"p9",nm:"Shrub Remove",pr:55,cat:"Trim"},
  {id:"p10",nm:"Edging",pr:2,cat:"Detail"},{id:"p11",nm:"Weeding",pr:45,cat:"Detail"},{id:"p12",nm:"Hauling",pr:75,cat:"Other"},
];
const SEED={cl:CL,jb:JB,pr:PR,qt:QT,sc:SC,ld:LD,biz:BUSI,nw:NW,yr:YR};
async function load(){try{const r=await window.storage.get(SK);if(r&&r.value)return JSON.parse(r.value);}catch(e){}return null;}
async function save(d){try{await window.storage.set(SK,JSON.stringify(d));}catch(e){}}

function Modal({children,onClose,title}){
  return <div style={S.ov} onClick={onClose}><div style={S.mod} onClick={e=>e.stopPropagation()}>
    <div style={S.mh}><h3 style={S.mt}>{title}</h3><button style={S.ib} onClick={onClose}><X size={16}/></button></div>
    <div style={S.mb}>{children}</div>
  </div></div>;
}

// AI Chat - calls /api/chat which proxies to OpenAI or Anthropic
async function askAI(system, message) {
  try {
    const r = await fetch("/api/chat", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ system, message })
    });
    const d = await r.json();
    if (d.error) return "Error: " + d.error;
    return d.text || "No response";
  } catch (e) { return "Connection error. Make sure you added your API key in Vercel Settings > Environment Variables."; }
}

function AIChat({ data, onClose }) {
  const [msg, setMsg] = useState(""); const [chat, setChat] = useState([]); const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false); const recRef = useRef(null);
  const hist = data.jb.slice(-10).map(j => `${j.cn}: ${j.sv} ${j.h}h $${j.p} exp$${j.ex}`).join("; ");
  const tH = data.jb.reduce((s, j) => s + Number(j.h || 0), 0);
  const tR = data.jb.reduce((s, j) => s + Number(j.p || 0), 0);
  const sys = `You are a landscaping business assistant for Cole's Landscape Co. in Waterford, Michigan. Cole charges below average. Helpers $20/hr. Mulch ~$26/yard. Dump ~$20. Gas ~$15/20min.\n\nRecent jobs: ${hist}\nAvg rate: ~$${tH > 0 ? Math.round(tR / tH) : 50}/hr\n\nBe concise (2-3 sentences). Help with pricing, scheduling, client messages.`;

  const startMic = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert("Use Chrome or Safari for voice."); return; }
    const r = new SR(); r.continuous = true; r.interimResults = true; r.lang = "en-US"; let fin = "";
    r.onresult = e => { let t = ""; for (let i = e.resultIndex; i < e.results.length; i++) { if (e.results[i].isFinal) fin += (fin ? " " : "") + e.results[i][0].transcript; else t += e.results[i][0].transcript; } setMsg(fin + (t ? " " + t : "")); };
    r.onerror = () => setListening(false); r.onend = () => setListening(false);
    recRef.current = r; r.start(); setListening(true);
  };
  const stopMic = () => { if (recRef.current) { try { recRef.current.stop(); } catch (e) { } } setListening(false); };
  const send = async () => {
    if (!msg.trim() || busy) return; const q = msg; setMsg(""); stopMic();
    setChat(c => [...c, { r: "u", t: q }]); setBusy(true);
    const reply = await askAI(sys, q);
    setChat(c => [...c, { r: "a", t: reply }]); setBusy(false);
  };

  return <Modal title="Talk to Fieldwork" onClose={() => { stopMic(); onClose(); }}>
    <div style={{ maxHeight: 300, overflowY: "auto", marginBottom: 8 }}>
      {chat.map((m, i) => <div key={i} style={{ marginBottom: 5, padding: "6px 8px", borderRadius: 8, background: m.r === "u" ? "rgba(52,211,153,0.06)" : "rgba(96,165,250,0.06)", border: `1px solid ${m.r === "u" ? "rgba(52,211,153,0.12)" : "rgba(96,165,250,0.12)"}` }}>
        <span style={{ fontSize: 9, fontWeight: 700, color: m.r === "u" ? "#34d399" : "#60a5fa" }}>{m.r === "u" ? "YOU" : "AI"}</span>
        <p style={{ fontSize: 12, color: "#e2e8f0", margin: "2px 0 0", whiteSpace: "pre-wrap", lineHeight: 1.4 }}>{m.t}</p>
      </div>)}
      {busy && <p style={{ fontSize: 11, color: "#6b7a8d", textAlign: "center" }}>Thinking...</p>}
    </div>
    {/* Big mic button */}
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
      <button onClick={() => { if (listening) stopMic(); else startMic(); }} style={{
        width: 64, height: 64, borderRadius: 32, background: listening ? "linear-gradient(135deg,#ef4444,#dc2626)" : "linear-gradient(135deg,#34d399,#10b981)",
        border: "none", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
        boxShadow: listening ? "0 0 24px rgba(239,68,68,0.4)" : "0 0 24px rgba(52,211,153,0.3)"
      }}>{listening ? <Square size={24} fill="#fff" /> : <Mic size={24} />}</button>
    </div>
    <p style={{ textAlign: "center", fontSize: 10, color: listening ? "#ef4444" : "#6b7a8d", fontWeight: 600, marginBottom: 6 }}>{listening ? "Listening... tap to stop" : "Tap to talk"}</p>
    <div style={{ display: "flex", gap: 4 }}>
      <input style={{ ...S.inp, flex: 1, fontSize: 13, padding: "10px" }} value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Or type here..." />
      <button style={{ padding: "10px 12px", borderRadius: 7, background: "#34d399", color: "#0b0e13", border: "none", fontWeight: 700, cursor: "pointer" }} onClick={send}><Send size={16} /></button>
    </div>
  </Modal>;
}

/* ═══ NET WORTH ═══ */
function Vault({ data }) {
  const [open, setOpen] = useState(false); const [pin, setPin] = useState(""); const [ok, setOk] = useState(false);
  const nw = data.nw || NW;
  const tryPin = () => { if (pin === nw.pin) setOk(true); else { alert("Wrong PIN"); setPin(""); } };
  if (!open) return <button style={{ display: "flex", alignItems: "center", gap: 4, padding: "8px 0", borderRadius: 7, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", color: "#3b4557", fontSize: 10, fontWeight: 600, cursor: "pointer", width: "100%", justifyContent: "center", marginTop: 6 }} onClick={() => setOpen(true)}><Lock size={12} /> Net Worth</button>;
  return <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 9, padding: 10, border: "1px solid rgba(255,255,255,0.04)", marginTop: 6 }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ fontSize: 13, fontWeight: 700 }}>Net Worth</span><button style={S.ib} onClick={() => { setOpen(false); setOk(false); setPin(""); }}><X size={14} /></button></div>
    {!ok ? <div style={{ display: "flex", gap: 4 }}><input style={{ ...S.inp, flex: 1 }} type="password" placeholder="PIN" value={pin} onChange={e => setPin(e.target.value)} onKeyDown={e => e.key === "Enter" && tryPin()} /><button style={{ padding: "8px 12px", borderRadius: 6, background: "#34d399", color: "#0b0e13", border: "none", fontWeight: 700, cursor: "pointer" }} onClick={tryPin}>Go</button></div>
      : <div>
        {nw.cats.map((c, i) => <div key={i} style={{ marginBottom: 6 }}><span style={{ fontSize: 10, fontWeight: 700, color: "#6b7a8d" }}>{c.t}</span>{c.items.map((x, j) => <div key={j} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, padding: "1px 0" }}><span style={{ color: "#94a3b8" }}>{x.n}</span><span style={{ color: "#34d399", fontWeight: 600 }}>{fmt$(x.v)}</span></div>)}</div>)}
        <div style={{ borderTop: "2px solid rgba(52,211,153,0.15)", paddingTop: 5, marginTop: 4 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}><span style={{ fontWeight: 700 }}>Gross</span><span style={{ fontWeight: 800, color: "#34d399" }}>{fmt$(nw.gross)}</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}><span style={{ color: "#f87171" }}>Debt</span><span style={{ color: "#f87171" }}>-{fmt$(nw.debt)}</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, marginTop: 3 }}><span style={{ fontWeight: 900 }}>NET</span><span style={{ fontWeight: 900, color: "#34d399" }}>{fmt$(nw.net)}</span></div>
        </div>
      </div>}
  </div>;
}

/* ═══ HOME ═══ */
function HomePage({ data, go, onTalk }) {
  const [showAI, setShowAI] = useState(false);
  const [yrOpen, setYrOpen] = useState(false); const [selYr, setSelYr] = useState(null);
  const t = td();
  const up = [...data.sc].filter(s => s.d >= t && s.st !== "completed").sort((a, b) => a.d.localeCompare(b.d));
  const todJ = up.filter(s => s.d === t); const nxt = up.filter(s => s.d !== t).slice(0, 5);
  const tR = data.jb.reduce((s, j) => s + Number(j.p || 0), 0);
  const tE = data.jb.reduce((s, j) => s + Number(j.ex || 0), 0);
  const tH = data.jb.reduce((s, j) => s + Number(j.h || 0), 0);
  const pend = data.jb.filter(j => j.ps === "pending"); const pendTot = pend.reduce((s, j) => s + Number(j.p || 0), 0);
  const getMonthly = (year) => MO.map((_, i) => { const mj = data.jb.filter(j => { const d = new Date(j.d + "T12:00:00"); return d.getFullYear() === year && d.getMonth() === i; }); return { m: MO[i], r: mj.reduce((s, j) => s + Number(j.p || 0), 0), e: mj.reduce((s, j) => s + Number(j.ex || 0), 0) }; }).filter(x => x.r > 0 || x.e > 0);

  return <div style={S.pg}>
    {/* Header */}
    <div style={{ background: "linear-gradient(135deg,#0f1923,#162030)", borderRadius: 12, padding: "12px 14px", margin: "0 0 10px", display: "flex", alignItems: "center", gap: 10, border: "1px solid rgba(52,211,153,0.15)" }}>
      <div style={{ width: 42, height: 42, borderRadius: 10, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, border: "2px solid rgba(52,211,153,0.25)" }}>🌿</div>
      <div style={{ flex: 1 }}><h1 style={{ margin: 0, fontSize: 16, fontWeight: 900, color: "#34d399", letterSpacing: "0.04em" }}>{data.biz?.name}</h1><p style={{ margin: 0, fontSize: 10, color: "#6b7a8d" }}>{data.biz?.owner} · {data.biz?.phone}</p></div>
      <button onClick={onTalk} style={{ width: 38, height: 38, borderRadius: 19, background: "linear-gradient(135deg,#34d399,#10b981)", border: "none", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 12px rgba(52,211,153,0.3)" }}><Mic size={18} /></button>
    </div>

    {/* All-Time Stats */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
      <div style={S.stat}><span style={S.stL}>All-Time Revenue</span><span style={S.stV}>{fmt$(tR)}</span></div>
      <div style={S.stat}><span style={S.stL}>All-Time Expenses</span><span style={{ ...S.stV, color: "#f87171" }}>{fmt$(tE)}</span></div>
    </div>
    <div style={{ background: "linear-gradient(135deg,rgba(52,211,153,0.08),rgba(52,211,153,0.02))", borderRadius: 9, padding: "8px 10px", border: "1px solid rgba(52,211,153,0.12)", marginTop: 5, textAlign: "center" }}>
      <span style={{ fontSize: 9, color: "#5a6577", textTransform: "uppercase", fontWeight: 700 }}>All-Time Profit · {data.jb.length} jobs · {tH}h · ~{fmt$(tH > 0 ? Math.round(tR / tH) : 0)}/hr avg</span>
      <span style={{ display: "block", fontSize: 22, fontWeight: 900, color: "#34d399" }}>{fmt$(tR - tE)}</span>
    </div>

    {/* Yearly */}
    <button onClick={() => setYrOpen(!yrOpen)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 12px", borderRadius: 8, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", cursor: "pointer", color: "#6b7a8d", marginTop: 6 }}>
      <span style={{ fontSize: 11, fontWeight: 700 }}>YEARLY BREAKDOWN</span>
      {yrOpen ? <EyeOff size={14} /> : <Eye size={14} />}
    </button>
    {yrOpen && <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 4, marginTop: 5 }}>
        {(data.yr || YR).map(y => <button key={y.y} onClick={() => setSelYr(selYr === y.y ? null : y.y)} style={{ background: selYr === y.y ? "rgba(52,211,153,0.08)" : "rgba(255,255,255,0.025)", borderRadius: 7, padding: "5px 3px", textAlign: "center", border: selYr === y.y ? "1px solid rgba(52,211,153,0.2)" : "1px solid rgba(255,255,255,0.04)", cursor: "pointer" }}>
          <span style={{ display: "block", fontSize: 10, color: "#6b7a8d", fontWeight: 700 }}>{y.y}</span>
          <span style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#e2e8f0" }}>{fmt$(y.r)}</span>
          <span style={{ display: "block", fontSize: 10, color: y.p >= 0 ? "#34d399" : "#f87171", fontWeight: 600 }}>P: {fmt$(y.p)}</span>
        </button>)}
      </div>
      {selYr && <div style={{ marginTop: 5, padding: "8px 10px", background: "rgba(255,255,255,0.02)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8" }}>{selYr} Monthly</span><span style={{ fontSize: 9, color: "#5a6577" }}>Rev / Exp / Profit</span></div>
        {getMonthly(selYr).length === 0 ? <p style={{ fontSize: 11, color: "#3b4557" }}>Yearly totals above are from your records. Add jobs with {selYr} dates to see monthly breakdown.</p>
          : getMonthly(selYr).map(m => <div key={m.m} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", fontSize: 12 }}>
            <span style={{ color: "#94a3b8", fontWeight: 600, width: 32 }}>{m.m}</span>
            <span style={{ color: "#e2e8f0", flex: 1, textAlign: "right" }}>{fmt$(m.r)}</span>
            <span style={{ color: "#f87171", flex: 1, textAlign: "right" }}>{fmt$(m.e)}</span>
            <span style={{ color: m.r - m.e >= 0 ? "#34d399" : "#f87171", fontWeight: 700, flex: 1, textAlign: "right" }}>{fmt$(m.r - m.e)}</span>
          </div>)}
      </div>}
    </>}

    {/* Actions */}
    <div style={{ display: "flex", gap: 5, margin: "8px 0" }}>
      <button style={S.pBtn} onClick={() => go("schedule")}><Plus size={14} /> Schedule</button>
      <button style={S.sBtn} onClick={() => window.open(GSHEET, "_blank")}><Table2 size={14} /> Quote</button>
      <button style={{ padding: "9px 12px", borderRadius: 8, background: "rgba(96,165,250,0.08)", color: "#60a5fa", border: "1px solid rgba(96,165,250,0.12)", cursor: "pointer", display: "flex", alignItems: "center" }} onClick={() => setShowAI(true)}><Bot size={16} /></button>
    </div>

    {/* Pending */}
    {pend.length > 0 && <div style={{ background: "rgba(250,204,21,0.04)", borderRadius: 8, padding: "6px 10px", border: "1px solid rgba(250,204,21,0.12)", marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 10, fontWeight: 700, color: "#facc15" }}>PENDING PAYMENTS</span><span style={{ fontSize: 12, fontWeight: 700, color: "#facc15" }}>{fmt$(pendTot)}</span></div>
      {pend.map(j => <div key={j.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "2px 0" }}><span style={{ color: "#e2e8f0" }}>{j.cn}</span><span style={{ color: "#facc15", fontWeight: 700 }}>{fmt$(j.p)}</span></div>)}
    </div>}

    {/* Today + Upcoming */}
    <div style={S.sec}><h3 style={S.secT}>Today</h3>
      {todJ.length === 0 ? <p style={S.em}>Free day.</p> : todJ.map(j => <div key={j.id} style={S.sc}><span style={S.scN}>{j.cn}</span><span style={S.scM}>{j.t || "TBD"} · {j.eh}h · {j.sv}</span></div>)}
    </div>
    <div style={S.sec}><h3 style={S.secT}>Upcoming</h3>
      {nxt.map(j => { const d = dfn(j.d); return <div key={j.id} style={S.sc}><div style={{ display: "flex", justifyContent: "space-between" }}><div><span style={S.scN}>{j.cn}</span><span style={S.scM}>{fDF(j.d)} · {j.t || "TBD"} · {j.sv}</span></div><span style={{ padding: "2px 7px", borderRadius: 10, background: d <= 2 ? "rgba(239,68,68,0.08)" : "rgba(52,211,153,0.06)", color: d <= 2 ? "#f87171" : "#34d399", fontSize: 10, fontWeight: 700 }}>{d <= 0 ? "Now" : d === 1 ? "Tmrw" : `${d}d`}</span></div></div>; })}
      <button style={S.lnk} onClick={() => go("schedule")}>Full schedule →</button>
    </div>

    {/* Leads */}
    {data.ld?.length > 0 && <div style={S.sec}><h3 style={{ ...S.secT, color: "#f59e0b" }}>Leads ({data.ld.length})</h3>
      {data.ld.map(l => <div key={l.id} style={{ ...S.sc, borderLeft: "3px solid rgba(245,158,11,0.25)" }}><span style={S.scN}>{l.cn}</span><span style={S.scM}>{l.sv}</span></div>)}
    </div>}

    {/* Stats row */}
    <div style={{ display: "flex", justifyContent: "space-around", background: "rgba(255,255,255,0.02)", borderRadius: 8, padding: "10px 0" }}>
      {[{ n: data.cl.length, l: "Clients" }, { n: data.jb.length, l: "Jobs" }, { n: up.length, l: "Queued" }, { n: pend.length, l: "Pending", y: true }].map((x, i) => <div key={i} style={{ textAlign: "center" }}><span style={{ display: "block", fontSize: 15, fontWeight: 800, color: x.y && x.n > 0 ? "#facc15" : "#f1f5f9" }}>{x.n}</span><span style={{ fontSize: 8, color: "#5a6577", textTransform: "uppercase", fontWeight: 600 }}>{x.l}</span></div>)}
    </div>
    <Vault data={data} />
    {showAI && <AIChat data={data} onClose={() => setShowAI(false)} />}
  </div>;
}

/* ═══ SCHEDULE (Week View) ═══ */
function Sched({ data, setData }) {
  const [sf, setSf] = useState(false); const [ed, setEd] = useState(null);
  const [ws, setWs] = useState(() => { const d = new Date(); d.setDate(d.getDate() - d.getDay()); return d.toISOString().split("T")[0]; });
  const bl = { cn: "", d: td(), t: "09:00", eh: "2", sv: "", n: "", st: "scheduled" }; const [fm, setFm] = useState(bl);
  const wd = useMemo(() => { const r = []; const w = new Date(ws + "T12:00:00"); for (let i = 0; i < 7; i++) { const x = new Date(w); x.setDate(w.getDate() + i); r.push(x.toISOString().split("T")[0]); } return r; }, [ws]);
  const svS = () => { if (!fm.cn.trim()) return; let u; if (ed) u = { ...data, sc: data.sc.map(s => s.id === ed ? { ...fm, id: ed } : s) }; else u = { ...data, sc: [...data.sc, { ...fm, id: uid() }] }; setData(u); save(u); setSf(false); };
  const done = s => { const j = { id: uid(), cn: s.cn, d: s.d, sv: s.sv, h: s.eh, p: "", ex: "0", n: s.n, ps: "pending" }; const u = { ...data, sc: data.sc.map(x => x.id === s.id ? { ...x, st: "completed" } : x), jb: [...data.jb, j] }; setData(u); save(u); };
  const del = id => { if (!confirm("Delete?")) return; const u = { ...data, sc: data.sc.filter(s => s.id !== id) }; setData(u); save(u); };
  const t = td(); const dn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthLabel = new Date(wd[3] + "T12:00:00").toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return <div style={S.pg}>
    <div style={S.ph}><h2 style={S.pt}>Schedule</h2><button style={S.ab} onClick={() => { setFm(bl); setEd(null); setSf(true); }}><Plus size={16} /></button></div>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
      <button style={S.ib} onClick={() => { const w = new Date(ws + "T12:00:00"); w.setDate(w.getDate() - 7); setWs(w.toISOString().split("T")[0]); }}><ChevronLeft size={20} /></button>
      <span style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0" }}>{monthLabel}</span>
      <button style={S.ib} onClick={() => { const w = new Date(ws + "T12:00:00"); w.setDate(w.getDate() + 7); setWs(w.toISOString().split("T")[0]); }}><ChevronRight size={20} /></button>
    </div>

    {/* Full week view - all days visible */}
    {wd.map((d, i) => {
      const dayJobs = data.sc.filter(s => s.d === d && s.st !== "completed").sort((a, b) => (a.t || "").localeCompare(b.t || ""));
      const isToday = d === t; const isPast = d < t;
      return <div key={d} style={{ marginBottom: 6, opacity: isPast ? 0.5 : 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: isToday ? "#34d399" : "#6b7a8d", width: 32 }}>{dn[i]}</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: isToday ? "#34d399" : "#e2e8f0" }}>{new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
          {isToday && <span style={{ fontSize: 9, color: "#34d399", fontWeight: 600, background: "rgba(52,211,153,0.08)", padding: "1px 6px", borderRadius: 8 }}>TODAY</span>}
        </div>
        {dayJobs.length === 0 ? <div style={{ padding: "4px 0 4px 38px", fontSize: 11, color: "#2e3848" }}>—</div>
          : dayJobs.map(j => <div key={j.id} style={{ ...S.sc, marginLeft: 38 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div><span style={S.scN}>{j.cn}</span><span style={S.scM}>{j.t || "TBD"} · {j.eh}h · {j.sv}</span></div>
              <div style={{ display: "flex", gap: 3 }}>
                <button style={{ ...S.gcB, background: "rgba(52,211,153,0.08)", color: "#34d399" }} onClick={() => done(j)}><Check size={12} /></button>
                <button style={S.sm} onClick={() => { setFm({ ...j }); setEd(j.id); setSf(true); }}><Pencil size={10} /></button>
              </div>
            </div>
            {j.n && <p style={{ fontSize: 10, color: "#5a6577", margin: "2px 0 0" }}>{j.n}</p>}
          </div>)}
      </div>;
    })}

    {sf && <Modal title={ed ? "Edit" : "Schedule Job"} onClose={() => setSf(false)}>
      <div style={S.fg}><label style={S.lb}>Client</label><input style={S.inp} value={fm.cn} onChange={e => setFm({ ...fm, cn: e.target.value })} placeholder="Name" /></div>
      <div style={{ display: "flex", gap: 6 }}>
        <div style={{ ...S.fg, flex: 1 }}><label style={S.lb}>Date</label><input style={S.inp} type="date" value={fm.d} onChange={e => setFm({ ...fm, d: e.target.value })} /></div>
        <div style={{ ...S.fg, flex: 1 }}><label style={S.lb}>Time</label><input style={S.inp} type="time" value={fm.t} onChange={e => setFm({ ...fm, t: e.target.value })} /></div>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <div style={{ ...S.fg, flex: 1 }}><label style={S.lb}>Est Hours</label><input style={S.inp} type="number" step=".25" value={fm.eh} onChange={e => setFm({ ...fm, eh: e.target.value })} /></div>
        <div style={{ ...S.fg, flex: 1 }}><label style={S.lb}>Service</label><input style={S.inp} value={fm.sv} onChange={e => setFm({ ...fm, sv: e.target.value })} placeholder="Mulch, Cleanup..." /></div>
      </div>
      <div style={S.fg}><label style={S.lb}>Notes</label><textarea style={S.ta} value={fm.n} onChange={e => setFm({ ...fm, n: e.target.value })} rows={2} /></div>
      <button style={S.saveBtn} onClick={svS}><Check size={14} /> {ed ? "Update" : "Schedule"}</button>
    </Modal>}
  </div>;
}

/* ═══ CLIENTS ═══ */
function ClientsPage({ data, setData }) {
  const [sf, setSf] = useState(false); const [ed, setEd] = useState(null); const [sr, setSr] = useState(""); const [ex, setEx] = useState(null);
  const [fm, setFm] = useState({ name: "", phone: "", address: "", notes: "" });
  const fl = data.cl.filter(c => c.name.toLowerCase().includes(sr.toLowerCase()));
  const svC = () => { if (!fm.name.trim()) return; let u; if (ed) u = { ...data, cl: data.cl.map(c => c.id === ed ? { ...fm, id: ed } : c) }; else u = { ...data, cl: [...data.cl, { ...fm, id: uid() }] }; setData(u); save(u); setSf(false); };
  return <div style={S.pg}>
    <div style={S.ph}><h2 style={S.pt}>Clients ({data.cl.length})</h2><button style={S.ab} onClick={() => { setFm({ name: "", phone: "", address: "", notes: "" }); setEd(null); setSf(true); }}><Plus size={16} /></button></div>
    <div style={S.srB}><Search size={15} /><input style={S.srI} placeholder="Search..." value={sr} onChange={e => setSr(e.target.value)} /></div>
    {fl.map(c => <div key={c.id} style={S.cd} onClick={() => setEx(ex === c.id ? null : c.id)}>
      <div style={{ display: "flex", justifyContent: "space-between" }}><div><span style={S.cdT}>{c.name}</span>{c.phone && <span style={S.cdS}><Phone size={11} /> {c.phone}</span>}</div>
        <button style={S.ibs} onClick={ev => { ev.stopPropagation(); setFm({ ...c }); setEd(c.id); setSf(true); }}><Pencil size={13} /></button></div>
      {ex === c.id && <div style={{ marginTop: 4, fontSize: 11, color: "#6b7a8d" }}>{c.address && <p style={{ margin: "0 0 2px" }}><MapPin size={10} style={{ display: "inline" }} /> {c.address}</p>}{c.notes && <p style={{ margin: 0 }}>{c.notes}</p>}</div>}
    </div>)}
    {sf && <Modal title={ed ? "Edit" : "New Client"} onClose={() => setSf(false)}>
      <div style={S.fg}><label style={S.lb}>Name</label><input style={S.inp} value={fm.name} onChange={e => setFm({ ...fm, name: e.target.value })} /></div>
      <div style={S.fg}><label style={S.lb}>Phone</label><input style={S.inp} type="tel" value={fm.phone} onChange={e => setFm({ ...fm, phone: e.target.value })} /></div>
      <div style={S.fg}><label style={S.lb}>Address</label><input style={S.inp} value={fm.address} onChange={e => setFm({ ...fm, address: e.target.value })} /></div>
      <div style={S.fg}><label style={S.lb}>Notes</label><textarea style={S.ta} value={fm.notes} onChange={e => setFm({ ...fm, notes: e.target.value })} rows={2} /></div>
      <button style={S.saveBtn} onClick={svC}><Check size={14} /> {ed ? "Update" : "Add"}</button>
    </Modal>}
  </div>;
}

/* ═══ JOBS ═══ */
function JobsPage({ data, setData }) {
  const [sf, setSf] = useState(false); const [ed, setEd] = useState(null); const [sr, setSr] = useState(""); const [ex, setEx] = useState(null);
  const bl = { cn: "", d: td(), sv: "", h: "", p: "", ex: "", mat: "", n: "", ps: "paid" }; const [fm, setFm] = useState(bl);
  const sorted = [...data.jb].sort((a, b) => b.d.localeCompare(a.d));
  const fl = sorted.filter(j => j.cn.toLowerCase().includes(sr.toLowerCase()));
  const svJ = () => { if (!fm.cn.trim()) return; let u; if (ed) u = { ...data, jb: data.jb.map(j => j.id === ed ? { ...fm, id: ed } : j) }; else u = { ...data, jb: [...data.jb, { ...fm, id: uid() }] }; setData(u); save(u); setSf(false); };
  const tR = data.jb.reduce((s, j) => s + Number(j.p || 0), 0); const tE = data.jb.reduce((s, j) => s + Number(j.ex || 0), 0);
  return <div style={S.pg}>
    <div style={S.ph}><h2 style={S.pt}>Jobs ({data.jb.length})</h2><button style={S.ab} onClick={() => { setFm(bl); setEd(null); setSf(true); }}><Plus size={16} /></button></div>
    <div style={{ display: "flex", gap: 8, marginBottom: 6, padding: "5px 8px", borderRadius: 6, background: "rgba(255,255,255,0.02)", fontSize: 12 }}>
      <span style={{ color: "#e2e8f0", fontWeight: 600 }}>Rev {fmt$(tR)}</span>
      <span style={{ color: "#f87171", fontWeight: 600 }}>Exp {fmt$(tE)}</span>
      <span style={{ color: "#34d399", fontWeight: 700 }}>Profit {fmt$(tR - tE)}</span>
    </div>
    <div style={S.srB}><Search size={15} /><input style={S.srI} placeholder="Search..." value={sr} onChange={e => setSr(e.target.value)} /></div>
    {fl.map(j => { const pr = Number(j.p || 0) - Number(j.ex || 0); const hrs = Number(j.h || 0); const isE = ex === j.id;
      return <div key={j.id} style={{ ...S.cd, ...(j.ps === "pending" ? { borderLeft: "3px solid #facc15" } : {}) }} onClick={() => setEx(isE ? null : j.id)}>
        <div style={{ display: "flex", justifyContent: "space-between" }}><div><span style={S.cdT}>{j.cn}{j.ps === "pending" ? " ⏳" : ""}</span><span style={S.cdS}>{fD(j.d)} · {hrs}h · {j.sv}</span></div>
          <div style={{ textAlign: "right" }}><span style={{ fontSize: 14, fontWeight: 700, color: "#34d399" }}>{fmt$(j.p)}</span>{Number(j.ex) > 0 && <div style={{ fontSize: 10, color: "#f87171" }}>-{fmt$(j.ex)}</div>}</div></div>
        {isE && <div style={{ marginTop: 5, paddingTop: 5, borderTop: "1px solid rgba(255,255,255,0.04)", fontSize: 11, color: "#94a3b8" }}>
          {j.mat && <p style={{ margin: "0 0 2px" }}><b>Materials:</b> {j.mat}</p>}
          {j.n && <p style={{ margin: "0 0 2px" }}><b>Notes:</b> {j.n}</p>}
          <p style={{ margin: 0 }}><b>Profit:</b> <span style={{ color: "#34d399" }}>{fmt$(pr)}</span>{hrs > 0 && ` · ${fmt$(Math.round(pr / hrs))}/hr`}</p>
          <div style={{ display: "flex", gap: 4, marginTop: 5 }}>
            <button style={S.sm} onClick={e => { e.stopPropagation(); setFm({ ...j }); setEd(j.id); setSf(true); }}><Pencil size={11} /></button>
            <button style={S.sm} onClick={e => { e.stopPropagation(); const u = { ...data, jb: data.jb.map(x => x.id === j.id ? { ...x, ps: j.ps === "pending" ? "paid" : "pending" } : x) }; setData(u); save(u); }}>{j.ps === "pending" ? "✅ Paid" : "⏳ Pending"}</button>
            <button style={{ ...S.sm, color: "#f87171" }} onClick={e => { e.stopPropagation(); if (!confirm("Delete?")) return; const u = { ...data, jb: data.jb.filter(x => x.id !== j.id) }; setData(u); save(u); }}><Trash2 size={11} /></button>
          </div>
        </div>}
      </div>; })}
    {sf && <Modal title={ed ? "Edit" : "Log Job"} onClose={() => setSf(false)}>
      <div style={S.fg}><label style={S.lb}>Client</label><input style={S.inp} value={fm.cn} onChange={e => setFm({ ...fm, cn: e.target.value })} /></div>
      <div style={{ display: "flex", gap: 6 }}>
        <div style={{ ...S.fg, flex: 1 }}><label style={S.lb}>Date</label><input style={S.inp} type="date" value={fm.d} onChange={e => setFm({ ...fm, d: e.target.value })} /></div>
        <div style={{ ...S.fg, flex: 1 }}><label style={S.lb}>Service</label><input style={S.inp} value={fm.sv} onChange={e => setFm({ ...fm, sv: e.target.value })} /></div>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <div style={{ ...S.fg, flex: 1 }}><label style={S.lb}>Hours</label><input style={S.inp} type="number" step=".25" value={fm.h} onChange={e => setFm({ ...fm, h: e.target.value })} /></div>
        <div style={{ ...S.fg, flex: 1 }}><label style={S.lb}>Paid $</label><input style={S.inp} type="number" value={fm.p} onChange={e => setFm({ ...fm, p: e.target.value })} /></div>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <div style={{ ...S.fg, flex: 1 }}><label style={S.lb}>Expenses $</label><input style={S.inp} type="number" value={fm.ex} onChange={e => setFm({ ...fm, ex: e.target.value })} /></div>
        <div style={{ ...S.fg, flex: 1 }}><label style={S.lb}>Materials</label><input style={S.inp} value={fm.mat} onChange={e => setFm({ ...fm, mat: e.target.value })} /></div>
      </div>
      <div style={S.fg}><label style={S.lb}>Notes</label><textarea style={S.ta} value={fm.n} onChange={e => setFm({ ...fm, n: e.target.value })} rows={2} /></div>
      <button style={S.saveBtn} onClick={svJ}><Check size={14} /> {ed ? "Update" : "Save"}</button>
    </Modal>}
  </div>;
}

/* ═══ QUOTES ═══ */
function QuotesPage({ data, setData }) {
  const [sb, setSb] = useState(false); const [ed, setEd] = useState(null); const [ex, setEx] = useState(null); const [cp, setCp] = useState(false);
  const bQ = { cn: "", d: td(), li: [], n: "", st: "draft", tot: 0 }; const [fm, setFm] = useState(bQ);
  const cats = [...new Set(data.pr.map(p => p.cat))];
  const aL = p => setFm(f => ({ ...f, li: [...f.li, { nm: p.nm, q: 1, pr: p.pr, t: p.pr }] }));
  const uQ = (i, q) => setFm(f => ({ ...f, li: f.li.map((l, j) => j === i ? { ...l, q: Number(q), t: Number(q) * l.pr } : l) }));
  const tot = fm.li.reduce((s, l) => s + l.t, 0);
  const svQ = s => { if (!fm.cn.trim()) return; const e = { ...fm, tot, st: s }; let u; if (ed) u = { ...data, qt: data.qt.map(q => q.id === ed ? { ...e, id: ed } : q) }; else u = { ...data, qt: [...data.qt, { ...e, id: uid() }] }; setData(u); save(u); setSb(false); };
  const gT = q => { const c = q || fm; let t = `QUOTE\n${c.cn}\n---\n`; (c.li || []).forEach(l => t += `${l.nm} x${l.q}: ${fmt$(l.t)}\n`); t += `---\nTOTAL: ${fmt$(c.tot || tot)}\n\n— ${data.biz?.owner}, ${data.biz?.name}`; return t; };
  const copy = q => { navigator.clipboard.writeText(gT(q)); setCp(q?.id || "n"); setTimeout(() => setCp(false), 2e3); };
  const fQ = [...data.qt].sort((a, b) => (b.d || "").localeCompare(a.d || ""));
  return <div style={S.pg}>
    <div style={S.ph}><h2 style={S.pt}>Quotes ({data.qt.length})</h2>
      <div style={{ display: "flex", gap: 4 }}>
        <button style={S.ab} onClick={() => { setFm(bQ); setEd(null); setSb(true); }}><Plus size={16} /></button>
        <a href={GSHEET} target="_blank" rel="noopener" style={{ ...S.ab, background: "rgba(96,165,250,0.12)", color: "#60a5fa", textDecoration: "none" }}><Table2 size={16} /></a>
      </div>
    </div>
    {fQ.map(q => { const isE = ex === q.id; const sc = { draft: "#94a3b8", sent: "#60a5fa", accepted: "#34d399", declined: "#f87171" }; return <div key={q.id} style={S.cd} onClick={() => setEx(isE ? null : q.id)}>
      <div style={{ display: "flex", justifyContent: "space-between" }}><div><span style={S.cdT}>{q.cn}</span><span style={S.cdS}>{fD(q.d)}</span></div><div style={{ textAlign: "right" }}><span style={{ fontSize: 14, fontWeight: 700, color: "#34d399" }}>{fmt$(q.tot)}</span><span style={{ display: "block", fontSize: 10, color: sc[q.st], fontWeight: 600 }}>{q.st}</span></div></div>
      {isE && <div style={{ marginTop: 5, paddingTop: 5, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        {q.li?.map((l, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#94a3b8" }}><span>{l.nm} x{l.q}</span><span>{fmt$(l.t)}</span></div>)}
        {q.n && <p style={{ fontSize: 11, color: "#5a6577", marginTop: 3 }}>{q.n}</p>}
        <div style={{ display: "flex", gap: 3, marginTop: 5 }}>
          <button style={S.sm} onClick={e => { e.stopPropagation(); copy(q); }}>{cp === q.id ? <Check size={11} /> : <Copy size={11} />}</button>
          <button style={S.sm} onClick={e => { e.stopPropagation(); setFm({ ...q }); setEd(q.id); setSb(true); }}><Pencil size={11} /></button>
        </div>
      </div>}
    </div>; })}
    {sb && <Modal title={ed ? "Edit" : "Build Quote"} onClose={() => setSb(false)}>
      <div style={S.fg}><label style={S.lb}>Client</label><input style={S.inp} value={fm.cn} onChange={e => setFm({ ...fm, cn: e.target.value })} /></div>
      <div style={S.fg}><label style={S.lb}>Services</label>{cats.map(cat => <div key={cat} style={{ marginBottom: 5 }}><span style={{ fontSize: 9, fontWeight: 700, color: "#5a6577" }}>{cat}</span><div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginTop: 2 }}>{data.pr.filter(p => p.cat === cat).map(p => <button key={p.id} style={{ padding: "3px 6px", borderRadius: 5, background: "rgba(255,255,255,0.03)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.04)", fontSize: 10, cursor: "pointer" }} onClick={() => aL(p)}>+ {p.nm} {fmt$(p.pr)}</button>)}</div></div>)}</div>
      {fm.li.length > 0 && <>
        {fm.li.map((l, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 0", borderBottom: "1px solid rgba(255,255,255,0.03)" }}><span style={{ flex: 1, fontSize: 12, color: "#e2e8f0" }}>{l.nm}</span><input style={{ width: 38, padding: 3, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 4, color: "#e2e8f0", fontSize: 12, textAlign: "center", outline: "none" }} type="number" min=".5" step=".5" value={l.q} onChange={e => uQ(i, e.target.value)} /><span style={{ fontSize: 12, fontWeight: 700, color: "#34d399", minWidth: 48, textAlign: "right" }}>{fmt$(l.t)}</span><button style={S.ibs} onClick={() => setFm(f => ({ ...f, li: f.li.filter((_, j) => j !== i) }))}><X size={13} /></button></div>)}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: "2px solid rgba(52,211,153,0.15)" }}><span style={{ fontWeight: 700, fontSize: 14 }}>Total</span><span style={{ fontSize: 18, fontWeight: 800, color: "#34d399" }}>{fmt$(tot)}</span></div>
        <div style={S.fg}><label style={S.lb}>Notes</label><textarea style={S.ta} value={fm.n} onChange={e => setFm({ ...fm, n: e.target.value })} rows={2} /></div>
        <div style={{ display: "flex", gap: 6 }}><button style={{ ...S.saveBtn, flex: 1 }} onClick={() => svQ("draft")}>Draft</button><button style={{ ...S.saveBtn, flex: 1, background: "#60a5fa" }} onClick={() => { svQ("sent"); copy(); }}>Save+Copy</button></div>
      </>}
    </Modal>}
  </div>;
}

/* ═══ APP ═══ */
export default function App() {
  const [data, setData] = useState(null); const [tab, setTab] = useState("home"); const [showTalk, setShowTalk] = useState(false);
  useEffect(() => { load().then(d => { if (d && d.jb && d.jb.length > 0) setData(d); else { setData(SEED); save(SEED); } }); }, []);
  useEffect(() => { if (!document.getElementById("fw-f")) { const l = document.createElement("link"); l.id = "fw-f"; l.rel = "stylesheet"; l.href = "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap"; document.head.appendChild(l); } }, []);
  if (!data) return <div style={{ fontFamily: "'Outfit',sans-serif", background: "#0b0e13", display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", flexDirection: "column", gap: 8 }}><div style={{ fontSize: 36 }}>🌿</div><h1 style={{ fontSize: 20, fontWeight: 900, color: "#34d399", letterSpacing: "0.1em", margin: 0 }}>FIELDWORK</h1></div>;
  const tabs = [{ id: "home", icon: HomeIcon, l: "Home" }, { id: "schedule", icon: Calendar, l: "Schedule" }, { id: "clients", icon: Users, l: "Clients" }, { id: "jobs", icon: ClipboardList, l: "Jobs" }, { id: "quotes", icon: FileText, l: "Quotes" }];
  const sd = d => { setData(d); save(d); };
  return <div style={{ fontFamily: "'Outfit',sans-serif", background: "#0b0e13", color: "#e2e8f0", minHeight: "100vh", maxWidth: 480, margin: "0 auto", position: "relative" }}>
    <div style={{ paddingBottom: 70 }}>
      {tab === "home" && <HomePage data={data} go={setTab} onTalk={() => setShowTalk(true)} />}
      {tab === "schedule" && <Sched data={data} setData={sd} />}
      {tab === "clients" && <ClientsPage data={data} setData={sd} />}
      {tab === "jobs" && <JobsPage data={data} setData={sd} />}
      {tab === "quotes" && <QuotesPage data={data} setData={sd} />}
    </div>
    <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, display: "flex", background: "rgba(11,14,19,.97)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,.06)", padding: "6px 0 env(safe-area-inset-bottom,8px)", zIndex: 100 }}>
      {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "5px 0", background: "none", border: "none", color: tab === t.id ? "#34d399" : "#4b5563", cursor: "pointer" }}>
        <t.icon size={22} strokeWidth={tab === t.id ? 2.5 : 1.5} /><span style={{ fontSize: 10, fontWeight: tab === t.id ? 700 : 500 }}>{t.l}</span>
      </button>)}
    </div>
    {showTalk && <AIChat data={data} onClose={() => setShowTalk(false)} />}
  </div>;
}

/* ═══ STYLES ═══ */
const S = {
  pg: { padding: "10px" }, ph: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  pt: { fontSize: 18, fontWeight: 800, color: "#f1f5f9", margin: 0 },
  stat: { background: "rgba(255,255,255,.03)", borderRadius: 9, padding: "8px 10px", border: "1px solid rgba(255,255,255,.04)" },
  stL: { display: "block", fontSize: 9, color: "#5a6577", textTransform: "uppercase", fontWeight: 700, marginBottom: 2 },
  stV: { display: "block", fontSize: 17, fontWeight: 800, color: "#f1f5f9" },
  pBtn: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 4, padding: "10px 0", background: "#34d399", color: "#0b0e13", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer" },
  sBtn: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 4, padding: "10px 0", background: "rgba(255,255,255,.06)", color: "#d1d5db", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer" },
  ab: { width: 34, height: 34, borderRadius: 8, background: "#34d399", color: "#0b0e13", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
  ib: { background: "none", border: "none", color: "#6b7a8d", cursor: "pointer", padding: 3, display: "flex", alignItems: "center" },
  ibs: { background: "none", border: "none", color: "#4b5563", cursor: "pointer", padding: 2, display: "flex", alignItems: "center" },
  sm: { display: "flex", alignItems: "center", gap: 3, padding: "4px 8px", borderRadius: 5, background: "rgba(255,255,255,.05)", color: "#c9cdd4", border: "none", fontSize: 10, fontWeight: 600, cursor: "pointer" },
  lnk: { background: "none", border: "none", color: "#34d399", fontSize: 11, fontWeight: 600, cursor: "pointer", padding: "4px 0" },
  saveBtn: { width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "12px 0", background: "#34d399", color: "#0b0e13", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", marginTop: 4 },
  sec: { marginBottom: 12 }, secT: { fontSize: 10, fontWeight: 700, color: "#6b7a8d", marginBottom: 5, textTransform: "uppercase", letterSpacing: ".04em" },
  em: { color: "#2e3848", fontSize: 11, textAlign: "center", padding: "10px 0" },
  cd: { background: "rgba(255,255,255,.03)", borderRadius: 9, padding: "10px 11px", marginBottom: 5, border: "1px solid rgba(255,255,255,.04)", cursor: "pointer" },
  cdT: { fontSize: 13, fontWeight: 700, color: "#f1f5f9", display: "block" },
  cdS: { display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: "#6b7a8d", marginTop: 2 },
  sc: { background: "rgba(255,255,255,.03)", borderRadius: 9, padding: "8px 11px", marginBottom: 4, border: "1px solid rgba(255,255,255,.04)" },
  scN: { fontSize: 13, fontWeight: 700, color: "#f1f5f9", display: "block" },
  scM: { fontSize: 10, color: "#6b7a8d", marginTop: 1, display: "block" },
  gcB: { width: 26, height: 26, borderRadius: 6, background: "rgba(96,165,250,.08)", color: "#60a5fa", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
  srB: { display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,.03)", borderRadius: 7, padding: "7px 9px", marginBottom: 8, border: "1px solid rgba(255,255,255,.04)", color: "#6b7a8d" },
  srI: { flex: 1, background: "none", border: "none", color: "#e2e8f0", fontSize: 13, outline: "none" },
  ov: { position: "fixed", inset: 0, background: "rgba(0,0,0,.55)", backdropFilter: "blur(5px)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" },
  mod: { background: "#111620", borderRadius: "14px 14px 0 0", width: "100%", maxWidth: 480, maxHeight: "88vh", border: "1px solid rgba(255,255,255,.05)", borderBottom: "none", display: "flex", flexDirection: "column" },
  mh: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 12px 0" },
  mt: { fontSize: 15, fontWeight: 800, color: "#f1f5f9", margin: 0 },
  mb: { flex: 1, overflowY: "auto", padding: "8px 12px 20px" },
  fg: { marginBottom: 10 },
  lb: { display: "flex", alignItems: "center", fontSize: 10, fontWeight: 700, color: "#6b7a8d", marginBottom: 3, textTransform: "uppercase" },
  inp: { width: "100%", padding: "9px 10px", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 7, color: "#e2e8f0", fontSize: 13, outline: "none", boxSizing: "border-box" },
  ta: { width: "100%", padding: "9px 10px", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 7, color: "#e2e8f0", fontSize: 13, outline: "none", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box", minHeight: 44 },
};