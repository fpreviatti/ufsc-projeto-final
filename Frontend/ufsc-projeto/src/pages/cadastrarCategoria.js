import axios from "axios";

import { useNavigate } from "react-router-dom";

import React, { Component } from "react";
import { Link } from "react-router-dom";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Card from "@mui/material/Card";

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

    alert("Categoria cadastrada com sucesso!");
  };

  handleClick = () => {
    const navigate = useNavigate();
    navigate("/");
  };

  render() {
    return (
      <div className="container">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" align="center" component="div">
              Cadastrar categoria
            </Typography>
          </CardContent>
        </Card>
        <br></br>
        <form className="formulario" onSubmit={this.handleSubmit} method="post">
          <label htmlFor="fname" className="label-estilizado">
            Nome da Categoria
          </label>
          <br></br>

          <input type="text" name="nome" className="input-estilizado"></input>
          <br></br>

          <Button variant="contained" size="medium" type="submit">Cadastrar Categoria</Button>

        </form>
        <br></br>
      </div>
    );
  }
}
