import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { SketchPicker } from "react-color";
import Card from "@material-ui/core/Card";
import MenuItem from "@material-ui/core/MenuItem";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LinearProgress from "@material-ui/core/LinearProgress";
import Checkbox from "@material-ui/core/Checkbox";

import Sidebar from "../../components/Sidebar";
import { AuthContext } from "../../context/AuthContext";

const useStyle = makeStyles({
  fieldWrapper: {
    display: "flex",
    marginBottom: 30,
  },
  fieldName: {
    flexGrow: 1,
    marginTop: 11,
    width: 100,
  },
  fieldInput: {
    flexGrow: 3,
    width: 200,
  },
  input: {
    padding: "5px",
    height: 45,
    borderRadius: 15,
  },
  select: {
    "& .MuiSelect-select:focus": {
      backgroundColor: "#fff",
    },
    padding: "5px",
    height: 45,
    borderRadius: 15,
  },
  margin: {
    marginBottom: 20,
  },
  textarea: {
    borderRadius: 15,
  },
  buttonStyle: {
    padding: " 10px 30px",
    fontSize: 14,
    borderRadius: "25px",
    marginLeft: 20,
  },
  buttonWeraper: {
    marginTop: 25,
    float: "right",
  },
  styleCancel: {
    color: "#999",
  },
  padding: {
    padding: 30,
  },
  label: {
    backgroundColor: "indigo",
    color: "white",
    padding: "0.5rem",
    borderRadius: "0.3rem",
    cursor: "pointer",
    marginTop: "1rem",
  },
});

