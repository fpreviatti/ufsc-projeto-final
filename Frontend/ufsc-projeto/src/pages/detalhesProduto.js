import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";

import React from "react";

import Box from "@mui/material/Box";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Card from "@mui/material/Card";

import { useParams } from "react-router-dom";

import "../styles/detalhes.css";

const DetalhesProduto = () => {
  const navigate = useNavigate();
  const [produto, setProduto] = useState([]);
  const [categoria, setCategoria] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios("http://localhost:8080/produtos/" + id)
      .then((res) => setProduto(res.data))
      .then((res) => setCategoria(res.data.categoria))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios("http://localhost:8080/produtos/" + id)
      .then((res) => setCategoria(res.data.categoria))
      .catch((err) => console.log(err));
  }, []);

  const handleClick = () => {
    navigate("/produtos");
  };

  return (
    <div className="container">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {categoria.descricao}
          </Typography>
          <Typography variant="h5" component="div">
            {produto.descricao}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            R${produto.preco}
          </Typography>
          <Typography variant="body2">
            <img
              src={"http://localhost:8080/arquivo/" + produto.caminhoImagem}
            ></img>
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleClick}>
            Voltar
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
export default DetalhesProduto;
