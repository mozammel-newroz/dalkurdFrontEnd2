import React, { useState, useEffect, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";

import axios from "axios";
import Swal from "sweetalert2";
import { useLocation, useHistory } from "react-router-dom";

import Card from "@material-ui/core/Card";
import MenuItem from "@material-ui/core/MenuItem";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LinearProgress from "@material-ui/core/LinearProgress";
import Checkbox from "@material-ui/core/Checkbox";
import { SketchPicker } from "react-color";

import Sidebar from "../../components/Sidebar";
import { AuthContext } from "../../context/AuthContext";
import placeholder from "../../assets/images/placeholder.png";

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
  mrgin_right: {
    marginRight: 25,
  },
});

const CreatePromotion = () => {
  const classes = useStyle();
  const location = useLocation();
  const history = useHistory();
  const row = location.state;

  const [title, set_title] = useState("");
  const [details, set_details] = useState("");
  const [forward_to_id, set_forward_to_id] = useState("");
  const [status, set_status] = useState(0);
  const [banner, setBanner] = useState("");

  const [is_bundle_offer, set_is_bundle_offer] = useState(false);
  const [operators, set_oparators] = useState([]);
  const [operator, set_oparator] = useState(0);
  const [bundle_offers, set_bundle_offers] = useState([]);
  const [bundle_offer, set_bundle_offer] = useState(0);
  const [link, set_link] = useState("");
  const [btn_text, set_btn_text] = useState("");
  const [btn_color, set_btn_color] = useState("");

  const [categories, setCategories] = useState([]);
  const [attachment, set_attachment] = useState();
  const [submitType, setSubmitType] = useState("");
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
      console.log("res", res.data.data);
    } catch (error) {}
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let is_bundle = 0;
    if (is_bundle_offer) {
      is_bundle = 1;
    }

    try {
      const data = new FormData();
      if (attachment) {
        const imagedata = attachment;
        data.append("attachment", imagedata);
      }
      data.append("title", title);
      data.append("details", details);
      data.append("forward_to_id", forward_to_id);
      data.append("promotional_offer_id", row.id);
      data.append("status", status);

      data.append("is_bundle_offer", is_bundle);

      data.append("link", link);
      data.append("btn_text", btn_text);
      data.append("btn_color", btn_color);
      if (operator) {
        data.append("operator_id", parseInt(operator));
      }
      if (bundle_offer) {
        data.append("bundle_id", parseInt(bundle_offer));
      }

      for (var value of data.values()) {
        console.log("value", value);
      }
      let res = await axios({
        url: "/api/update-promotional-offers",
        method: "post",
        data: data,
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          type: "formData",
        },
      });
      console.log("response code", res);

      if (res.data.code === 200) {
        Swal.fire({
          icon: "success",
          title: "Succesfully Saved",
          showConfirmButton: false,
          timer: 1000,
        });
        // set_title("");
        // set_details("");
        // set_forward_to_id("");
        // set_attachment("");
        history.push("/promotion-list");
        console.log("response", res);
      } else {
        Swal.fire({
          icon: "warning",
          title: res.data.messages,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log("error: ", error.response);
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

  const initialState = () => {
    set_title(row.title);
    set_details(row.details);
    set_status(row.status);
    set_forward_to_id(row.forward_to.id);
    setBanner(row.banner);

    set_is_bundle_offer(row.is_bundle_offer);
    set_link(row.link);
    set_btn_text(row.btn_text);
    if (row.btn_color) {
      set_btn_color(row.btn_color);
    }
    set_oparator(row.operator_id);
    set_bundle_offer(row.bundle_id);
  };

  const deleteBanner = async () => {
    try {
      let res = await axios({
        url: `/api/delete-promotional-offer-banner`,
        method: "post",
        data: {
          promotional_offer_id: row.id,
        },
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (res.data.code === 200) {
        Swal.fire({
          icon: "success",
          title: "Succesfully Saved",
          showConfirmButton: false,
          timer: 1000,
        });
        setBanner(false);
      } else {
        Swal.fire({
          icon: "warning",
          title: res.data.messages,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log("err", error);
    }
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

  useEffect(() => {
    getCategory();
    initialState();
    imageButton();
    getOperators();
    getBundleOffers(row.operator_id);
    console.log("row", row);
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="wrapper">
        <div className="wrapper-inner">
          {/* <form onSubmit={handleSubmit} enctype="multipart/form-data"> */}
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item md={10} lg={8}>
                <Typography variant="h4" className={classes.margin}>
                  Update Promotional Offer
                </Typography>
                <Card>
                  <CardContent className={classes.padding}>
                    <div className={classes.fieldWrapper}>
                      <div className={classes.fieldName}>
                        <Typography variant="subtitle1">Title</Typography>
                      </div>
                      <div className={classes.fieldInput}>
                        <TextField
                          id="outlined-basic"
                          placeholder="E.g. Marketing Manager"
                          variant="outlined"
                          fullWidth
                          required
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
                        <Typography variant="subtitle1">Banner</Typography>
                      </div>
                      <div className={classes.fieldInput}>
                        {banner ? (
                          <img
                            src={row.banner}
                            style={{ height: "100px" }}
                            alt=""
                          />
                        ) : (
                          <img
                            src={placeholder}
                            alt=""
                            style={{ height: "100px" }}
                          />
                        )}
                        <br />
                        <br />
                        <Button
                          className={classes.mrgin_right}
                          color="secondary"
                          onClick={deleteBanner}
                        >
                          Delete
                        </Button>
                        <input
                          type="file"
                          id="actual-btn"
                          hidden
                          onChange={(e) => set_attachment(e.target.files[0])}
                          name="attachment"
                        />
                        <label for="actual-btn">
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
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="Details"
                          required
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
                        <Typography variant="subtitle1">Status</Typography>
                      </div>
                      <div className={classes.fieldInput}>
                        <FormControl component="fieldset">
                          <RadioGroup
                            row
                            aria-label="position"
                            name="position"
                            defaultValue="top"
                          >
                            <FormControlLabel
                              value="1"
                              checked={status == 1}
                              onChange={(e) => set_status(e.target.value)}
                              control={<Radio color="primary" />}
                              label="Active"
                            />
                            <FormControlLabel
                              value="0"
                              checked={status == 0}
                              onChange={(e) => set_status(e.target.value)}
                              control={<Radio color="primary" />}
                              label="Deactive"
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </div>
                    <div className={classes.fieldWrapper}>
                      <div className={classes.fieldName}>
                        <Typography variant="subtitle1">Forward to</Typography>
                      </div>
                      <div className={classes.fieldInput}>
                        <TextField
                          select
                          onChange={(e) => set_forward_to_id(e.target.value)}
                          variant="outlined"
                          fullWidth
                          required
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
                            <SketchPicker
                              color={btn_color}
                              onChangeComplete={handleBtnColor}
                            />
                            {/* <SketchPicker /> */}
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
                      className={classes.styleCancel}
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    {/* <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    className={classes.buttonStyle}
                    type="submit"
                    onClick={(e) => setSubmitType("addAnother")}
                  >
                    Update & Add Another
                  </Button> */}
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      className={classes.buttonStyle}
                      type="submit"
                      onClick={(e) => setSubmitType("add")}
                    >
                      Update Promotional Offer
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