const CreatePromotion = () => {
  const classes = useStyle();
  const history = useHistory();
  const [title, set_title] = useState("");
  const [details, set_details] = useState("");
  const [forward_to_id, set_forward_to_id] = useState("");
  const [submitType, setSubmitType] = useState("");

  const [is_bundle_offer, set_is_bundle_offer] = useState(false);
  const [operators, set_oparators] = useState([]);
  const [operator, set_oparator] = useState("");
  const [bundle_offers, set_bundle_offers] = useState([]);
  const [bundle_offer, set_bundle_offer] = useState("");
  const [link, set_link] = useState("");
  const [btn_text, set_btn_text] = useState("");
  const [btn_color, set_btn_color] = useState("");
  const [visiableColor, setVisiableColor] = useState(false);

  const [categories, setCategories] = useState([]);
  const [attachment, set_attachment] = useState();
  const [loading, setLoading] = useState(false);

  const { auth } = useContext(AuthContext);

  const getCategory = async () => {
    setLoading(true);
    try {
      let url = `/api/categories`;
      let res = await axios({
        url: url,
        method: "get",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setCategories(res.data.data);
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: `${error.response.data.messages.toString()}`,
        showConfirmButton: false,
        // timer: 2000,
      });
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    return console.log("color", btn_color);
    setLoading(true);
    let is_bundle = 0;
    if (is_bundle_offer) {
      is_bundle = 1;
    }
    console.log(
      "data",
      title,
      details,
      is_bundle,
      link,
      btn_text,
      "btn_color",
      btn_color,
      operator,
      "bundle Offer",
      bundle_offer
    );
    try {
      const data = new FormData();
      if (attachment) {
        const imagedata = attachment;
        data.append("attachment", imagedata);
      }
      data.append("title", title);
      data.append("details", details);
      data.append("forward_to_id", forward_to_id);

      data.append("is_bundle_offer", is_bundle);
      data.append("link", link);
      data.append("btn_text", btn_text);
      data.append("btn_color", btn_color);
      data.append("operator_id", operator);
      data.append("bundle_id", bundle_offer);

      let res = await axios({
        url: "/api/promotional-offers",
        method: "post",
        data: data,
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          type: "formData",
        },
      });

      if (res.data.code === 200) {
        Swal.fire({
          icon: "success",
          title: "Succesfully Saved",
          showConfirmButton: false,
          timer: 1000,
        });
        if (submitType === "addAnother") {
          set_title("");
          set_details("");
          set_forward_to_id("");
          // set_attachment('')
          set_is_bundle_offer(false);
          set_link("");
          set_btn_text("");
          set_btn_color("");
          set_oparator("");
          set_bundle_offer("");
        } else if (submitType === "add") {
          history.push("/promotion-list");
        }
      } else {
        Swal.fire({
          icon: "warning",
          title: res.data.messages,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: `${error.response.data.messages.toString()}`,
        showConfirmButton: false,
        timer: 2000,
      });
    }
    setLoading(false);
  };

  const handleCancel = () => {
    history.push("/promotion-list");
  };

  const imageButton = () => {
    const actualBtn = document.getElementById("actual-btn");

    const fileChosen = document.getElementById("file-chosen");

    actualBtn.addEventListener("change", function () {
      fileChosen.textContent = this.files[0].name;
    });
  };

  const handleIsBundle = (e) => {
    set_is_bundle_offer(e.target.checked);
    getOperators();
  };

  const getOperators = async () => {
    setLoading(true);

    try {
      let res = await axios({
        url: `/api/operators/`,
        method: "get",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      console.log("operators", res.data.data);
      set_oparators(res.data.data);
    } catch (error) {}
    setLoading(false);
  };

  const getBundleOffers = async (ope) => {
    setLoading(true);

    try {
      let res = await axios({
        url: `/api/bundles/${ope}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      console.log("bundle offer", res.data.data);
      set_bundle_offers(res.data.data);
    } catch (error) {}
    setLoading(false);
  };

  const handleOperaptor = async (e) => {
    set_oparator(e.target.value);
    getBundleOffers(e.target.value);
  };

  const handleBundleOffer = (e) => {
    set_bundle_offer(e.target.value);
  };

  const handleBtnColor = (color) => {
    console.log("ccc", color);
    set_btn_color(color.hex);
  };

  const touglePicker = () => {
    setVisiableColor(!visiableColor);
  };

  useEffect(() => {
    getCategory();
    imageButton();
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="wrapper">
        <div className="wrapper-inner">
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item md={10} lg={8}>
                <Typography variant="h4" className={classes.margin}>
                  Create Promotion
                </Typography>
                <Card>
                  <CardContent className={classes.padding}>
                    <div className={classes.fieldWrapper}>
                      <div className={classes.fieldName}>
                        <Typography variant="subtitle1">Title</Typography>
                      </div>
                      <div className={classes.fieldInput}>
                        <TextField
                          required
                          placeholder="E.g. Marketing Manager"
                          variant="outlined"
                          fullWidth
                          value={title}
                          onChange={(e) => set_title(e.target.value)}
                          InputProps={{
                            className: classes.input,
                          }}
                        />
                      </div>
                    </div>
                    <div className={classes.fieldWrapper}>
                      <div className={classes.fieldName}>
                        <Typography variant="subtitle1">Bannar</Typography>
                      </div>

                      <div className={classes.fieldInput}>
                        <input
                          type="file"
                          id="actual-btn"
                          hidden
                          onChange={(e) => set_attachment(e.target.files[0])}
                          name="attachment"
                        />
                        <label htmlFor="actual-btn">
                          <Button
                            variant="contained"
                            color="primary"
                            component="span"
                            className={classes.buttonStyle}
                            style={{ marginLeft: "-0px" }}
                          >
                            Choose file
                          </Button>
                        </label>
                        <span id="file-chosen" style={{ marginLeft: 15 }}>
                          No file chosen
                        </span>
                      </div>
                    </div>
                    <div className={classes.fieldWrapper}>
                      <div className={classes.fieldName}>
                        <Typography variant="subtitle1">Details</Typography>
                      </div>
                      <div className={classes.fieldInput}>
                        <TextField
                          required
                          variant="outlined"
                          placeholder="Details"
                          multiline
                          rcurrenciesows={7}
                          rows={5}
                          fullWidth
                          value={details}
                          onChange={(e) => set_details(e.target.value)}
                          InputProps={{
                            className: classes.textarea,
                          }}
                        />
                      </div>
                    </div>
                    <div className={classes.fieldWrapper}>
                      <div className={classes.fieldName}>
                        <Typography variant="subtitle1">Forward to</Typography>
                      </div>
                      <div className={classes.fieldInput}>
                        <TextField
                          id="outlined-select-currency"
                          select
                          required
                          onChange={(e) => set_forward_to_id(e.target.value)}
                          variant="outlined"
                          fullWidth
                          value={forward_to_id}
                          InputProps={{
                            className: classes.select,
                          }}
                        >
                          {categories.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                    </div>
                    <div className={classes.fieldWrapper}>
                      <div className={classes.fieldName}>
                        <Typography variant="subtitle1">
                          Is Bundle Offer
                        </Typography>
                      </div>
                      <div className={classes.fieldInput}>
                        <Checkbox
                          onChange={handleIsBundle}
                          color="primary"
                          name="Is Bundle Offeer"
                          checked={is_bundle_offer}
                          value={is_bundle_offer}
                        />
                      </div>
                    </div>
                    {is_bundle_offer ? (
                      <>
                        <div className={classes.fieldWrapper}>
                          <div className={classes.fieldName}>
                            <Typography variant="subtitle1">Link</Typography>
                          </div>
                          <div className={classes.fieldInput}>
                            <TextField
                              placeholder="Link"
                              variant="outlined"
                              fullWidth
                              value={link}
                              onChange={(e) => set_link(e.target.value)}
                              InputProps={{
                                className: classes.input,
                              }}
                            />
                          </div>
                        </div>

                        <div className={classes.fieldWrapper}>
                          <div className={classes.fieldName}>
                            <Typography variant="subtitle1">
                              Button Text
                            </Typography>
                          </div>
                          <div className={classes.fieldInput}>
                            <TextField
                              placeholder="Button Text"
                              variant="outlined"
                              fullWidth
                              value={btn_text}
                              onChange={(e) => set_btn_text(e.target.value)}
                              InputProps={{
                                className: classes.input,
                              }}
                            />
                          </div>
                        </div>

                        <div className={classes.fieldWrapper}>
                          <div className={classes.fieldName}>
                            <Typography variant="subtitle1">
                              Button Color
                            </Typography>
                          </div>
                          <div className={classes.fieldInput}>
                            {visiableColor ? (
                              <SketchPicker
                                color={btn_color}
                                onChangeComplete={handleBtnColor}
                              />
                            ) : (
                              <Button
                                onClick={touglePicker}
                                color="primary"
                                variant="outlined"
                                className={classes.buttonStyle}
                                style={{ marginLeft: 0 }}
                              >
                                Choose Color
                              </Button>
                            )}

                            {/* <TextField
                              placeholder="Button Color"
                              variant="outlined"
                              fullWidth
                              value={btn_color}
                              onChange={(e) => set_btn_color(e.target.value)}
                              InputProps={{
                                className: classes.input,
                              }}
                            /> */}
                          </div>
                        </div>

                        <div className={classes.fieldWrapper}>
                          <div className={classes.fieldName}>
                            <Typography variant="subtitle1">
                              Operator
                            </Typography>
                          </div>
                          <div className={classes.fieldInput}>
                            <TextField
                              id="outlined-select-currency"
                              select
                              onChange={handleOperaptor}
                              variant="outlined"
                              fullWidth
                              value={operator}
                              InputProps={{
                                className: classes.select,
                              }}
                            >
                              {operators.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                  <img
                                    style={{ marginRight: 15 }}
                                    src={option.logo}
                                    height="15px"
                                    alt=""
                                  />{" "}
                                  {option.name}
                                </MenuItem>
                              ))}
                            </TextField>
                          </div>
                        </div>
                        {operator ? (
                          <div className={classes.fieldWrapper}>
                            <div className={classes.fieldName}>
                              <Typography variant="subtitle1">
                                Bundle Offer
                              </Typography>
                            </div>
                            <div className={classes.fieldInput}>
                              <TextField
                                id="outlined-select-currency"
                                select
                                onChange={handleBundleOffer}
                                variant="outlined"
                                fullWidth
                                value={bundle_offer}
                                InputProps={{
                                  className: classes.select,
                                }}
                              >
                                {bundle_offers.map((option) => (
                                  <MenuItem key={option.id} value={option.id}>
                                    <img
                                      style={{ marginRight: 15 }}
                                      src={option.logo}
                                      height="15px"
                                      alt=""
                                    />{" "}
                                    {option.name}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </div>
                          </div>
                        ) : null}
                      </>
                    ) : null}
                  </CardContent>
                </Card>
                {loading ? (
                  <LinearProgress style={{ marginTop: 20 }} />
                ) : (
                  <div className={classes.buttonWeraper}>
                    <Button
                      onClick={handleCancel}
                      className={classes.styleCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="large"
                      type="submit"
                      className={classes.buttonStyle}
                      onClick={(e) => setSubmitType("addAnother")}
                    >
                      Create & Add Another
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      type="submit"
                      className={classes.buttonStyle}
                      onClick={(e) => setSubmitType("add")}
                    >
                      Create Promotional Offer
                    </Button>
                  </div>
                )}
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePromotion;
