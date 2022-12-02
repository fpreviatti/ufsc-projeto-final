import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../styles/cadastrar-produto.css";

import Select from "react-select";

import Upload from "./upload";

import { ReactDOM } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

import React, { Component } from "react";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Card from "@mui/material/Card";

export default class CadastrarProduto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectOptions: [],
      id: "",
      name: "",
      message: "",
      file: "",
      data: "",
      arquivo: undefined,
      isValid: false,
      arquivoId: "",
      selecionou: false,
      categoria: "categoria",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async getOptions() {
    const res = await axios.get("http://localhost:8080/categorias");
    const data = res.data;

    const options = data.map((d) => ({
      value: (this.id = d.id),
      label: (this.descricao = d.descricao),
    }));

    this.setState({ selectOptions: options });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.id == "") {
      alert("Obrigatorio escolher uma categoria");
    } else if (document.getElementById("arquivo").value == "") {
      alert("Favor adicionar um arquivo");
    } else {
      const fetchPromise = fetch(
        "http://localhost:8080/retornaArquivo/" +
          document.getElementById("arquivo").value
      );

      fetchPromise
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          const config = {
            headers: {},
          };

          const url = "http://localhost:8080/produtos";

          const dados = {
            arquivo: data,
            descricao: event.target.elements.nome.value,
            preco: event.target.elements.preco.value,
            quantidade: event.target.elements.quantidade.value,
            caminhoImagem: document.getElementById("arquivo").value,
            categoria: {
              id: this.state.id,
              descricao: this.state.descricao,
            },
          };

          console.log(dados);

          axios.post(url, dados, config).then((response) => {
            console.log(response.data);
          });

          alert("Produto cadastrado com sucesso!");

          return;
        });
    }
  };

  handleChange(e) {
    this.setState({ id: e.value, name: e.label });
  }

  handleClick = () => {
    const navigate = useNavigate();
    navigate("/");
  };

  componentDidMount() {
    this.getOptions();

   
  }

  fetchData = (id) => {
    this.state.idProduto = id;
  };

  render() {
    const age = "assasaas";
    return (
      <div className="container">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" align="center" component="div">
              Cadastrar Produto
            </Typography>
          </CardContent>
        </Card>
        <br></br>

        <form className="formulario" onSubmit={this.handleSubmit} method="post">
          <label htmlFor="fname" className="label-estilizado">
            Nome do Produto
          </label>
          <br></br>
          <input
            type="text"
            required
            name="nome"
            className="input-estilizado"
          ></input>
          <br></br>

          <label htmlFor="fname" className="label-estilizado">
            Quantidade
          </label>
          <br></br>
          <input
            required
            type="number"
            name="quantidade"
            className="input-estilizado"
          ></input>
          <br></br>

          <label htmlFor="fname" className="label-estilizado">
            Preco
          </label>
          <br></br>
          <input
            type="number"
            required
            step=".01"
            name="preco"
            className="input-estilizado"
          ></input>
          <br></br>

          <Select
            options={this.state.selectOptions}
            onChange={this.handleChange.bind(this)}
          />

          <br></br>

          <Upload enviarArquivo={this.state.arquivo} />

          <Button variant="contained" size="large" type="submit">
            Cadastrar Produto
          </Button>
        </form>
        <br></br>
      </div>
    );
  }
}
