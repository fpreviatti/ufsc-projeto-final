import React, { Component } from "react";
import axios from "axios";

import "../styles/cadastrar-produto.css";

import { ReactDOM } from "react";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      arquivo: undefined,
      idArquivo: ''
    };
  }

  selecionaArquivo = (event) => {
    this.arquivo = event.target.files[0];
  };

  enviarArquivo = (event) => {
    event.preventDefault();

    console.log(this.arquivo);

    const url = "http://localhost:8080/arquivo";
    const formData = new FormData();

    formData.append("image", this.arquivo);
    formData.append("fileName", this.arquivo.name);

    const config = {
      headers: {},
    };

    axios.post(url, formData, config).then((response) => {
      this.idArquivo = response.data.id;
      document.getElementById("arquivo").value = this.idArquivo;
    });
    alert("Arquivo importado com sucesso!");
    console.log(this.arquivo);

    return this.arquivo;
  };

  render() {
    return (
      <div>
        <br></br>

        <label htmlFor="fname" className="label-estilizado">
          Inserir foto do produto
        </label>
        <br></br>

        <input hidden id="arquivo" value={""}></input>

        <br></br>
        <input type="file" onChange={this.selecionaArquivo} />

        <button type="submit" onClick={this.enviarArquivo}>
          Upload
        </button>
        <br></br>

        <br></br>
      </div>
    );
  }
}

export default Upload;
