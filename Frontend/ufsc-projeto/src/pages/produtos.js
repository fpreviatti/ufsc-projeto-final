import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import React from "react";
import { ReactDOM } from "react";

import { TableFooter, Tooltip } from "@mui/material";

import DetailsIcon from "@mui/icons-material/Details";

import EditIcon from "@mui/icons-material/Edit";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Card from "@mui/material/Card";

import Typography from "@mui/material/Typography";

import { useReducer } from "react";

import "../styles/tabela-produtos.css";

export default function Produtos() {
  const navigate = useNavigate();

  const [state, setState] = useState({
    fields: {
      excluir: false,
      alterar: false,
      id: 0,
    },
  });

  const handleClick = () => {
    navigate("/CadastrarProduto");
  };

  useEffect(() => {
    if (state.fields.alterar == true) {
      handleEditar();
    } else if (state.fields.excluir == true) {
      handleExcluir();
    } else {
      if (state.fields.id != 0) {
        state.fields.alterar = false;
        handleDetalhes(state.fields.id);
      }
    }
  }, [state.fields.id]);

  function handleEditar() {
    navigate("/edit-produto/" + state.fields.id, {
      state: { id: state.fields.id },
    });
  }

  async function handleExcluir() {
    const url = "http://localhost:8080/produtos/" + state.fields.id;

    const config = {
      headers: {},
    };

    axios.delete(url, config).then((response) => {});

    setDataTable(dataTable.filter((row) => row.id !== state.fields.id));

    return;
  }

  async function handleDetalhes(idPassada) {
    setState({
      ...state,
      fields: {
        id: idPassada,
      },
    });

    navigate("/view-produto/" + idPassada, { state: { id: state.fields.id } });
  }

  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    axios("http://localhost:8080/produtos")
      .then((res) => setDataTable(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" align="center" component="div">
            Produtos
          </Typography>
        </CardContent>
      </Card>
      <br></br>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Descrição</TableCell>
              <TableCell align="center">Preço</TableCell>
              <TableCell align="center">Quantidade em estoque</TableCell>
              <TableCell align="center">Categoria</TableCell>
              <TableCell align="center">Imagem</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataTable.map((row) => (
              <TableRow hover>
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">{row.descricao}</TableCell>
                <TableCell align="center">R${row.preco}</TableCell>
                <TableCell align="center">{row.quantidade}</TableCell>
                <TableCell align="center">{row.categoria.descricao}</TableCell>
                <TableCell align="center">
                  <img
                    width="128"
                    height="64"
                    src={"http://localhost:8080/arquivo/" + row.caminhoImagem}
                  ></img>
                </TableCell>

                <TableCell align="center">
                  <Tooltip title="Apagar produto">
                    <DeleteIcon
                      className="icone-delete"
                      onClick={() =>
                        setState({
                          ...state,
                          fields: {
                            excluir: true,
                            alterar: false,
                            id: row.id,
                          },
                        })
                      }
                    ></DeleteIcon>
                  </Tooltip>

                  <Tooltip title="Visualizar produto">
                    <DetailsIcon
                      className="icone-visualizar"
                      onClick={() =>
                        setState({
                          ...state,
                          fields: {
                            alterar: false,
                            id: row.id,
                          },
                        })
                      }
                    ></DetailsIcon>
                  </Tooltip>

                  <Tooltip title="Editar produto">
                    <EditIcon
                      className="icone-editar"
                      onClick={() =>
                        setState({
                          ...state,
                          fields: {
                            alterar: true,
                            id: row.id,
                          },
                        })
                      }
                    ></EditIcon>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>

      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" align="center" component="div">
            <Button variant="contained" size="large" onClick={handleClick}>
              Novo Produto
            </Button>
          </Typography>
        </CardContent>
      </Card>

      <br></br>
      <br></br>
    </div>
  );
}
