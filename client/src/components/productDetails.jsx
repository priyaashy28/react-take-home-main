import { Button, Grid, Paper, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";

const PREFIX = "EditProduct";
const classes = {
  selectStyle: `${PREFIX}-selectStyle`,
  buttonGoBack: `${PREFIX}-buttonGoBack`,
  submitEditButton: `${PREFIX}-submitEditButton`,
  gapBetween: `${PREFIX}-gapBetween`,
};

const ProductContainer = styled("div")(() => ({
  [`& .${classes.selectStyle}`]: {
    width: "100%",
    height: "40px",
    marginTop: "5px",
  },
  [`& .${classes.buttonGoBack}`]: {
    marginTop: "5px",
  },
  [`& .${classes.submitEditButton}`]: {
    margin: "5px auto ",
    display: "flex",
    justifyContent: "end",
  },
  [`& .${classes.gapBetween}`]: {
    marginTop: "5px",
  },
}));

const initialValues = {
  name: "",
  type: "",
  size: "",
  feature: "",
  brand: "",
};

export const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  /* Fetch product details based on id from server */
  useEffect(() => {
    fetch(`http://localhost:8080/api/products/${Number(id)}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [id]);

  return (
    <ProductContainer>
      <Grid container>
        <Grid item sm={3} xs={false}></Grid>
        <Grid item sm={6} xs={12}>
          <Paper>
            <Box m={5} p={3} gap={6}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography variant="h4">Edit Product Form</Typography>
                </Grid>
                <Grid item>
                  <Link to={"/"}>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      className={classes.buttonGoBack}
                    >
                      Go Back
                    </Button>
                  </Link>
                </Grid>
              </Grid>
              <Typography variant="h4"></Typography>
              <Formik
                initialValues={initialValues}
                validate={(values) => {
                  if (values.name) {
                    fetch(`http://localhost:8080/api/validate/${product.id}`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ name: values.name }),
                    })
                      .then((response) => response.json())
                      .then((data) => {
                        console.log(data.error);
                        if (data?.error) {
                          setError(data.error);
                        } else {
                          setError("");
                        }
                      });
                  }
                }}
                onSubmit={(values, { resetForm }) => {
                  fetch(`http://localhost:8080/api/products/${product.id}`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      name: values.name,
                      type: values.type,
                      brand: values.brand,
                      sizes: [values.size],
                      features: [values.feature],
                      materials: "materials",
                    }),
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      console.log("PUT", data);
                      setSuccess(true);
                      resetForm(initialValues);
                    });
                }}
              >
                {({ isSubmitting, dirty, errors, values }) => (
                  <Form key={product.id}>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Product Name"
                      as={TextField}
                      fullWidth
                      className={classes.gapBetween}
                    />
                    {error && (
                      <div>
                        <Typography variant="h4" color="error">
                          {error}
                        </Typography>
                      </div>
                    )}
                    <Field
                      name="type"
                      as="select"
                      fullWidth
                      className={classes.selectStyle}
                    >
                      <option defaultValue>Product Type</option>
                      <option value="outerwear">Outerwear</option>
                      <option value="dress">Dress</option>
                      <option value="activewear">Activewear</option>
                      <option value="top">Top</option>
                      <option value="footwear">Footwear</option>
                    </Field>
                    {values.type !== "" && (
                      <>
                        <Field
                          name="size"
                          as="select"
                          fullWidth
                          className={classes.selectStyle}
                        >
                          <option defaultValue>Size</option>
                          {values.type === "footwear" ? (
                            <>
                              <option value="US 7">US 7</option>
                              <option value="US 8">US 8</option>
                              <option value="US 9">US 9</option>
                              <option value="US 10">US 10</option>
                            </>
                          ) : (
                            <>
                              <option value="XS">XS</option>
                              <option value="S">S</option>
                              <option value="M">M</option>
                              <option value="L">L</option>
                              <option value="XL">XL</option>
                            </>
                          )}
                        </Field>
                        <Field
                          type="text"
                          name="feature"
                          placeholder="Feature"
                          as={TextField}
                          fullWidth
                          className={classes.gapBetween}
                        />
                        <Field
                          type="text"
                          name="brand"
                          placeholder="Brand"
                          as={TextField}
                          fullWidth
                          className={classes.gapBetween}
                        />
                      </>
                    )}

                    {success && (
                      <div>
                        <Typography variant="h5" color="success.main">
                          Successfully updated product with details
                        </Typography>
                      </div>
                    )}
                    <Button
                      color="primary"
                      variant="contained"
                      type="submit"
                      disabled={!dirty}
                      className={classes.submitEditButton}
                    >
                      Update
                    </Button>
                  </Form>
                )}
              </Formik>
            </Box>
          </Paper>
        </Grid>
        <Grid item sm={3} xs={false}></Grid>
      </Grid>
    </ProductContainer>
  );
};
