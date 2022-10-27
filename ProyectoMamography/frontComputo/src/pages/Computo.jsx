import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  Row,
  Col,
  Container,
  Card,
  Navbar,
  Nav,
  Spinner,
} from "react-bootstrap";
import "../css/view.css";
import logo from "../assets/logo.png";
import { postRequest } from "../utils/axiosClient";
import { postRequestNode } from "../utils/axiosNode";

const Computo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const [desactivar, setDesactivar] = useState(false);
  const [modificacionLogoView, setModificacionLogoView] = useState("");
  const [backLogo, setBackLogo] = useState(null);
  const [info, setInfo] = useState("");
  const [etiqueta, setEtiqueta] = useState("");

  useEffect(() => {
    if (watch("logo") !== undefined && watch("logo").length > 0) {
      if (watch("logo")[0].size !== undefined) {
        setBackLogo(watch("logo")[0]);
        base2a64ViewLogo(watch("logo")[0]);
        setEtiqueta("");
        setInfo("");
      } else {
        setBackLogo(watch("logo"));
      }
    } else {
      setBackLogo(null);
    }
  }, [watch("logo")]);

  const base2a64ViewLogo = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setModificacionLogoView(reader.result.toString());
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data) => {
    setDesactivar(true);
    let dataFor = new FormData();

    dataFor.append("image", data.logo[0]);
    try {
      // -------------- API Classify Verification ----
      const responseNode = await postRequestNode("classify/", dataFor);
      const dataSeno = responseNode.data.predictions;
      const senoValor = dataSeno[0].class == "seno" ? dataSeno[0] : dataSeno[1];
      if (senoValor.score > 0.8) {
        // -------------- API MAMOGRAPHY ----------------
        const response = await postRequest("mamography/", dataFor);
        setEtiqueta(response.data.etiqueta);
        setInfo(response.data.presicion);
      } else {
        console.log("Ingrese una imagen de un seno");
      }
    } catch (error) {
      console.log(error);
      console.log(
        "Formato de imagen no soportada, por favor seleccione una imagen en formato .jpg o .png"
      );
    }
    reset();
    setTimeout(() => {
      setDesactivar(false);
    }, 1000);
  };

  return (
    <>
      <div className="containerPadre">
        <Navbar
          collapseOnSelect
          expand="xl"
          bg="white"
          fixed="top"
          className="apareciendo"
        >
          <Container>
            <Navbar.Brand
              href="https://www.unicaribe.mx/"
              target="_blank"
              className="divImgPersonalizable"
            >
              <img src={logo} className="imgPersonalizable" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="text-center">
              <Nav className="mx-auto navResponsive">
                <Nav.Link href="/" style={{ color: "#FF6F91" }}>
                  ALL MIAS
                </Nav.Link>
                <Nav.Link
                  href="https://www.unicaribe.mx/"
                  target="_blank"
                  style={{ color: "#FF6F91" }}
                >
                  Universidad del Caribe
                </Nav.Link>
                <Nav.Link href="/" disabled>
                  Colaboradores
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div className="homeContacto">
          <Container className="">
            <Row className="text-center">
              <Col xs={12} md={12} lg={12}>
                <span className="pruebaSpan font_titulo_personalizado2">
                  Mammography
                </span>{" "}
                <span className="pruebaSpan font_titulo_personalizado2">
                  Image
                </span>{" "}
                <span className="pruebaSpan font_titulo_personalizado2">
                  Analysis
                </span>{" "}
                <span className="pruebaSpan font_titulo_personalizado2">
                  Society
                </span>
              </Col>
              <Col xs={12} md={12} lg={12} className="mt-2">
                <span className="pruebaSpan2 font_titulo_personalizado">
                  ALL
                </span>{" "}
                <span className="pruebaSpan2 font_titulo_personalizado">
                  MIAS
                </span>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col xs={12} md={6} lg={6}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Card style={{ border: "none", background: "transparent" }}>
                    <Card.Body>
                      <Row className="justify-content-center">
                        <Col xs={12} md={12} lg={12}>
                          <Card style={{ border: "none" }}>
                            <Card.Body
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {modificacionLogoView.length > 0 ? (
                                <Card.Img
                                  width={250}
                                  height={250}
                                  variant="top"
                                  src={modificacionLogoView}
                                  className="imgDiv"
                                />
                              ) : (
                                ""
                              )}
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={6} lg={6}>
                          {info ? (
                            <span className="text-center">
                              Precision del:{" "}
                              <strong style={{ color: "#E47137" }}>
                                {info}
                              </strong>
                            </span>
                          ) : (
                            ""
                          )}
                        </Col>
                        <Col xs={12} md={6} lg={6}>
                          {etiqueta ? (
                            <span className="text-center">
                              Valor de etiqueta:{" "}
                              <strong style={{ color: "#E47137" }}>
                                {etiqueta}
                              </strong>
                            </span>
                          ) : (
                            ""
                          )}
                        </Col>
                      </Row>
                      <Row className="justify-content-center mt-2">
                        <Col xs={12} md={12} lg={12}>
                          <Form.Group
                            controlId="formFile"
                            className="justify-content-center mb-3 text-center"
                          >
                            <Form.Label className="text-center font_personalizado">
                              Ingrese una imagen
                            </Form.Label>
                            <Form.Control
                              accept="image/*"
                              size="sm"
                              type="file"
                              {...register("logo", {
                                required: {
                                  value: true,
                                  message: "Ingrese una imagen",
                                },
                              })}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Card.Body>
                    <Card.Footer
                      style={{ border: "none", background: "transparent" }}
                      className="text-center"
                    >
                      <button
                        className="buttonCustome"
                        size="sm"
                        variant="primary"
                        value="submit"
                        type="submit"
                        disabled={desactivar}
                      >
                        {desactivar == true ? (
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        ) : (
                          "Analizar"
                        )}
                      </button>
                    </Card.Footer>
                  </Card>
                </Form>
              </Col>
            </Row>
          </Container>

          {/* <img className="wave-container" src={fondo}></img> */}
        </div>
      </div>
    </>
  );
};
export default Computo;
