import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import { AvatarCaption } from "./avatarCaption";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  maxWidth: 400,
}));

const Container = styled("div")(({ theme }) => ({
  margin: theme.spacing(10),
  textAlign: "center",
}));

export const ProductsList = () => {
  const [products, setProducts] = React.useState([]);

  /* Fetch products list from server */
  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <Container>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Typography variant="h4" sx={{ textDecoration: "underline" }}>
            Products List
          </Typography>
        </Grid>
        <Grid item>
          <Link to={"/api/products"}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ mt: 2, width: "fit-content" }}
              startIcon={<AddCircleIcon />}
              style={{ marginTop: "5px" }}
            >
              Add Product
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
        {products.map((product) => (
          <Item
            key={product.id} // Add key property to the product object
            sx={{
              my: 1,
              mx: "auto",
              p: 2, // Add p property to the product object
            }}
          >
            <Stack spacing={2} direction="row" alignItems="center">
              <AvatarCaption type={product.type} />
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {product.name}
              </Typography>
            </Stack>
            <Stack sx={{ ml: 4 }}>
              <List>
                {product.features.map((feature) => (
                  <ListItem key={feature}>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText>{feature}</ListItemText>
                  </ListItem>
                ))}
              </List>
            </Stack>
            <Stack sx={{ ml: 4, display: "flex" }}>
              <Link to={"/api/products/" + product.id}>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  sx={{ mt: 2, width: "fit-content" }}
                >
                  Edit Product
                </Button>
              </Link>
            </Stack>
          </Item>
        ))}
      </Box>
    </Container>
  );
};
