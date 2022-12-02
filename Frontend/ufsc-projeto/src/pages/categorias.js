import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Button from "@mui/material/Button";

import Card from "@mui/material/Card";

import Typography from "@mui/material/Typography";

import DetailsIcon from "@mui/icons-material/Details";

import EditIcon from "@mui/icons-material/Edit";

import { Tooltip } from "@mui/material";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import "../styles/cadastrar-produto.css";

import "../styles/tabela-categorias.css";

export default function Categorias() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/CadastrarCategoria");
  };

  const [state, setState] = useState({
    fields: {
      alterar: false,
      excluir: false,
      id: 0,
    },
  });

  const [dataTable, setDataTable] = useState([]);

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

  async function handleEditar() {
    navigate("/edit-categoria/" + state.fields.id, {
      state: { id: state.fields.id },
    });
    return;
  }

  async function handleExcluir() {
    const url = "http://localhost:8080/categorias/" + state.fields.id;

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

    navigate("/view-categoria/" + idPassada, {
      state: { id: state.fields.id },
    });
  }

  useEffect(() => {
    axios("http://localhost:8080/categorias")
      .then((res) => setDataTable(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" align="center" component="div">
            Categorias
          </Typography>
        </CardContent>
      </Card>
      <br></br>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Descrição</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataTable.map((row, indexTable) => (
              <TableRow>
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">{row.descricao}</TableCell>

                <TableCell align="center">
                  <Tooltip title="Excluir categoria">
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

                  <Tooltip title="Visualizar categoria">
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

                  <Tooltip title="Editar categoria">
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
              Nova Categoria
            </Button>
          </Typography>
        </CardContent>
      </Card>

      <br></br>
      <br></br>
    </div>
  );
}
