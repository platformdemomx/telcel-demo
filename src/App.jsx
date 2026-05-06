import { useState, useEffect } from "react";

const C = {
  bg:"#161616", surface:"#262626", surface2:"#393939",
  border:"#393939", border2:"#525252",
  blue:"#0F62FE", blueLight:"#78A9FF", blueDim:"#1D3461",
  purple:"#8B5CF6", purpleLight:"#BE95FF", purpleDim:"#2D1B69",
  green:"#42BE65", greenLight:"#6FDC8C", greenDim:"#0D3B21",
  orange:"#FF832B", orangeLight:"#FFB784", orangeDim:"3D1F00",
  yellow:"#F1C21B", red:"#FA4D56",
  text:"#F4F4F4", textMid:"#A8A8A8", textDim:"#6F6F6F", textDisabled:"#525252",
};

// ─── PASSWORD GATE  ────────────────────────────────────────────────────────────
const ACCESS_CODE = "terraform24";

function PasswordGate({ onUnlock }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const attempt = () => {
    if (input.toLowerCase() === ACCESS_CODE) {
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setInput("");
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div style={{ minHeight:"100vh", background:C.bg, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"32px 24px", fontFamily:"'IBM Plex Sans','Segoe UI',sans-serif" }}>
      <div style={{ width:"100%", maxWidth:"340px", animation:"fadeUp 0.5s ease" }}>
        <div style={{ width:"48px", height:"48px", background:C.purple, borderRadius:"12px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"20px", fontWeight:"800", color:"white", fontFamily:"'IBM Plex Mono',monospace", marginBottom:"28px" }}>tf</div>

        <h1 style={{ fontSize:"24px", fontWeight:"800", color:C.text, margin:"0 0 6px" }}>Acceso restringido</h1>
        <p style={{ fontSize:"13px", color:C.textMid, margin:"0 0 32px", lineHeight:"1.6" }}>Ingresa la clave de acceso para continuar.</p>

        <div style={{
          animation: shake ? "shake 0.4s ease" : "none",
          marginBottom:"12px",
        }}>
          <input
            type="password"
            value={input}
            onChange={e => { setInput(e.target.value); setError(false); }}
            onKeyDown={e => e.key === "Enter" && attempt()}
            placeholder="Clave de acceso"
            style={{
              width:"100%", padding:"14px 16px",
              background:C.surface,
              border:`1px solid ${error ? "#FA4D56" : C.border}`,
              borderRadius:"10px", color:C.text,
              fontSize:"15px", fontFamily:"inherit",
              outline:"none", letterSpacing:"2px",
              transition:"border 0.2s",
            }}
          />
          {error && <div style={{ color:"#FA4D56", fontSize:"12px", marginTop:"6px", marginLeft:"2px" }}>Clave incorrecta. Intenta de nuevo.</div>}
        </div>

        <button onClick={attempt} style={{
          width:"100%", padding:"14px",
          background:C.blue, border:"none", borderRadius:"10px",
          color:"white", fontSize:"14px", fontWeight:"700",
          cursor:"pointer", fontFamily:"inherit",
        }}>
          Entrar →
        </button>
      </div>

      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0);}
          20%{transform:translateX(-8px);}
          40%{transform:translateX(8px);}
          60%{transform:translateX(-6px);}
          80%{transform:translateX(6px);}
        }
      `}</style>
    </div>
  );
}
function HookScene() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 400);
    const t2 = setTimeout(() => setStep(2), 1000);
    const t3 = setTimeout(() => setStep(3), 1700);
    return () => [t1,t2,t3].forEach(clearTimeout);
  }, []);

  return (
    <div style={{ padding:"44px 24px 32px", minHeight:"72vh", display:"flex", flexDirection:"column", justifyContent:"center" }}>
      <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"11px", color:C.blueLight, letterSpacing:"2px", marginBottom:"24px", opacity: step>=1?1:0, transition:"opacity 0.6s" }}>
        $ terraform init telcel-plataforma
      </div>
      <h1 style={{ fontSize:"34px", fontWeight:"800", margin:"0 0 16px", color:C.text, lineHeight:1.1, opacity:step>=1?1:0, transform:step>=1?"none":"translateY(10px)", transition:"all 0.6s" }}>
        Lo que describieron hoy<br />ya se puede construir.
      </h1>
      <div style={{ opacity:step>=3?1:0, transform:step>=3?"none":"translateY(8px)", transition:"all 0.6s" }}>
        <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:"12px", padding:"16px" }}>
          {[
            ["📋","Catálogo de aprovisionamiento"],
            ["📐","Clasificación por perfil y tamaño"],
            ["⚡","Menos fricción en cada cambio"],
          ].map(([icon,label],i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:"12px", padding:"9px 0", borderBottom:i<2?`1px solid ${C.border}`:"none" }}>
              <span style={{ fontSize:"16px" }}>{icon}</span>
              <span style={{ fontSize:"13px", color:C.text, fontWeight:"500" }}>{label}</span>
              <span style={{ marginLeft:"auto", color:C.green, fontSize:"12px" }}>✓</span>
            </div>
          ))}
        </div>
        <p style={{ margin:"20px 0 0", fontSize:"13px", color:C.textMid, lineHeight:"1.7" }}>
          Lo que van a ver a continuación implementa exactamente lo que describieron — en un flujo que su equipo puede operar desde hoy.
        </p>
      </div>
    </div>
  );
}

// ─── ARCHITECTURE DIAGRAM ─────────────────────────────────────────────────────
function ArchScene() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const timers = [1,2,3,4,5].map((n,i) => setTimeout(() => setStep(n), 400 + i*700));
    return () => timers.forEach(clearTimeout);
  }, []);

  const fade = (n) => ({ opacity:step>=n?1:0, transform:step>=n?"translateY(0)":"translateY(10px)", transition:"all 0.5s ease" });

  const Box = ({ n, color, icon, label, sub, wide }) => (
    <div style={{ ...fade(n), background:C.surface, border:`1px solid ${step>=n?color:C.border}`, borderRadius:"10px", padding:"10px 14px", display:"flex", alignItems:"center", gap:"10px", boxShadow:step>=n?`0 0 14px ${color}22`:"none", ...(wide?{gridColumn:"1/-1"}:{}) }}>
      <span style={{ fontSize:"20px", flexShrink:0 }}>{icon}</span>
      <div>
        <div style={{ fontSize:"12px", fontWeight:"700", color:step>=n?color:C.textDim, fontFamily:"'IBM Plex Mono',monospace" }}>{label}</div>
        {sub && <div style={{ fontSize:"10px", color:C.textMid }}>{sub}</div>}
      </div>
    </div>
  );

  const Arrow = ({ n }) => (
    <div style={{ display:"flex", justifyContent:"center", ...fade(n), margin:"-2px 0" }}>
      <div style={{ width:"1px", height:"20px", background:C.textDim, position:"relative" }}>
        <div style={{ position:"absolute", bottom:"-4px", left:"-4px", width:0, height:0, borderLeft:"4px solid transparent", borderRight:"4px solid transparent", borderTop:`6px solid ${C.textDim}` }} />
      </div>
    </div>
  );

  return (
    <div style={{ padding:"20px 16px" }}>
      <div style={{ fontSize:"10px", fontWeight:"700", color:C.blueLight, letterSpacing:"2px", textTransform:"uppercase", marginBottom:"4px" }}>DIAGRAMA DE ARQUITECTURA</div>
      <h2 style={{ fontSize:"18px", fontWeight:"700", margin:"0 0 20px", color:C.text }}>El flujo completo.</h2>
      <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
        <Box n={1} color={C.blue}   icon="👤" label="Equipo de desarrollo" sub="Solicita un namespace vía portal" />
        <Arrow n={1} />
        <Box n={2} color={C.purple} icon="🌐" label="Portal de autoservicio" sub="Elige perfil, tamaño y plataforma destino" />
        <Arrow n={2} />
        <Box n={3} color={C.yellow} icon="✅" label="Aprobación del equipo de plataforma" sub="Revisa el plan generado por Terraform" />
        <Arrow n={3} />
        <Box n={4} color={C.orange} icon="⚙️" label="Terraform Enterprise" sub="Genera, planea y aplica la configuración" />
        <Arrow n={4} />
        <div style={{ ...fade(5), display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
          {[
            [C.green,"☸️","Kubernetes","On-premise"],
            [C.red,"🔴","OpenShift","On-premise"],
            [C.blue,"☁️","GCP","Google Cloud"],
            [C.purple,"🌐","IBM Cloud","Cloud"],
          ].map(([color,icon,label,sub],i) => (
            <div key={i} style={{ background:C.surface, border:`1px solid ${color}`, borderRadius:"10px", padding:"10px", textAlign:"center", boxShadow:`0 0 10px ${color}22` }}>
              <div style={{ fontSize:"18px" }}>{icon}</div>
              <div style={{ fontSize:"11px", fontWeight:"700", color, fontFamily:"'IBM Plex Mono',monospace" }}>{label}</div>
              <div style={{ fontSize:"10px", color:C.textMid }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PORTAL ───────────────────────────────────────────────────────────────────
const PROFILES = [
  { id:"backend",        label:"Backend",       icon:"⚙️", desc:"APIs REST, servicios de negocio" },
  { id:"frontend",       label:"Frontend",      icon:"🖥️", desc:"Apps web, BFF, SSR" },
  { id:"microservicios", label:"Microservicios",icon:"🔗", desc:"Malla de servicios, gRPC" },
  { id:"apis",           label:"APIs / Gateway",icon:"🌐", desc:"API management, proxies" },
  { id:"datos",          label:"Datos",         icon:"🗄️", desc:"Pipelines, ETL, streaming" },
];
const SIZES = [
  { id:"chico",  label:"Chico",  cpu:"2", memory:"4Gi",  pods:"10" },
  { id:"mediano",label:"Mediano",cpu:"4", memory:"8Gi",  pods:"25" },
  { id:"grande", label:"Grande", cpu:"8", memory:"16Gi", pods:"50" },
];
const DESTINATIONS = [
  { id:"k8s",      label:"Kubernetes",  icon:"☸️", sub:"On-premise · CDMX",    color:C.green },
  { id:"openshift",label:"OpenShift",   icon:"🔴", sub:"On-premise · CDMX",    color:C.red },
  { id:"gcp",      label:"GCP",         icon:"☁️", sub:"Google Cloud",          color:C.blue },
  { id:"ibm",      label:"IBM Cloud",   icon:"🌐", sub:"Cloud",                 color:C.purple },
];

function PortalScene({ onReady }) {
  const [tab, setTab] = useState("catalogo"); // catalogo | custom
  const [profile, setProfile] = useState("backend");
  const [size, setSize] = useState("mediano");
  const [dest, setDest] = useState("k8s");
  const [customText, setCustomText] = useState("");
  const sel = SIZES.find(s => s.id === size);
  const prof = PROFILES.find(p => p.id === profile);
  const destObj = DESTINATIONS.find(d => d.id === dest);

  const canSubmit = tab === "catalogo" || (tab === "custom" && customText.trim().length > 10);

  return (
    <div style={{ padding:"16px", animation:"fadeUp 0.4s ease" }}>
      {/* TFE badge */}
      <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:"10px", padding:"9px 14px", marginBottom:"18px", display:"flex", alignItems:"center", gap:"10px" }}>
        <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:C.blue, flexShrink:0 }} />
        <div>
          <div style={{ fontSize:"11px", fontWeight:"700", color:C.blueLight, fontFamily:"'IBM Plex Mono',monospace" }}>Terraform Enterprise</div>
          <div style={{ fontSize:"10px", color:C.textMid }}>Portal de autoservicio · tfe.telcel.internal</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px", marginBottom:"20px" }}>
        {[["catalogo","📋 Del catálogo"],["custom","✏️ Requerimiento específico"]].map(([id,label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            padding:"10px 8px", background:tab===id?C.blueDim:C.surface,
            border:`1px solid ${tab===id?C.blue:C.border}`,
            borderRadius:"8px", cursor:"pointer", fontFamily:"inherit",
            color:tab===id?C.blueLight:C.textMid, fontSize:"11px", fontWeight:"600",
            transition:"all 0.2s",
          }}>{label}</button>
        ))}
      </div>

      {tab === "catalogo" && (<>
        {/* Profile */}
        <div style={{ marginBottom:"16px" }}>
          <div style={{ fontSize:"10px", fontWeight:"700", color:C.blueLight, letterSpacing:"2px", marginBottom:"8px" }}>PERFIL DE APLICACIÓN</div>
          <div style={{ display:"flex", flexDirection:"column", gap:"5px" }}>
            {PROFILES.map(p => (
              <button key={p.id} onClick={() => setProfile(p.id)} style={{
                display:"flex", alignItems:"center", gap:"10px", padding:"9px 12px",
                background:profile===p.id?C.blueDim:C.surface,
                border:`1px solid ${profile===p.id?C.blue:C.border}`,
                borderRadius:"8px", cursor:"pointer", textAlign:"left", fontFamily:"inherit", transition:"all 0.2s",
              }}>
                <span style={{ fontSize:"16px" }}>{p.icon}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:"12px", fontWeight:"700", color:profile===p.id?C.blueLight:C.text }}>{p.label}</div>
                  <div style={{ fontSize:"10px", color:C.textMid }}>{p.desc}</div>
                </div>
                {profile===p.id && <div style={{ width:"16px", height:"16px", borderRadius:"50%", background:C.blue, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><span style={{ color:"white", fontSize:"10px" }}>✓</span></div>}
              </button>
            ))}
          </div>
        </div>

        {/* Size */}
        <div style={{ marginBottom:"16px" }}>
          <div style={{ fontSize:"10px", fontWeight:"700", color:C.blueLight, letterSpacing:"2px", marginBottom:"8px" }}>TAMAÑO</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"8px" }}>
            {SIZES.map(s => (
              <button key={s.id} onClick={() => setSize(s.id)} style={{
                padding:"11px 6px",
                background:size===s.id?C.blue:C.surface,
                border:`1px solid ${size===s.id?C.blue:C.border}`,
                borderRadius:"8px", cursor:"pointer", fontFamily:"inherit", transition:"all 0.2s",
              }}>
                <div style={{ fontSize:"13px", fontWeight:"800", color:size===s.id?"white":C.text }}>{s.label}</div>
                <div style={{ fontSize:"9px", color:size===s.id?"rgba(255,255,255,0.6)":C.textMid, marginTop:"2px" }}>{s.cpu}CPU·{s.memory}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Destination */}
        <div style={{ marginBottom:"16px" }}>
          <div style={{ fontSize:"10px", fontWeight:"700", color:C.blueLight, letterSpacing:"2px", marginBottom:"8px" }}>PLATAFORMA DESTINO</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
            {DESTINATIONS.map(d => (
              <button key={d.id} onClick={() => setDest(d.id)} style={{
                padding:"12px 10px",
                background:dest===d.id?`${d.color}22`:C.surface,
                border:`1px solid ${dest===d.id?d.color:C.border}`,
                borderRadius:"8px", cursor:"pointer", fontFamily:"inherit", textAlign:"left", transition:"all 0.2s",
              }}>
                <div style={{ fontSize:"18px", marginBottom:"3px" }}>{d.icon}</div>
                <div style={{ fontSize:"12px", fontWeight:"700", color:dest===d.id?d.color:C.text }}>{d.label}</div>
                <div style={{ fontSize:"10px", color:C.textMid }}>{d.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div style={{ background:C.surface2, border:`1px solid ${C.border}`, borderRadius:"10px", padding:"12px", marginBottom:"14px" }}>
          <div style={{ fontSize:"10px", fontWeight:"700", color:C.blueLight, letterSpacing:"1px", marginBottom:"8px" }}>CONFIGURACIÓN</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px" }}>
            {[["Perfil",prof?.label],["Tamaño",sel?.label],["CPU",`${parseInt(sel?.cpu)*2} cores`],["Destino",destObj?.label]].map(([k,v],i) => (
              <div key={i} style={{ background:C.surface, borderRadius:"6px", padding:"7px 10px" }}>
                <div style={{ fontSize:"10px", color:C.textMid }}>{k}</div>
                <div style={{ fontSize:"12px", fontWeight:"700", color:C.blueLight, fontFamily:"'IBM Plex Mono',monospace" }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </>)}

      {tab === "custom" && (
        <div style={{ marginBottom:"16px" }}>
          <div style={{ fontSize:"10px", fontWeight:"700", color:C.blueLight, letterSpacing:"2px", marginBottom:"8px" }}>DESCRIBE TU REQUERIMIENTO</div>
          <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:"8px", padding:"4px", marginBottom:"10px" }}>
            <textarea
              value={customText}
              onChange={e => setCustomText(e.target.value)}
              placeholder="Ej: Necesitamos un namespace con acceso a GPU, 3 nodos dedicados y comunicación directa con el clúster de datos on-premise..."
              style={{ width:"100%", minHeight:"120px", background:"transparent", border:"none", color:C.text, fontSize:"12px", fontFamily:"inherit", lineHeight:"1.6", padding:"8px", resize:"vertical", outline:"none" }}
            />
          </div>
          <div style={{ background:`${C.yellow}11`, border:`1px solid ${C.yellow}44`, borderRadius:"8px", padding:"10px 12px", fontSize:"12px", color:C.textMid, lineHeight:"1.6" }}>
            ⚠️ Los requerimientos fuera del catálogo pasan por revisión del equipo de plataforma antes de generar cualquier configuración.
          </div>
        </div>
      )}

      <button
        onClick={() => canSubmit && onReady({ profile, size, dest, tab, customText, destObj, prof, sel })}
        style={{
          width:"100%", padding:"14px",
          background: canSubmit ? C.blue : C.surface2,
          border:"none", borderRadius:"10px",
          color: canSubmit ? "white" : C.textDisabled,
          fontSize:"14px", fontWeight:"700",
          cursor: canSubmit ? "pointer" : "not-allowed",
          fontFamily:"inherit", transition:"all 0.2s",
        }}>
        {tab==="catalogo" ? "Enviar solicitud →" : "Enviar para revisión →"}
      </button>
      <div style={{ textAlign:"center", marginTop:"8px", fontSize:"11px", color:C.textDim }}>
        Toda solicitud pasa por aprobación del equipo de plataforma
      </div>
    </div>
  );
}

// ─── IDE ──────────────────────────────────────────────────────────────────────
const CODE = {
providers:`# providers.tf — conexiones del stack Telcel

terraform {
  required_providers {
    kubernetes = { source = "hashicorp/kubernetes", version = "~> 2.30" }
    google     = { source = "hashicorp/google",     version = "~> 5.0"  }
    ibm        = { source = "IBM-Cloud/ibm",         version = "~> 1.63" }
    vault      = { source = "hashicorp/vault",       version = "~> 3.25" }
  }
}

# On-premise (OpenShift / Kubernetes)
provider "kubernetes" {
  config_context = var.cluster_context
}

# Nube Google
provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_region
}

# Nube IBM
provider "ibm" {
  region = var.ibm_region
}

# Credenciales desde Vault — nunca en el repositorio
provider "vault" {
  address   = "https://vault.telcel.internal:8200"
  namespace = "telcel"
}`,

variables:`# variables.tf — parámetros del proyecto
# Define qué información necesita Terraform para operar.
# Los valores concretos los genera el portal automáticamente.

variable "namespace_name" {
  description = "Nombre del namespace a crear"
  type        = string

  validation {
    condition     = can(regex("^[a-z0-9-]+$", var.namespace_name))
    error_message = "Solo minúsculas, números y guiones."
  }
}

variable "perfil" {
  description = "Tipo de carga de trabajo"
  type        = string

  validation {
    condition = contains(
      ["backend", "frontend", "microservicios", "apis", "datos"],
      var.perfil
    )
    error_message = "Perfil no válido para el catálogo Telcel."
  }
}

variable "tamaño" {
  description = "Tamaño del namespace: chico, mediano o grande"
  type        = string
  default     = "mediano"
}

variable "equipo" {
  description = "Equipo dueño del namespace"
  type        = string
}

variable "cluster_context" {
  description = "Clúster destino"
  type        = string
}`,

main:`# main.tf — namespace, quotas y accesos

locals {
  limits = {
    chico   = { cpu = "2",  memory = "4Gi",  pods = "10" }
    mediano = { cpu = "4",  memory = "8Gi",  pods = "25" }
    grande  = { cpu = "8",  memory = "16Gi", pods = "50" }
  }[var.tamaño]
}

resource "kubernetes_namespace" "this" {
  metadata {
    name   = var.namespace_name
    labels = {
      "telcel.mx/perfil"  = var.perfil
      "telcel.mx/tamaño"  = var.tamaño
      "telcel.mx/equipo"  = var.equipo
      "managed-by"        = "terraform"
    }
  }
}

resource "kubernetes_resource_quota" "this" {
  metadata {
    name      = "\${var.namespace_name}-quota"
    namespace = kubernetes_namespace.this.metadata[0].name
  }
  spec {
    hard = {
      "requests.cpu"    = local.limits.cpu
      "requests.memory" = local.limits.memory
      "pods"            = local.limits.pods
    }
  }
}`,

policy:`# policies/namespace.sentinel
# Las políticas definen las reglas que toda
# solicitud debe cumplir antes del apply.

import "tfplan/v2" as tfplan

# Regla 1: todo namespace debe tener etiquetas Telcel
namespaces_tienen_etiquetas = rule {
  all tfplan.resource_changes as _, rc {
    rc.type is "kubernetes_namespace" and
    rc.change.after.metadata[0].labels["telcel.mx/equipo"] is not null and
    rc.change.after.metadata[0].labels["telcel.mx/perfil"] is not null
  }
}

# Regla 2: tamaño "grande" requiere aprobación explícita
grande_requiere_aprobacion = rule {
  all tfplan.resource_changes as _, rc {
    rc.type is "kubernetes_resource_quota" implies
    rc.change.after.spec[0].hard["pods"] <= "25"
  }
}

main = rule {
  namespaces_tienen_etiquetas and
  grande_requiere_aprobacion
}`,
};

const META_IDE = {
  providers:{ label:"providers.tf",        icon:"🔌", tag:"Conexiones",  tagColor:C.blue,
    what:"Define con qué plataformas habla Terraform. On-premise, nube y seguridad — todo declarado en un lugar.",
    telcel:"Si mañana se agrega otra nube, se suma un bloque. El resto del código no cambia." },
  variables:{ label:"variables.tf",        icon:"📋", tag:"Parámetros",  tagColor:C.purple,
    what:"Declara qué información necesita el proyecto. No tiene valores concretos — define el contrato: qué se puede configurar y qué entradas son válidas. Las validaciones rechazan configuraciones incorrectas antes de tocar la infraestructura.",
    telcel:"El perfil y el tamaño del catálogo viven aquí como variables. Si alguien intenta poner un perfil que no existe, el sistema lo rechaza antes de crear nada. Las sesiones de aclaración desaparecen." },
  main:     { label:"main.tf",             icon:"⚙️", tag:"Recursos",    tagColor:C.green,
    what:"Crea el namespace con sus quotas. El tamaño elegido en el portal se traduce directamente a límites de CPU, memoria y pods.",
    telcel:"Esto es lo que hoy hace manualmente el equipo de plataforma en cada solicitud. Con Terraform, se ejecuta una vez y se repite idéntico." },
  policy:   { label:"policies/namespace.sentinel", icon:"🛡️", tag:"Políticas", tagColor:C.yellow,
    what:"Sentinel es el motor de políticas de Terraform Enterprise. Define reglas que toda configuración debe cumplir antes de que el apply proceda.",
    telcel:"Las reglas del equipo de plataforma viven en código. Nadie puede crear un namespace grande sin aprobación explícita — es una política, no un proceso manual." },
};
const IDE_ORDER = ["providers","variables","main","policy"];

function hlCode(line) {
  if (line.trimStart().startsWith("#")) return `<span style="color:${C.textDim};font-style:italic">${line.replace(/&/g,"&amp;")}</span>`;
  let s = line.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  s = s.replace(/"([^"]*)"/g, `<span style="color:${C.green}">"$1"</span>`);
  ["terraform","required_providers","provider","resource","locals","metadata","labels","spec","hard",
   "source","version","project","region","address","namespace","config_context","name","type",
   "import","rule","all","as","and","is","not","null","implies","main"].forEach(kw => {
    s = s.replace(new RegExp(`\\b(${kw})\\b`,"g"), `<span style="color:${C.blueLight}">$1</span>`);
  });
  ["kubernetes_namespace","kubernetes_resource_quota","kubernetes_role_binding"].forEach(t => {
    s = s.replace(new RegExp(`\\b(${t})\\b`,"g"), `<span style="color:${C.purpleLight}">$1</span>`);
  });
  s = s.replace(/\b(var\.\w+|local\.[\w\[\]]+)\b/g, `<span style="color:${C.orange}">$&</span>`);
  return s;
}

function CodeView({ code }) {
  return (
    <div style={{ overflowX:"auto", background:C.bg, paddingTop:"10px" }}>
      <table style={{ borderCollapse:"collapse", minWidth:"100%", fontSize:"11px", lineHeight:"1.8", fontFamily:"'IBM Plex Mono','Courier New',monospace" }}>
        <tbody>
          {code.split("\n").map((line,i) => (
            <tr key={i} style={{ background:i%2===0?"transparent":"rgba(255,255,255,0.01)" }}>
              <td style={{ color:C.textDim, textAlign:"right", padding:"0 10px 0 8px", userSelect:"none", verticalAlign:"top", width:"26px", fontSize:"10px", borderRight:`1px solid ${C.border}` }}>{i+1}</td>
              <td style={{ paddingLeft:"12px", color:C.text, whiteSpace:"pre", verticalAlign:"top" }}>
                <span dangerouslySetInnerHTML={{ __html: hlCode(line) }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function IDEScene({ fileKey, onFileChange }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const meta = META_IDE[fileKey];
  return (
    <div style={{ display:"flex", flexDirection:"column" }}>
      {/* tab bar */}
      <div style={{ background:C.surface, borderBottom:`1px solid ${C.border}`, padding:"8px 12px", display:"flex", alignItems:"center", gap:"8px", position:"sticky", top:"0", zIndex:20 }}>
        <button onClick={() => setDrawerOpen(true)} style={{ background:"transparent", border:"none", color:C.textMid, cursor:"pointer", fontSize:"18px", padding:"2px 6px", lineHeight:1 }}>≡</button>
        <div style={{ width:"1px", height:"16px", background:C.border }} />
        <span style={{ fontSize:"13px" }}>{meta.icon}</span>
        <span style={{ fontSize:"12px", color:C.textMid, fontFamily:"'IBM Plex Mono',monospace", flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{meta.label}</span>
        <div style={{ background:`${meta.tagColor}22`, color:meta.tagColor, fontSize:"10px", fontWeight:"700", padding:"3px 9px", borderRadius:"10px", whiteSpace:"nowrap" }}>{meta.tag}</div>
      </div>
      {/* drawer */}
      {drawerOpen && (
        <div style={{ position:"fixed", inset:0, zIndex:100, display:"flex" }}>
          <div style={{ position:"absolute", left:0, top:0, bottom:0, width:"70%", maxWidth:"270px", background:C.surface, borderRight:`1px solid ${C.border}`, display:"flex", flexDirection:"column", animation:"slideIn 0.25s ease", zIndex:101 }}>
            <div style={{ padding:"14px", borderBottom:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div>
                <div style={{ fontSize:"10px", color:C.blueLight, fontWeight:"700", letterSpacing:"1px" }}>EXPLORADOR</div>
                <div style={{ fontSize:"12px", color:C.textMid, fontFamily:"'IBM Plex Mono',monospace" }}>telcel-plataforma/</div>
              </div>
              <button onClick={() => setDrawerOpen(false)} style={{ background:"transparent", border:"none", color:C.textMid, cursor:"pointer", fontSize:"20px", lineHeight:1 }}>×</button>
            </div>
            {IDE_ORDER.map(key => (
              <div key={key} onClick={() => { onFileChange(key); setDrawerOpen(false); }}
                style={{ display:"flex", alignItems:"center", gap:"10px", padding:"11px 14px", background:fileKey===key?C.blueDim:"transparent", borderLeft:fileKey===key?`2px solid ${C.blue}`:"2px solid transparent", cursor:"pointer" }}>
                <span style={{ fontSize:"14px" }}>{META_IDE[key].icon}</span>
                <span style={{ fontSize:"12px", fontFamily:"'IBM Plex Mono',monospace", color:fileKey===key?C.blueLight:C.textMid, fontWeight:fileKey===key?"700":"400" }}>{META_IDE[key].label}</span>
              </div>
            ))}
          </div>
          <div style={{ flex:1, background:"rgba(0,0,0,0.7)" }} onClick={() => setDrawerOpen(false)} />
        </div>
      )}
      <CodeView code={CODE[fileKey]} />
      <div style={{ background:C.surface, borderTop:`1px solid ${C.border}`, padding:"16px" }}>
        <div style={{ marginBottom:"12px" }}>
          <div style={{ fontSize:"10px", fontWeight:"700", color:C.blueLight, letterSpacing:"2px", marginBottom:"6px" }}>¿QUÉ HACE ESTE ARCHIVO?</div>
          <p style={{ margin:0, fontSize:"13px", color:C.textMid, lineHeight:"1.65" }}>{meta.what}</p>
        </div>
        <div style={{ background:`${meta.tagColor}11`, border:`1px solid ${meta.tagColor}44`, borderRadius:"8px", padding:"12px" }}>
          <div style={{ fontSize:"10px", fontWeight:"700", color:meta.tagColor, letterSpacing:"1px", marginBottom:"6px" }}>→ EN EL CONTEXTO DE TELCEL</div>
          <p style={{ margin:0, fontSize:"13px", color:C.text, lineHeight:"1.65" }}>{meta.telcel}</p>
        </div>
      </div>
    </div>
  );
}

// ─── PLAN ─────────────────────────────────────────────────────────────────────
const PLAN_STEPS_BY_DEST = {
  k8s:       ["kubernetes_namespace.this","kubernetes_resource_quota.this","kubernetes_network_policy.isolation"],
  openshift: ["kubernetes_namespace.this","kubernetes_resource_quota.this","kubernetes_role_binding.team_access"],
  gcp:       ["google_compute_network.telcel_vpc","google_compute_subnetwork.k8s_subnet","kubernetes_namespace.this","kubernetes_resource_quota.this"],
  ibm:       ["ibm_container_cluster.telcel_k8s","kubernetes_namespace.this","kubernetes_resource_quota.this"],
};

function PlanScene({ selection }) {
  const [lines, setLines] = useState([]);
  const [done, setDone] = useState(false);
  const [running, setRunning] = useState(false);
  const resources = PLAN_STEPS_BY_DEST[selection?.dest] || PLAN_STEPS_BY_DEST.k8s;

  const runPlan = () => {
    if (running || done) return;
    setRunning(true);
    const steps = [
      { t:"Initializing Terraform...", c:C.textMid },
      { t:"Fetching credentials from Vault...", c:C.textMid },
      { t:"", c:"transparent" },
      { t:"Planning...", c:C.textMid },
      { t:"", c:"transparent" },
      ...resources.map(r => ({ t:`  + ${r}`, c:C.green })),
      { t:"", c:"transparent" },
      { t:`Plan: ${resources.length} to add, 0 to change, 0 to destroy.`, c:C.yellow, bold:true },
    ];
    steps.forEach((step,i) => {
      setTimeout(() => {
        setLines(prev => [...prev, step]);
        if (i===steps.length-1) { setDone(true); setRunning(false); }
      }, i*220);
    });
  };

  return (
    <div style={{ padding:"16px", animation:"fadeUp 0.4s ease" }}>
      <div style={{ fontSize:"10px", fontWeight:"700", color:C.blueLight, letterSpacing:"2px", marginBottom:"4px" }}>TERRAFORM PLAN</div>
      <h2 style={{ fontSize:"18px", fontWeight:"700", margin:"0 0 4px", color:C.text }}>El contrato.</h2>
      <p style={{ fontSize:"13px", color:C.textMid, margin:"0 0 6px", lineHeight:"1.6" }}>
        Terraform muestra exactamente qué va a crear antes de que exista un solo recurso.
      </p>
      {selection && (
        <div style={{ display:"flex", gap:"8px", marginBottom:"16px", flexWrap:"wrap" }}>
          {[selection.prof?.label, selection.sel?.label, selection.destObj?.label].map((v,i) => (
            <div key={i} style={{ background:C.surface2, border:`1px solid ${C.border}`, borderRadius:"20px", padding:"3px 10px", fontSize:"11px", color:C.blueLight, fontFamily:"'IBM Plex Mono',monospace" }}>{v}</div>
          ))}
        </div>
      )}
      {!running && !done && (
        <button onClick={runPlan} style={{ width:"100%", padding:"14px", background:C.blue, border:"none", borderRadius:"10px", color:"white", fontSize:"14px", fontWeight:"700", cursor:"pointer", fontFamily:"'IBM Plex Mono',monospace", marginBottom:"16px" }}>
          $ terraform plan
        </button>
      )}
      {lines.length > 0 && (
        <div style={{ background:"#0a0a0a", borderRadius:"10px", padding:"14px", fontFamily:"'IBM Plex Mono',monospace", fontSize:"11.5px", lineHeight:"1.8", marginBottom:"16px", border:`1px solid ${C.border}` }}>
          {lines.map((l,i) => <div key={i} style={{ color:l.c, fontWeight:l.bold?"700":"400", minHeight:"1.8em" }}>{l.t||" "}</div>)}
          {running && <span style={{ color:C.blueLight, animation:"blink 1s infinite" }}>▊</span>}
        </div>
      )}
      {done && (
        <div style={{ background:C.greenDim, border:`1px solid ${C.green}`, borderRadius:"10px", padding:"14px" }}>
          <div style={{ fontSize:"10px", fontWeight:"700", color:C.green, letterSpacing:"1px", marginBottom:"6px" }}>→ SIGUIENTE PASO</div>
          <p style={{ margin:0, fontSize:"13px", color:C.text, lineHeight:"1.6" }}>
            El plan está listo. Nadie puede hacer apply sin aprobación del equipo de plataforma.
          </p>
        </div>
      )}
    </div>
  );
}

// ─── APPROVAL ────────────────────────────────────────────────────────────────
function ApprovalScene({ selection, onApprove }) {
  const [approved, setApproved] = useState(false);
  const resources = PLAN_STEPS_BY_DEST[selection?.dest] || PLAN_STEPS_BY_DEST.k8s;

  const handleApprove = () => { setApproved(true); setTimeout(onApprove, 1200); };

  return (
    <div style={{ padding:"16px", animation:"fadeUp 0.4s ease" }}>
      {/* Operator badge */}
      <div style={{ background:C.surface, border:`1px solid ${C.yellow}44`, borderRadius:"10px", padding:"10px 14px", marginBottom:"18px", display:"flex", alignItems:"center", gap:"10px" }}>
        <span style={{ fontSize:"18px" }}>👷</span>
        <div>
          <div style={{ fontSize:"11px", fontWeight:"700", color:C.yellow }}>Vista del operador</div>
          <div style={{ fontSize:"10px", color:C.textMid }}>Equipo de Plataforma · aprobación requerida</div>
        </div>
      </div>

      <h2 style={{ fontSize:"18px", fontWeight:"700", margin:"0 0 4px", color:C.text }}>Solicitud pendiente.</h2>
      <p style={{ fontSize:"13px", color:C.textMid, margin:"0 0 16px" }}>El plan fue generado. Revisa los recursos y aprueba o rechaza.</p>

      {/* Request summary */}
      <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:"10px", padding:"14px", marginBottom:"12px" }}>
        <div style={{ fontSize:"10px", fontWeight:"700", color:C.blueLight, letterSpacing:"1px", marginBottom:"10px" }}>SOLICITUD</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px", marginBottom:"12px" }}>
          {[["Perfil",selection?.prof?.label],["Tamaño",selection?.sel?.label],["Destino",selection?.destObj?.label],["Solicitante", selection?.equipo || "—"]].map(([k,v],i) => (
            <div key={i} style={{ background:C.surface2, borderRadius:"6px", padding:"7px 10px" }}>
              <div style={{ fontSize:"10px", color:C.textMid }}>{k}</div>
              <div style={{ fontSize:"12px", fontWeight:"700", color:C.blueLight, fontFamily:"'IBM Plex Mono',monospace" }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize:"10px", fontWeight:"700", color:C.blueLight, letterSpacing:"1px", marginBottom:"6px" }}>RECURSOS A CREAR</div>
        {resources.map((r,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:"8px", padding:"5px 0", borderBottom:i<resources.length-1?`1px solid ${C.border}`:"none" }}>
            <span style={{ color:C.green, fontWeight:"700", fontSize:"13px", flexShrink:0 }}>+</span>
            <span style={{ fontSize:"11px", color:C.textMid, fontFamily:"'IBM Plex Mono',monospace" }}>{r}</span>
          </div>
        ))}
      </div>

      {/* Sentinel check */}
      <div style={{ background:`${C.yellow}11`, border:`1px solid ${C.yellow}44`, borderRadius:"8px", padding:"10px 12px", marginBottom:"16px", display:"flex", alignItems:"center", gap:"10px" }}>
        <span style={{ fontSize:"16px" }}>🛡️</span>
        <div>
          <div style={{ fontSize:"11px", fontWeight:"700", color:C.yellow }}>Sentinel · todas las políticas cumplen</div>
          <div style={{ fontSize:"10px", color:C.textMid }}>namespace con etiquetas válidas · tamaño dentro del rango permitido</div>
        </div>
      </div>

      {/* Approve / Reject */}
      {!approved ? (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
          <button style={{ padding:"13px", background:"transparent", border:`1px solid ${C.red}`, borderRadius:"10px", color:C.red, fontSize:"13px", fontWeight:"700", cursor:"pointer", fontFamily:"inherit" }}>
            ✗ Rechazar
          </button>
          <button onClick={handleApprove} style={{ padding:"13px", background:C.green, border:"none", borderRadius:"10px", color:"#0a0a0a", fontSize:"13px", fontWeight:"700", cursor:"pointer", fontFamily:"inherit" }}>
            ✓ Aprobar
          </button>
        </div>
      ) : (
        <div style={{ background:C.greenDim, border:`1px solid ${C.green}`, borderRadius:"10px", padding:"16px", textAlign:"center", animation:"fadeUp 0.4s ease" }}>
          <div style={{ fontSize:"22px", marginBottom:"4px" }}>✅</div>
          <div style={{ fontSize:"14px", fontWeight:"700", color:C.green }}>Aprobado — aplicando...</div>
        </div>
      )}
    </div>
  );
}

// ─── RESULT ───────────────────────────────────────────────────────────────────
function ResultScene({ selection }) {
  const [applyLines, setApplyLines] = useState([]);
  const [applyDone, setApplyDone] = useState(false);
  const dest = selection?.destObj;
  const resources = PLAN_STEPS_BY_DEST[selection?.dest] || PLAN_STEPS_BY_DEST.k8s;
  const nsName = `${selection?.equipo||"equipo"}-${selection?.prof?.id||"backend"}-prod`;

  // Generate realistic timestamps
  const now = new Date();
  const pad = n => String(n).padStart(2,"0");
  const dateStr = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`;
  const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())} CST`;
  const commitId = Math.random().toString(16).slice(2,10);
  const runId = `run-${Math.random().toString(36).slice(2,9).toUpperCase()}`;

  useEffect(() => {
    const steps = [
      { t:"Applying...", c:C.textMid },
      { t:"", c:"transparent" },
      ...resources.map((r) => ({ t:`  ${r}: Creating...`, c:C.textMid })),
      ...resources.map((r) => ({ t:`  ${r}: Creation complete ✓`, c:C.green })),
      { t:"", c:"transparent" },
      { t:`Apply complete! Resources: ${resources.length} added, 0 changed, 0 destroyed.`, c:C.green, bold:true },
    ];
    steps.forEach((step, i) => {
      setTimeout(() => {
        setApplyLines(prev => [...prev, step]);
        if (i === steps.length - 1) setApplyDone(true);
      }, 400 + i * 280);
    });
  }, []);

  return (
    <div style={{ padding:"16px", animation:"fadeUp 0.4s ease" }}>
      <div style={{ fontSize:"10px", fontWeight:"700", color:C.blueLight, letterSpacing:"2px", marginBottom:"4px" }}>TERRAFORM APPLY</div>
      <h2 style={{ fontSize:"18px", fontWeight:"700", margin:"0 0 16px", color:C.text }}>Aplicando cambios.</h2>

      {/* Console output */}
      <div style={{ background:"#0a0a0a", borderRadius:"10px", padding:"14px", fontFamily:"'IBM Plex Mono',monospace", fontSize:"11.5px", lineHeight:"1.8", marginBottom:"16px", border:`1px solid ${C.border}`, minHeight:"120px" }}>
        {applyLines.map((l,i) => (
          <div key={i} style={{ color:l.c, fontWeight:l.bold?"700":"400", minHeight:"1.8em" }}>{l.t||" "}</div>
        ))}
        {!applyDone && <span style={{ color:C.blueLight, animation:"blink 1s infinite" }}>▊</span>}
      </div>

      {/* Deployment summary */}
      {applyDone && (
        <div style={{ animation:"fadeUp 0.5s ease" }}>

          {/* Status header */}
          <div style={{ background:C.greenDim, border:`1px solid ${C.green}`, borderRadius:"10px", padding:"12px 14px", marginBottom:"14px", display:"flex", alignItems:"center", gap:"12px" }}>
            <span style={{ fontSize:"22px" }}>✅</span>
            <div>
              <div style={{ fontSize:"14px", fontWeight:"700", color:C.green }}>Namespace creado exitosamente</div>
              <div style={{ fontSize:"11px", color:C.textMid, fontFamily:"'IBM Plex Mono',monospace" }}>{dateStr} · {timeStr}</div>
            </div>
          </div>

          {/* Main summary card */}
          <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:"12px", overflow:"hidden", marginBottom:"14px" }}>
            <div style={{ background:C.surface2, padding:"10px 14px", borderBottom:`1px solid ${C.border}` }}>
              <div style={{ fontSize:"10px", fontWeight:"700", color:C.blueLight, letterSpacing:"2px" }}>COMPROBANTE DE ENTREGA</div>
              <div style={{ fontSize:"11px", color:C.textDim, fontFamily:"'IBM Plex Mono',monospace", marginTop:"2px" }}>{runId}</div>
            </div>

            <div style={{ padding:"14px" }}>
              {/* Namespace identifier */}
              <div style={{ background:"#0a0a0a", borderRadius:"8px", padding:"10px 12px", marginBottom:"12px", fontFamily:"'IBM Plex Mono',monospace" }}>
                <div style={{ fontSize:"10px", color:C.textDim, marginBottom:"3px" }}>NAMESPACE</div>
                <div style={{ fontSize:"14px", fontWeight:"700", color:C.blueLight }}>{nsName}</div>
              </div>

              {/* Grid of key fields */}
              <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
                {[
                  ["Equipo solicitante",   selection?.equipo || "—"],
                  ["Perfil de aplicación", selection?.prof?.label || "—"],
                  ["Tamaño",               selection?.sel?.label || "—"],
                  ["CPU asignada",         `${parseInt(selection?.sel?.cpu||"4")*2} cores`],
                  ["Memoria asignada",     `${parseInt(selection?.sel?.memory||"8")*2}Gi`],
                  ["Pods máximos",         selection?.sel?.pods || "—"],
                  ["Plataforma destino",   dest?.label || "—"],
                  ["Ambiente",             dest?.sub || "—"],
                  ["Fecha de creación",    dateStr],
                  ["Hora de entrega",      timeStr],
                  ["Aplicado por",         "terraform-enterprise[bot]"],
                  ["Commit",               commitId],
                  ["Estado",               "active"],
                ].map(([k,v],i) => (
                  <div key={i} style={{
                    display:"flex", justifyContent:"space-between", alignItems:"flex-start",
                    padding:"7px 0",
                    borderBottom: i < 12 ? `1px solid ${C.border}` : "none",
                  }}>
                    <span style={{ fontSize:"11px", color:C.textMid, flexShrink:0, marginRight:"12px" }}>{k}</span>
                    <span style={{ fontSize:"11px", fontWeight:"700", color:C.text, fontFamily:"'IBM Plex Mono',monospace", textAlign:"right", wordBreak:"break-all" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Callout */}
          <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:"10px", padding:"12px 14px", fontSize:"12px", color:C.textMid, lineHeight:"1.6" }}>
            💡 Estos datos quedan registrados en Terraform Enterprise. Están disponibles para auditorías, CMDB y cualquier formato interno que necesiten completar.
          </div>
        </div>
      )}
    </div>
  );
}

// ─── CAMBIO SCENE — inventario → solicitud → aprobación → apply ───────────────
function CambioScene({ selection }) {
  const [step, setStep] = useState("inventory");
  const [newSize, setNewSize] = useState(null);
  const [applyLines, setApplyLines] = useState([]);
  const equipo = selection?.equipo || "mi-equipo";
  const nsName = `${equipo}-${selection?.prof?.id||"backend"}-prod`;
  const currentSize = selection?.sel || SIZES.find(s => s.id === "mediano");
  const availableSizes = SIZES.filter(s => s.id !== currentSize.id);
  const selectedNewSize = SIZES.find(s => s.id === newSize);

  const runApply = () => {
    setStep("applying");
    const lines = [
      { t:"Applying...", c:C.textMid },
      { t:"", c:"transparent" },
      { t:`  kubernetes_resource_quota.this: Modifying...`, c:C.textMid },
      { t:`  kubernetes_resource_quota.this: Modifications complete ✓`, c:C.orange },
      { t:"", c:"transparent" },
      { t:"Apply complete! Resources: 0 added, 1 changed, 0 destroyed.", c:C.green, bold:true },
    ];
    lines.forEach((l, i) => {
      setTimeout(() => {
        setApplyLines(prev => [...prev, l]);
        if (i === lines.length - 1) setStep("done");
      }, 300 + i * 400);
    });
  };

  return (
    <div style={{ padding:"16px", animation:"fadeUp 0.4s ease" }}>

      {/* ── INVENTORY ── */}
      {step === "inventory" && (<>
        <div style={{ fontSize:"10px", fontWeight:"700", color:C.blueLight, letterSpacing:"2px", marginBottom:"4px" }}>MI INFRAESTRUCTURA</div>
        <h2 style={{ fontSize:"18px", fontWeight:"700", margin:"0 0 4px", color:C.text }}>Namespaces activos.</h2>
        <p style={{ fontSize:"13px", color:C.textMid, margin:"0 0 16px" }}>Esta es la vista del equipo — lo que tienen corriendo hoy.</p>

        {/* Active namespace card */}
        <div style={{ background:C.surface, border:`1px solid ${C.green}`, borderRadius:"12px", padding:"14px", marginBottom:"10px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"10px" }}>
            <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"12px", fontWeight:"700", color:C.text }}>{nsName}</div>
            <div style={{ background:C.greenDim, border:`1px solid ${C.green}`, borderRadius:"20px", padding:"2px 10px", fontSize:"10px", fontWeight:"700", color:C.green }}>active</div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"6px", marginBottom:"12px" }}>
            {[["Perfil",selection?.prof?.label||"backend"],["Tamaño",currentSize.label],["Destino",selection?.destObj?.label||"Kubernetes"]].map(([k,v],i) => (
              <div key={i} style={{ background:C.surface2, borderRadius:"6px", padding:"6px 8px" }}>
                <div style={{ fontSize:"9px", color:C.textMid }}>{k}</div>
                <div style={{ fontSize:"11px", fontWeight:"700", color:C.blueLight }}>{v}</div>
              </div>
            ))}
          </div>
          <button onClick={() => setStep("request")} style={{ width:"100%", padding:"10px", background:C.blue, border:"none", borderRadius:"8px", color:"white", fontSize:"12px", fontWeight:"700", cursor:"pointer", fontFamily:"inherit" }}>
            Solicitar cambio →
          </button>
        </div>

        {/* Placeholder second namespace */}
        <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:"12px", padding:"14px", opacity:0.5 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"12px", color:C.textMid }}>{equipo}-datos-dev</div>
            <div style={{ background:C.surface2, border:`1px solid ${C.border}`, borderRadius:"20px", padding:"2px 10px", fontSize:"10px", color:C.textDim }}>active</div>
          </div>
        </div>
      </>)}

      {/* ── REQUEST ── */}
      {step === "request" && (<>
        <div style={{ fontSize:"10px", fontWeight:"700", color:C.blueLight, letterSpacing:"2px", marginBottom:"4px" }}>SOLICITAR CAMBIO</div>
        <h2 style={{ fontSize:"18px", fontWeight:"700", margin:"0 0 4px", color:C.text }}>Cambio de tamaño.</h2>
        <p style={{ fontSize:"13px", color:C.textMid, margin:"0 0 16px" }}>Namespace: <span style={{ color:C.blueLight, fontFamily:"'IBM Plex Mono',monospace" }}>{nsName}</span></p>

        <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:"10px", padding:"14px", marginBottom:"14px" }}>
          <div style={{ fontSize:"10px", color:C.textMid, marginBottom:"10px", fontWeight:"700", letterSpacing:"1px" }}>TAMAÑO ACTUAL</div>
          <div style={{ background:C.surface2, borderRadius:"8px", padding:"10px 12px", marginBottom:"14px" }}>
            <div style={{ fontSize:"13px", fontWeight:"700", color:C.text }}>{currentSize.label}</div>
            <div style={{ fontSize:"11px", color:C.textMid, marginTop:"2px" }}>{currentSize.cpu} CPU · {currentSize.memory} · {currentSize.pods} pods</div>
          </div>

          <div style={{ fontSize:"10px", color:C.textMid, marginBottom:"8px", fontWeight:"700", letterSpacing:"1px" }}>NUEVO TAMAÑO</div>
          <div style={{ display:"flex", flexDirection:"column", gap:"6px", marginBottom:"4px" }}>
            {availableSizes.map(s => (
              <button key={s.id} onClick={() => setNewSize(s.id)} style={{
                display:"flex", alignItems:"center", justifyContent:"space-between",
                padding:"10px 12px",
                background: newSize===s.id ? `${C.orange}22` : C.surface2,
                border:`1px solid ${newSize===s.id ? C.orange : C.border}`,
                borderRadius:"8px", cursor:"pointer", fontFamily:"inherit", transition:"all 0.2s",
              }}>
                <div style={{ textAlign:"left" }}>
                  <div style={{ fontSize:"13px", fontWeight:"700", color:newSize===s.id ? C.orange : C.text }}>{s.label}</div>
                  <div style={{ fontSize:"11px", color:C.textMid }}>{s.cpu} CPU · {s.memory} · {s.pods} pods</div>
                </div>
                {newSize===s.id && <span style={{ color:C.orange, fontSize:"16px" }}>●</span>}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background:`${C.yellow}11`, border:`1px solid ${C.yellow}33`, borderRadius:"8px", padding:"10px 12px", marginBottom:"14px", fontSize:"12px", color:C.textMid }}>
          ⚠️ Esta solicitud pasará por aprobación del equipo de plataforma antes de aplicarse.
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
          <button onClick={() => setStep("inventory")} style={{ padding:"12px", background:"transparent", border:`1px solid ${C.border}`, borderRadius:"8px", color:C.textMid, fontSize:"12px", cursor:"pointer", fontFamily:"inherit" }}>← Cancelar</button>
          <button onClick={() => newSize && setStep("approval")} disabled={!newSize} style={{ padding:"12px", background:newSize?C.blue:C.surface2, border:"none", borderRadius:"8px", color:newSize?"white":C.textDisabled, fontSize:"12px", fontWeight:"700", cursor:newSize?"pointer":"not-allowed", fontFamily:"inherit" }}>Enviar →</button>
        </div>
      </>)}

      {/* ── OPERATOR APPROVAL ── */}
      {step === "approval" && (<>
        <div style={{ background:C.surface, border:`1px solid ${C.yellow}44`, borderRadius:"10px", padding:"9px 14px", marginBottom:"16px", display:"flex", alignItems:"center", gap:"10px" }}>
          <span style={{ fontSize:"16px" }}>👷</span>
          <div>
            <div style={{ fontSize:"11px", fontWeight:"700", color:C.yellow }}>Vista del operador</div>
            <div style={{ fontSize:"10px", color:C.textMid }}>Solicitud de cambio · aprobación requerida</div>
          </div>
        </div>

        <h2 style={{ fontSize:"18px", fontWeight:"700", margin:"0 0 14px", color:C.text }}>Cambio pendiente.</h2>

        <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:"10px", padding:"14px", marginBottom:"12px" }}>
          <div style={{ fontSize:"10px", fontWeight:"700", color:C.blueLight, letterSpacing:"1px", marginBottom:"10px" }}>SOLICITUD</div>
          {[["Namespace",nsName],["Solicitante",equipo],["Cambio",`${currentSize.label} → ${selectedNewSize?.label||""}`]].map(([k,v],i) => (
            <div key={i} style={{ padding:"7px 0", borderBottom:i<2?`1px solid ${C.border}`:"none" }}>
              <div style={{ fontSize:"10px", color:C.textMid }}>{k}</div>
              <div style={{ fontSize:"12px", fontWeight:"700", color:C.blueLight, fontFamily:"'IBM Plex Mono',monospace" }}>{v}</div>
            </div>
          ))}
        </div>

        {/* Diff preview */}
        <div style={{ background:C.bg, border:`1px solid ${C.border}`, borderRadius:"8px", overflow:"hidden", marginBottom:"12px" }}>
          <div style={{ background:C.surface2, padding:"6px 12px", fontSize:"10px", color:C.textMid, fontFamily:"'IBM Plex Mono',monospace", borderBottom:`1px solid ${C.border}` }}>terraform plan — 1 to change</div>
          <div style={{ padding:"10px 12px", fontFamily:"'IBM Plex Mono',monospace", fontSize:"11px", lineHeight:"1.8" }}>
            {[
              { t:`~ kubernetes_resource_quota.this`, c:C.orange },
              { t:`    requests.cpu:    "${currentSize.cpu}" → "${selectedNewSize?.cpu||""}"`, c:C.orange },
              { t:`    requests.memory: "${currentSize.memory}" → "${selectedNewSize?.memory||""}"`, c:C.orange },
              { t:`    pods:            "${currentSize.pods}" → "${selectedNewSize?.pods||""}"`, c:C.orange },
            ].map((l,i) => <div key={i} style={{ color:l.c }}>  {l.t}</div>)}
          </div>
        </div>

        <div style={{ background:`${C.yellow}11`, border:`1px solid ${C.yellow}44`, borderRadius:"8px", padding:"9px 12px", marginBottom:"14px", display:"flex", gap:"8px", alignItems:"center" }}>
          <span>🛡️</span>
          <div style={{ fontSize:"11px", color:C.yellow, fontWeight:"700" }}>Sentinel · políticas cumplen</div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
          <button onClick={() => setStep("request")} style={{ padding:"12px", background:"transparent", border:`1px solid ${C.red}`, borderRadius:"8px", color:C.red, fontSize:"12px", fontWeight:"700", cursor:"pointer", fontFamily:"inherit" }}>✗ Rechazar</button>
          <button onClick={runApply} style={{ padding:"12px", background:C.green, border:"none", borderRadius:"8px", color:"#0a0a0a", fontSize:"12px", fontWeight:"700", cursor:"pointer", fontFamily:"inherit" }}>✓ Aprobar</button>
        </div>
      </>)}

      {/* ── APPLYING ── */}
      {(step === "applying" || step === "done") && (<>
        <div style={{ fontSize:"10px", fontWeight:"700", color:C.blueLight, letterSpacing:"2px", marginBottom:"4px" }}>TERRAFORM APPLY</div>
        <h2 style={{ fontSize:"18px", fontWeight:"700", margin:"0 0 16px", color:C.text }}>Aplicando el cambio.</h2>

        <div style={{ background:"#0a0a0a", borderRadius:"10px", padding:"14px", fontFamily:"'IBM Plex Mono',monospace", fontSize:"11.5px", lineHeight:"1.8", marginBottom:"16px", border:`1px solid ${C.border}` }}>
          {applyLines.map((l,i) => <div key={i} style={{ color:l.c, fontWeight:l.bold?"700":"400", minHeight:"1.8em" }}>{l.t||" "}</div>)}
          {step==="applying" && <span style={{ color:C.blueLight, animation:"blink 1s infinite" }}>▊</span>}
        </div>

        {step === "done" && (
          <div style={{ animation:"fadeUp 0.5s ease" }}>
            <div style={{ background:C.surface, border:`1px solid ${C.orange}`, borderRadius:"12px", padding:"14px" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"10px" }}>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"12px", fontWeight:"700", color:C.text }}>{nsName}</div>
                <div style={{ background:C.greenDim, border:`1px solid ${C.green}`, borderRadius:"20px", padding:"2px 10px", fontSize:"10px", fontWeight:"700", color:C.green }}>active</div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"6px" }}>
                {[["Perfil",selection?.prof?.label||"backend"],[`Tamaño`,`${selectedNewSize?.label||"Grande"} ↑`],["Destino",selection?.destObj?.label||"Kubernetes"]].map(([k,v],i) => (
                  <div key={i} style={{ background:C.surface2, borderRadius:"6px", padding:"6px 8px" }}>
                    <div style={{ fontSize:"9px", color:C.textMid }}>{k}</div>
                    <div style={{ fontSize:"11px", fontWeight:"700", color: i===1 ? C.orange : C.blueLight }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginTop:"12px", background:C.surface, border:`1px solid ${C.border}`, borderRadius:"8px", padding:"12px 14px", fontSize:"12px", color:C.textMid, lineHeight:"1.6" }}>
              Sin reuniones. Sin coordinar pruebas. Sin abrir un ticket. <strong style={{ color:C.text }}>Un cambio en el código, aprobado y aplicado.</strong>
            </div>
          </div>
        )}
      </>)}
    </div>
  );
}

// ─── CIERRE SCENE — antes / ahora ─────────────────────────────────────────────
function CierreScene({ onRestart }) {
  return (
    <div style={{ padding:"20px 16px 32px", animation:"fadeUp 0.5s ease" }}>
      <div style={{ fontSize:"10px", fontWeight:"700", color:C.green, letterSpacing:"2px", marginBottom:"16px" }}>ANTES Y AHORA</div>
      <div style={{ display:"flex", flexDirection:"column", gap:"10px", marginBottom:"28px" }}>
        {[
          { icon:"📋", before:"10–30 solicitudes manuales por semana", after:"Autoservicio desde el portal del catálogo" },
          { icon:"🔁", before:"1–2 sesiones de aclaración por ticket", after:"Perfil + tamaño = configuración lista" },
          { icon:"⚡", before:"Upgrade manual con coordinación de pruebas", after:"3 líneas de código + aprobación + apply" },
          { icon:"🗄️", before:"'Yo creo que está en prod'", after:"Estado centralizado — historial completo" },
          { icon:"🛡️", before:"Reglas de aprovisionamiento en documentos", after:"Políticas como código — Sentinel las hace cumplir" },
        ].map((item,i) => (
          <div key={i} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:"10px", padding:"12px 14px" }}>
            <div style={{ display:"flex", gap:"10px", alignItems:"flex-start" }}>
              <span style={{ fontSize:"18px", flexShrink:0 }}>{item.icon}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:"11px", color:C.textDim, textDecoration:"line-through", marginBottom:"5px" }}>{item.before}</div>
                <div style={{ fontSize:"12px", fontWeight:"700", color:C.greenLight }}>{item.after}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background:C.surface2, border:`1px solid ${C.border2}`, borderRadius:"14px", padding:"20px", textAlign:"center", marginBottom:"20px" }}>
        <div style={{ fontSize:"11px", color:C.textDim, marginBottom:"10px", fontFamily:"'IBM Plex Mono',monospace" }}>// pregunta abierta</div>
        <div style={{ fontSize:"17px", fontWeight:"700", color:C.text, lineHeight:1.4 }}>
          ¿Qué tendría que pasar para que esto empiece a operar en su entorno?
        </div>
      </div>

      <button onClick={onRestart} style={{ width:"100%", padding:"13px", background:"transparent", border:`1px solid ${C.border}`, borderRadius:"10px", color:C.textMid, fontSize:"13px", fontWeight:"600", cursor:"pointer", fontFamily:"inherit" }}>
        ↺ Empezar de nuevo
      </button>
    </div>
  );
}

// ─── TEAM LOGIN ───────────────────────────────────────────────────────────────
const SAMPLE_TEAMS = [
  { id:"pagos-digitales",  label:"Pagos Digitales",  icon:"💳" },
  { id:"canales-digitales",label:"Canales Digitales", icon:"📱" },
  { id:"datos-clientes",   label:"Datos & Clientes",  icon:"📊" },
  { id:"seguridad-corp",   label:"Seguridad Corp",    icon:"🔐" },
  { id:"infraestructura",  label:"Infraestructura",   icon:"⚙️" },
];

function TeamScene({ onEnter }) {
  const [selected, setSelected] = useState(null);
  const [custom, setCustom] = useState("");
  const teamName = selected === "custom" ? custom : selected;

  return (
    <div style={{ padding:"36px 20px 28px", minHeight:"72vh", display:"flex", flexDirection:"column", justifyContent:"center", animation:"fadeUp 0.5s ease" }}>
      <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"11px", color:C.blueLight, letterSpacing:"2px", marginBottom:"20px" }}>tfe.telcel.internal</div>
      <h2 style={{ fontSize:"24px", fontWeight:"800", margin:"0 0 4px", color:C.text }}>¿Qué equipo eres?</h2>
      <p style={{ fontSize:"13px", color:C.textMid, margin:"0 0 24px", lineHeight:"1.6" }}>
        Cualquier equipo con acceso puede solicitar recursos desde este portal. El catálogo y las políticas aplican para todos.
      </p>

      <div style={{ display:"flex", flexDirection:"column", gap:"6px", marginBottom:"16px" }}>
        {SAMPLE_TEAMS.map(t => (
          <button key={t.id} onClick={() => { setSelected(t.id); setCustom(""); }} style={{
            display:"flex", alignItems:"center", gap:"12px", padding:"11px 14px",
            background: selected===t.id ? C.blueDim : C.surface,
            border:`1px solid ${selected===t.id ? C.blue : C.border}`,
            borderRadius:"8px", cursor:"pointer", textAlign:"left", fontFamily:"inherit", transition:"all 0.2s",
          }}>
            <span style={{ fontSize:"18px" }}>{t.icon}</span>
            <span style={{ fontSize:"13px", fontWeight:"600", color: selected===t.id ? C.blueLight : C.text }}>{t.label}</span>
            {selected===t.id && <span style={{ marginLeft:"auto", color:C.blue, fontSize:"16px" }}>●</span>}
          </button>
        ))}

        {/* Custom team */}
        <div style={{
          background: selected==="custom" ? C.blueDim : C.surface,
          border:`1px solid ${selected==="custom" ? C.blue : C.border}`,
          borderRadius:"8px", padding:"11px 14px", display:"flex", alignItems:"center", gap:"12px",
        }}>
          <span style={{ fontSize:"18px" }}>✏️</span>
          <input
            placeholder="Otro equipo..."
            value={custom}
            onChange={e => { setCustom(e.target.value); setSelected("custom"); }}
            onFocus={() => setSelected("custom")}
            style={{ background:"transparent", border:"none", color:C.text, fontSize:"13px", fontFamily:"inherit", flex:1, outline:"none" }}
          />
        </div>
      </div>

      <button
        onClick={() => teamName && onEnter(teamName)}
        disabled={!teamName}
        style={{
          width:"100%", padding:"14px",
          background: teamName ? C.blue : C.surface2,
          border:"none", borderRadius:"10px",
          color: teamName ? "white" : C.textDisabled,
          fontSize:"14px", fontWeight:"700",
          cursor: teamName ? "pointer" : "not-allowed",
          fontFamily:"inherit", transition:"all 0.2s",
        }}>
        Entrar al portal →
      </button>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const PHASES = ["hook","arch","team","portal","ide","plan","approval","result","cambio","cierre"];
const PHASE_LABELS = { hook:"Intro", arch:"Arquitectura", team:"Equipo", portal:"Portal", ide:"Archivos", plan:"Plan", approval:"Aprobación", result:"Resultado", cambio:"Una línea = un cambio", cierre:"Antes y ahora" };

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [phase, setPhase] = useState("hook");
  const [fileKey, setFileKey] = useState("providers");
  const [selection, setSelection] = useState(null);
  const [team, setTeam] = useState(null);
  const phaseIdx = PHASES.indexOf(phase);
  const currentFileIdx = IDE_ORDER.indexOf(fileKey);
  const isLastFile = currentFileIdx === IDE_ORDER.length - 1;
  const isFirstFile = currentFileIdx === 0;
  const isFirst = phase === "hook";
  const isLast = phase === "cierre";

  const handleTeamEnter = (t) => { setTeam(t); setPhase("portal"); };
  const handlePortalReady = (sel) => { setSelection({ ...sel, equipo: team }); setPhase("ide"); };
  const handleApprove = () => setPhase("result");
  const handleRestart = () => { setPhase("hook"); setFileKey("providers"); setSelection(null); setTeam(null); };

  const goNext = () => {
    if (phase==="hook") setPhase("arch");
    else if (phase==="arch") setPhase("team");
    else if (phase==="ide") {
      if (!isLastFile) setFileKey(IDE_ORDER[currentFileIdx+1]);
      else setPhase("plan");
    }
    else if (phase==="plan") setPhase("approval");
    else if (phase==="result") setPhase("cambio");
    else if (phase==="cambio") setPhase("cierre");
  };

  const goPrev = () => {
    if (phase==="arch") setPhase("hook");
    else if (phase==="team") setPhase("arch");
    else if (phase==="portal") setPhase("team");
    else if (phase==="ide") {
      if (!isFirstFile) setFileKey(IDE_ORDER[currentFileIdx-1]);
      else setPhase("portal");
    }
    else if (phase==="plan") { setPhase("ide"); setFileKey("policy"); }
    else if (phase==="approval") setPhase("plan");
    else if (phase==="result") setPhase("approval");
    else if (phase==="cambio") setPhase("result");
    else if (phase==="cierre") setPhase("cambio");
  };

  const nextLabel = () => {
    if (phase==="arch") return "Continuar →";
    if (phase==="ide" && isLastFile) return "Ver plan →";
    if (phase==="plan") return "Ver aprobación →";
    if (phase==="result") return "Ver cambio en vivo →";
    if (phase==="cambio") return "Ver resumen →";
    return "Siguiente →";
  };

  const showNav = phase !== "team" && phase !== "portal" && phase !== "approval" && phase !== "cierre";

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;

  return (
    <div style={{ minHeight:"100vh", background:C.bg, color:C.text, display:"flex", flexDirection:"column", maxWidth:"440px", margin:"0 auto", fontFamily:"'IBM Plex Sans','Segoe UI',sans-serif" }}>
      {/* Header */}
      <div style={{ background:C.surface, borderBottom:`1px solid ${C.border}`, padding:"10px 14px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:40 }}>
        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <div style={{ width:"30px", height:"30px", background:C.purple, borderRadius:"6px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"12px", fontWeight:"800", color:"white", fontFamily:"'IBM Plex Mono',monospace" }}>tf</div>
          <div>
            <div style={{ fontSize:"11px", fontWeight:"700", color:C.text, lineHeight:1, fontFamily:"'IBM Plex Mono',monospace" }}>
              {phase==="ide" ? META_IDE[fileKey].label : PHASE_LABELS[phase]}
            </div>
            <div style={{ fontSize:"10px", color:C.textDim }}>
              {team ? `${team} · Plataforma` : "Telcel · Plataforma"}
            </div>
          </div>
        </div>
        <div style={{ display:"flex", gap:"4px", alignItems:"center" }}>
          {PHASES.map((p,i) => (
            <div key={p} style={{ width:p===phase?"16px":"5px", height:"5px", borderRadius:"3px", background:i<=phaseIdx?C.blue:C.border, transition:"all 0.3s" }} />
          ))}
        </div>
      </div>

      {/* IDE file tabs */}
      {phase==="ide" && (
        <div style={{ background:C.surface2, padding:"5px 12px", display:"flex", gap:"4px", overflowX:"auto", borderBottom:`1px solid ${C.border}`, scrollbarWidth:"none" }}>
          {IDE_ORDER.map(key => (
            <button key={key} onClick={() => setFileKey(key)} style={{
              flexShrink:0, padding:"4px 9px",
              background:key===fileKey?C.blue:"transparent",
              border:`1px solid ${key===fileKey?C.blue:C.border}`,
              borderRadius:"4px", color:key===fileKey?"white":C.textDim,
              fontSize:"9px", fontFamily:"'IBM Plex Mono',monospace", cursor:"pointer", whiteSpace:"nowrap",
            }}>
              {META_IDE[key].icon} {META_IDE[key].label.split("/").pop()}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div style={{ flex:1, overflowY:"auto" }}>
        {phase==="hook"     && <HookScene />}
        {phase==="arch"     && <ArchScene />}
        {phase==="team"     && <TeamScene onEnter={handleTeamEnter} />}
        {phase==="portal"   && <PortalScene onReady={handlePortalReady} />}
        {phase==="ide"      && <IDEScene fileKey={fileKey} onFileChange={setFileKey} />}
        {phase==="plan"     && <PlanScene selection={selection} />}
        {phase==="approval" && <ApprovalScene selection={selection} onApprove={handleApprove} />}
        {phase==="result"   && <ResultScene selection={selection} />}
        {phase==="cambio"   && <CambioScene selection={selection} />}
        {phase==="cierre"   && <CierreScene onRestart={handleRestart} />}
      </div>

      {/* Navigation — hidden on portal and approval (they have their own CTAs) */}
      {showNav && (
        <div style={{ background:C.surface, borderTop:`1px solid ${C.border}`, padding:"10px 14px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", bottom:0 }}>
          <button onClick={goPrev} disabled={isFirst} style={{
            padding:"10px 18px", background:"transparent",
            border:`1px solid ${isFirst?C.border:C.border2}`,
            borderRadius:"8px", color:isFirst?C.textDisabled:C.textMid,
            fontSize:"13px", fontWeight:"600", cursor:isFirst?"not-allowed":"pointer", fontFamily:"inherit",
          }}>← Atrás</button>
          <span style={{ fontSize:"10px", color:C.textDim, fontFamily:"'IBM Plex Mono',monospace" }}>
            {phase==="ide" ? `${currentFileIdx+1} / ${IDE_ORDER.length}` : ""}
          </span>
          {isLast
            ? null
            : <button onClick={goNext} style={{
                padding:"10px 18px", background:C.blue, border:"none", borderRadius:"8px",
                color:"white", fontSize:"13px", fontWeight:"700", cursor:"pointer", fontFamily:"inherit",
              }}>{nextLabel()}</button>
          }
        </div>
      )}

      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);} }
        @keyframes slideIn { from{transform:translateX(-100%);}to{transform:translateX(0);} }
        @keyframes blink { 0%,100%{opacity:1;}50%{opacity:0;} }
        *{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
        button:active{opacity:0.8;}
        ::-webkit-scrollbar{width:3px;height:3px;}
        ::-webkit-scrollbar-track{background:${C.bg};}
        ::-webkit-scrollbar-thumb{background:${C.border};border-radius:2px;}
      `}</style>
    </div>
  );
}
