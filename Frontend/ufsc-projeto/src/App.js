import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Produtos from "./pages/produtos";

import Home from "./pages/home";
import NoPage from "./pages/noPage";

import "./index.css";
import Layout from "./pages/layout";
import Categorias from "./pages/categorias";
import CadastrarProduto from "./pages/cadastrarProduto";
import CadastrarCategoria from "./pages/cadastrarCategoria";
import Footer from "./pages/footer";

import DetalhesProduto from "./pages/detalhesProduto";
import EditarProduto from "./pages/editarProduto";
import DetalhesCategoria from "./pages/detalhesCategoria";
import EditarCategoria from "./pages/editarCategoria";

function App() {
  document.title = 'Classificados'
    return (
      <div>
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/CadastrarCategoria" element={<CadastrarCategoria />} />

          <Route path="/CadastrarProduto" element={<CadastrarProduto />} />

          <Route path="/categorias" element={<Categorias />} />

          <Route path="/view-produto/:id" element={<DetalhesProduto />}></Route>

          <Route path="/edit-produto/:id" element={<EditarProduto />}></Route>

          <Route path="/edit-categoria/:id" element={<EditarCategoria />}></Route>

          <Route
            path="/view-categoria/:id"
            element={<DetalhesCategoria />}
          ></Route>

          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
      </div>
    );
  }
  
  export default App;