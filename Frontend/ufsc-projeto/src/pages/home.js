import "../styles/imagem-home.css";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Card from "@mui/material/Card";

const Home = () => {


  return (
    
    <div className="container">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" align="center" component="div">
            Classificados
          </Typography>
        </CardContent>
      </Card>
      <br></br>
      
      <img src="/images/home.png"></img>;
    </div>
  );

};
  
  export default Home;