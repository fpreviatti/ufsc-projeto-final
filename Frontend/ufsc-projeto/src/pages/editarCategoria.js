import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";

import React from "react";

import { useParams } from "react-router-dom";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Card from "@mui/material/Card";

import "../styles/detalhes.css";

const EditarCategoria = () => {
  const navigate = useNavigate();

  const [categoria, setCategoria] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios("http://localhost:8080/categorias/" + id)
      .then((res) => setCategoria(res.data))
      .catch((err) => console.log(err));
  }, []);

  function handleSubmit() {
    const url = "http://localhost:8080/categorias/"+id;

    const dados = {
      id: categoria.id,
      descricao: document.getElementById("nome").value,
    };

    console.log(dados);

    const config = {
      headers: {},
    };
    axios.put(url, dados, config).then((response) => {
      console.log(response.data);
    });

    alert('Categoria atualizada com sucesso!');
    
    return;
  }

  return (
    <div className="container">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" align="center" component="div">
            Editar Categoria ID: {id}
          </Typography>
        </CardContent>
      </Card>
      <br></br>
      <form className="formulario" onSubmit={handleSubmit} method="put">
        <label htmlFor="fname" className="label-estilizado">
          Nome da Categoria
        </label>
        <br></br>

        <input type="text" id="nome" className="input-estilizado"></input>
        <br></br>

        <input type="submit" value="Alterar Categoria"></input>
      </form>
      <br></br>
    </div>
  );
};
export default EditarCategoria;
