import { CadastroFinalizado } from "./pages/CadastroFinalizado";
import { Cadastro } from "./pages/Cadastro"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import { Home } from "./pages/Home";
import { Pay } from "./pages/Pay";
import { Requests } from "./pages/Requests";
import { VisaoGeral } from "./pages/VisaoGeral";
import { AdmPay } from "./pages/AdmPay";
import { ConfirmarPedido } from "./pages/ConfirmarPedido";

function App() {

  return (
    <div className="App bg-zinc-800 w-full h-screen flex justify-center font-inter">
      <Router >
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/cadastro-finalizado" element={<CadastroFinalizado />} />
            <Route path="/confirmar-pedido" element={<ConfirmarPedido />} />
            <Route path="/login" element={<Login />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/visao-geral" element={<VisaoGeral />} />
            <Route path="/adm-pay" element={<AdmPay />} />
            <Route path="/cadastro/:matricula" element={<Cadastro userExists />} />
            <Route path="/editar/:shirt_id" element={<Cadastro edit />} />
            <Route path="/pay/:user_id" element={<Pay />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
