import { CadastroFinalizado } from "./pages/CadastroFinalizado";
import { Cadastro } from "./pages/Cadastro"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import { Home } from "./pages/Home";
import { Pay } from "./pages/Pay";
import { Requests } from "./pages/Requests";
import { VisaoGeral } from "./pages/VisaoGeral";

function App() {

  return (
    <div className="App bg-zinc-800 w-full h-screen flex justify-center font-inter">
      <Router >
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/cadastro-finalizado" element={<CadastroFinalizado />} />
            <Route path="/login" element={<Login />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/visao-geral" element={<VisaoGeral />} />
            <Route path="/cadastro/:matricula" element={<Cadastro userExists />} />
            <Route path="/pay/:user_id" element={<Pay />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
