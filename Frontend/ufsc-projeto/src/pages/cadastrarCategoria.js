import axios from "axios";

import { useNavigate } from "react-router-dom";

import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../styles/cadastrar-produto.css";

import { useState } from "react";

var descricaoCategoria = "";


export default class CadastrarCategoria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      data: "",
    };

  }

  handleSubmit = (event) => {
    console.log(this.data);
    event.preventDefault();

    const url = "http://localhost:8080/categorias";

    const dados = {
      descricao: event.target.elements.nome.value,
    };

    console.log(dados);

    const config = {
      headers: {},
    };
    axios.post(url, dados, config).then((response) => {
      console.log(response.data);
    });

    alert('Categoria cadastrada com sucesso!');
  };

  handleClick = () => {
    const navigate = useNavigate();
    navigate("/");
  };

  render() {

    return (
      <div>
        <form className="formulario" onSubmit={this.handleSubmit} method="post">
          <label htmlFor="fname" className="label-estilizado">
            Nome da Categoria
          </label>
          <br></br>

          <input type="text" name="nome" className="input-estilizado"></input>
          <br></br>

          <input type="submit" value="Cadastrar Categoria"></input>
        </form>
        <br></br>
      </div>
    );
  }
}



















































/*

const CadastrarCategoria = () => {
  // 👇️ set initial value in call to useState
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
    descricaoCategoria = message;
    console.log(event.target.value);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    const url = "http://localhost:8080/categorias";
    const dados = {
      descricao: descricaoCategoria,
    };

    const config = {
      headers: {},
    };
    axios.post(url, dados, config).then((response) => {
      console.log(response.data);
    });

    navigate("/");
  };
  return (
    <form className="formulario" onSubmit={handleClick} method="post">
      <label htmlFor="fname" className="label-estilizado">
        Descrição da Categoria
      </label>
      <br></br>
      <input
        type="text"
        id="message"
        className="input-estilizado"
        onChange={handleChange}
        value={message}
      ></input>
      <br></br>

      <input type="submit"></input>
    </form>
  );
};

export default CadastrarCategoria;

*/