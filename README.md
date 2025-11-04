# 📱 Projeto Base - Expo

Template inicial para criação de projetos **React Native com Expo**, já preparado para desenvolvimento multiplataforma (Android, iOS e Web).

---

## 🚀 **Como Iniciar o Projeto**

### Criar novo projeto
```bash
npx create-expo-app@latest nome-do-projeto
```

### Instalar dependências
```bash
npm install
```

---

## ▶️ **Como Rodar o Projeto (Mobile)**

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/gusandrini/chall-mottu.git
cd mottu
```

### 2️⃣ Instalar dependências
```bash
npm install
```

### 3️⃣ Executar o projeto
```bash
npx expo start
```

**Atalhos rápidos:**  
📱 Android → `a`  
🍎 iOS → `i`  
🌐 Web → `w`

> ⚠️ No iOS, certifique-se de que o **Expo Go** e o computador estejam na **mesma rede Wi-Fi**.

---

## 🗂️ **Estrutura de Pastas (Mobile)**

```
base/
│
├── android/              # Configurações específicas do Android
│
├── assets/               # Ícones, imagens e fontes
│
├── scripts/
│   └── update-commit-hash.cjs  # Atualiza hash de commit no build
│
├── src/
│   ├── api/              # Axios + endpoints da API
│   ├── components/       # Componentes reutilizáveis (Header, Footer, etc.)
│   ├── context/          # Contextos globais (ex: ThemeContext)
│   ├── i18n/             # Internacionalização (pt-BR, es-ES)
│   ├── images/           # Logos e imagens locais
│   ├── models/           # Tipos e interfaces TypeScript
│   ├── screens/          # Telas principais (Login, Cliente, Moto, etc.)
│   ├── services/         # Providers e serviços (ex: autenticação)
│   ├── theme/            # Paleta de cores e estilos globais
│   └── Notificacao.ts    # Funções de notificação push/local
│
├── App.tsx
├── app.json
├── eas.json
├── index.tsx
├── package.json
├── package-lock.json
└── tsconfig.json
```

---

## 🔗 **Repositórios e Deploys**

| Tipo | Link |
|------|------|
| 📱 **Mobile (GitHub)** | [https://github.com/](https://github.com/) |
| ☁️ **API (GitHub)** | [https://github.com/](https://github.com/) |
| 🗄️ **API Online (H2 Console)** | [https://projeto.onrender.com/h2-console](https://projeto.onrender.com/h2-console) |
| 🧱 **Build EAS (Expo)** | [https://expo.dev/](https://expo.dev/) |
| 🔥 **Firebase App Distribution (Android)** | [https://console.firebase.google.com](https://console.firebase.google.com) |

---

## 🧰 **Stack Utilizada**

- **React Native (Expo SDK mais recente)**  
- **TypeScript**  
- **Axios** para consumo de API  
- **Context API** para gerenciamento de estado  
- **i18n-js** para tradução e suporte multilíngue  
- **Expo Notifications** (push/local)  
- **EAS Build** para deploy e distribuição  
- **Firebase App Distribution** para testes internos  

---

## 💡 **Dicas e Boas Práticas**

- Sempre execute `npm install` após clonar ou atualizar o repositório.  
- Use `git pull` antes de começar a programar, garantindo que está com a versão mais recente.  
- Ao atualizar o código, gere um novo build com:
  ```bash
  npx expo build:android
  ```
- Configure variáveis sensíveis no arquivo `.env` (não versionado).  

---

## 👥 **Autores**

Projeto mantido por [Gustavo Sandrini](https://github.com/gusandrini) 
