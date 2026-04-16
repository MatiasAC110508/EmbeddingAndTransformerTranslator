# 🚀 Embedding & Transformer Translator

Aplicación web construida con **Next.js (App Router)** que implementa autenticación, validación de datos con Zod y arquitectura modular lista para escalar. El proyecto está preparado para ejecución local y despliegue mediante Docker.

---

# 🧠 Arquitectura del Proyecto

```bash
.
├── src/
│   ├── api/                # Endpoints (API Routes)
│   ├── app/                # App Router (Next.js)
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── favicon.ico
│   ├── components/         # Componentes reutilizables
│   ├── hooks/              # Custom hooks
│   ├── lib/
│   │   └── validations/    # Esquemas Zod
│   └── utils/              # Funciones auxiliares
│
├── public/                 # Archivos estáticos
├── Dockerfile              # Contenerización
├── .dockerignore
├── .env                    # Variables de entorno (NO subir)
├── .gitignore
├── README.md
├── package.json
└── tsconfig.json
```

---

# ⚙️ Tecnologías

* Next.js (App Router)
* TypeScript
* Zod (validación de datos)
* Tailwind CSS
* Docker

---

# 🔐 Autenticación

El flujo de autenticación se maneja desde:

```bash
src/app/auth/login
src/app/auth/register
```

Las validaciones se centralizan en:

```bash
src/lib/validations
```

Ejemplo con Zod:

```ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
```

---

# 🌐 API Routes

Ubicadas en:

```bash
src/api
```

Ejemplo:

```ts
// POST /api/login
export async function POST(req: Request) {
  const body = await req.json();
  // validación + lógica
}
```

---

# 🖥️ Frontend

Uso de componentes reutilizables:

```ts
type Props = {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export default function Input({ type = "text", placeholder, value, onChange }: Props) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      className="p-2 bg-zinc-900 rounded w-full"
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
```

Uso en páginas:

```ts
const [email, setEmail] = useState("");

<Input
  placeholder="Email"
  value={email}
  onChange={setEmail}
/>
```

---

# 🚨 Nota importante (Login)

El login **debe usar POST**, no GET.

```ts
await fetch("/api/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email, password }),
});
```

Motivo:

* Seguridad (no exponer credenciales en URL)
* Buenas prácticas REST

---

# 🐳 Docker

## Build de la imagen

```bash
docker build -t ai-app .
```

## Ejecutar contenedor

```bash
docker run -p 3000:3000 ai-app
```

## Con variables de entorno

```bash
docker run -p 3000:3000 \
  -e GEMINI_API_KEY=tu_api_key \
  ai-app
```

---

# 🔒 Variables de entorno

Archivo:

```bash
.env
```

Ejemplo:

```env
GEMINI_API_KEY=your_api_key_here
```

---

# 🚫 .gitignore

```bash
node_modules
.next
.env*
```

---

# 🚫 .dockerignore

```bash
node_modules
.next
.env*
npm-debug.log
Dockerfile
.dockerignore
```

---

# ▶️ Desarrollo local

```bash
npm install
npm run dev
```

App disponible en:

```bash
http://localhost:3000
```

---

# 📌 Buenas prácticas implementadas

* Separación clara de responsabilidades
* Validación con Zod
* Componentes reutilizables
* Arquitectura escalable
* Seguridad en manejo de credenciales
* Preparado para producción con Docker

---

# 🚀 Próximos pasos (recomendado)

* Implementar JWT o sesiones
* Middleware de protección de rutas
* Persistencia con base de datos
* Deploy (Vercel o Docker en VPS)

---

# 👨‍💻 Autor

Matías Aguirre Correa
