import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  FormLabel,
  FormControl,
  FormSelect,
  FormGroup,
  InputGroup,
  Badge,
  Container,
  Card,
} from "react-bootstrap";
import fondo from "../assets/fondoContacto.svg";
import "../css/view.css";

import { postRequest } from "../utils/axiosClient";

const Computo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm();

  const [modificacionLogoView, setModificacionLogoView] = useState("");
  const [backLogo, setBackLogo] = useState(null);
  const [info, setInfo] = useState("");

  useEffect(() => {
    if (watch("logo") !== undefined && watch("logo").length > 0) {
      if (watch("logo")[0].size !== undefined) {
        setBackLogo(watch("logo")[0]);
        base2a64ViewLogo(watch("logo")[0]);
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
    // console.log(backLogo);
    // console.log(data.logo[0]);
    let dataFor = new FormData();

    dataFor.append("image", data.logo[0]);
    try {
      const response = await postRequest("mamography/", dataFor);
      setInfo(response.data.presicion);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="homeContacto">
        <Container className="">
          <Row className="text-center">
            <Col xs={12} md={12} lg={12}>
              <span className="font_titulo_personalizado2">
                Computo de alto desempeño
              </span>
            </Col>
            <Col xs={12} md={12} lg={12} className="mt-2">
              <span className="font_titulo_personalizado">Mamography</span>
            </Col>
          </Row>
          <Row style={{ marginTop: "20px" }} className="justify-content-center">
            <Col xs={12} md={6} lg={6}>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <Row
                      style={{ marginTop: "20px" }}
                      className="justify-content-center"
                    >
                      <Col xs={12} md={12} lg={12}>
                        <Card style={{ border: "none" }}>
                          <Card.Body>
                            {modificacionLogoView.length > 0 ? (
                              <Card.Img
                                width={250}
                                height={250}
                                variant="top"
                                src={modificacionLogoView}
                                className="mb-4 mx-1"
                              />
                            ) : (
                              ""
                            )}
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>

                    <Row className="justify-content-center">
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
                            {...register("logo")}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row
                      style={{ marginTop: "20px" }}
                      className="justify-content-center"
                    >
                      <Col xs={12} md={12} lg={12}>
                        {info ? (
                          <span className="text-center">
                            Precision del:{" "}
                            <strong style={{ color: "#de4e00" }}>{info}</strong>
                          </span>
                        ) : (
                          ""
                        )}
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer
                    style={{ border: "none", background: "transparent" }}
                    className="text-center"
                  >
                    <Button
                      style={{
                        color: "#fff",
                        background: "#de4e00",
                        borderColor: "#de4e00",
                      }}
                      size="sm"
                      variant="primary"
                      value="submit"
                      type="submit"
                    >
                      Analizar
                    </Button>
                  </Card.Footer>
                </Card>
              </Form>
            </Col>
          </Row>
        </Container>

        {/* <img className="wave-container" src={fondo}></img> */}
      </div>
    </>
  );
};
export default Computo;
