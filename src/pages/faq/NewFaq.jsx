import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import Swal from "sweetalert2";
import LinearProgress from "@material-ui/core/LinearProgress";

import { useLocation, useHistory } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import { AuthContext } from "../../context/AuthContext";

const useStyle = makeStyles({
  padding: {
    padding: 30,
  },
  margin: {
    marginBottom: 20,
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
  gridRow: {
    display: "flex",
  },
  gridCol: {
    flexGrow: 2,
    margin: "20px 20px 20px 0",
    width: 200,
  },
  gridCol1: {
    flexGrow: 1,
    margin: "20px 20px 20px 0",
    width: 100,
  },
  title: {
    marginTop: 30,
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
  textarea: {
    borderRadius: 15,
  },
});

const NewFaq = () => {
  const classes = useStyle();
  const history = useHistory();

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const [ques_en, set_ques_en] = useState("");
  const [ans_en, set_ans_en] = useState("");
  const [ques_ar, set_ques_ar] = useState("");
  const [ans_ar, set_ans_ar] = useState("");
  const [ques_ku, set_ques_ku] = useState("");
  const [ans_ku, set_ans_ku] = useState("");

  const [app_for, set_app_for] = useState("");
  const [topic_name_en, set_topic_name_en] = useState("");
  const [topic_name_ar, set_topic_name_ar] = useState("");
  const [topic_name_ku, set_topic_name_ku] = useState("");

  const [submitType, setSubmitType] = useState("");
  const [loading, setLoading] = useState(false);

  const { auth } = useContext(AuthContext);

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await axios({
        url: "/api/faqs",
        method: "post",
        data: {
          category_id: category,
          ques_en,
          ques_ar,
          ques_ku,
          ans_en,
          ans_ar,
          ans_ku,
          app_for,
          topic_name_en,
          topic_name_ar,
          topic_name_ku,
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
      }

      if (submitType === "addAnother") {
        set_ques_en("");
        set_ques_ar("");
        set_ques_ku("");
        set_ans_en("");
        set_ans_ar("");
        set_ans_ku("");
        setCategory("");
        set_app_for("");
        set_topic_name_en("");
        set_topic_name_ar("");
        set_topic_name_ku("");
      } else if (submitType === "add") {
        history.push("/manage-faq");
      }

      console.log("response", res);
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

  const handleChange = (e) => {
    console.log(e.target.value);
    setCategory(e.target.value);
  };

  const handleCancel = () => {
    history.push("/manage-faq");
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="wrapper">
        <div className="wrapper-inner">
          <Typography variant="h4" className={classes.margin}>
            Create New FAQ
          </Typography>
          <form onSubmit={handleCreate}>
            <Card>
              <CardContent className={classes.padding}>
                <Grid className={classes.gridRow}>
                  <Grid className={classes.gridCol1 + " " + classes.title}>
                    Category
                  </Grid>
                  <Grid className={classes.gridCol}>
                    <TextField
                      id="outlined-select-currency"
                      select
                      value={category}
                      onChange={handleChange}
                      variant="outlined"
                      required
                      fullWidth
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
                  </Grid>
                  <Grid className={classes.gridCol}></Grid>
                  <Grid className={classes.gridCol}></Grid>
                </Grid>
                <Grid className={classes.gridRow}>
                  <Grid className={classes.gridCol1}>Language</Grid>
                  <Grid className={classes.gridCol}>English</Grid>
                  <Grid className={classes.gridCol}>Arabic</Grid>
                  <Grid className={classes.gridCol}>Kurdish</Grid>
                </Grid>
                <Grid className={classes.gridRow}>
                  <Grid className={classes.gridCol1 + " " + classes.title}>
                    Topic Name
                  </Grid>
                  <Grid className={classes.gridCol}>
                    <TextField
                      id="outlined-basic"
                      placeholder=""
                      value={topic_name_en}
                      onChange={(e) => set_topic_name_en(e.target.value)}
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        className: classes.input,
                      }}
                    />
                  </Grid>
                  <Grid className={classes.gridCol}>
                    <TextField
                      id="outlined-basic"
                      placeholder=""
                      value={topic_name_ar}
                      onChange={(e) => set_topic_name_ar(e.target.value)}
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        className: classes.input,
                      }}
                    />
                  </Grid>
                  <Grid className={classes.gridCol}>
                    <TextField
                      id="outlined-basic"
                      placeholder=""
                      value={topic_name_ku}
                      onChange={(e) => set_topic_name_ku(e.target.value)}
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        className: classes.input,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid className={classes.gridRow}>
                  <Grid className={classes.gridCol1 + " " + classes.title}>
                    Question
                  </Grid>
                  <Grid className={classes.gridCol}>
                    <TextField
                      id="outlined-basic"
                      placeholder=""
                      value={ques_en}
                      onChange={(e) => set_ques_en(e.target.value)}
                      variant="outlined"
                      fullWidth
                      required
                      InputProps={{
                        className: classes.input,
                      }}
                    />
                  </Grid>
                  <Grid className={classes.gridCol}>
                    <TextField
                      id="outlined-basic"
                      placeholder=""
                      value={ques_ar}
                      onChange={(e) => set_ques_ar(e.target.value)}
                      variant="outlined"
                      required
                      fullWidth
                      InputProps={{
                        className: classes.input,
                      }}
                    />
                  </Grid>
                  <Grid className={classes.gridCol}>
                    <TextField
                      id="outlined-basic"
                      placeholder=""
                      value={ques_ku}
                      onChange={(e) => set_ques_ku(e.target.value)}
                      variant="outlined"
                      required
                      fullWidth
                      InputProps={{
                        className: classes.input,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid className={classes.gridRow}>
                  <Grid className={classes.gridCol1 + " " + classes.title}>
                    Answer
                  </Grid>
                  <Grid className={classes.gridCol}>
                    <TextField
                      placeholder=""
                      value={ans_en}
                      onChange={(e) => set_ans_en(e.target.value)}
                      variant="outlined"
                      required
                      fullWidth
                      multiline
                      rows={5}
                      InputProps={{
                        className: classes.textarea,
                      }}
                    />
                  </Grid>
                  <Grid className={classes.gridCol}>
                    <TextField
                      placeholder=""
                      value={ans_ar}
                      onChange={(e) => set_ans_ar(e.target.value)}
                      variant="outlined"
                      required
                      fullWidth
                      multiline
                      rows={5}
                      InputProps={{
                        className: classes.textarea,
                      }}
                    />
                  </Grid>
                  <Grid className={classes.gridCol}>
                    <TextField
                      placeholder=""
                      value={ans_ku}
                      onChange={(e) => set_ans_ku(e.target.value)}
                      variant="outlined"
                      required
                      fullWidth
                      multiline
                      rows={5}
                      InputProps={{
                        className: classes.textarea,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid className={classes.gridRow}>
                  <Grid className={classes.gridCol1 + " " + classes.title}>
                    App for
                  </Grid>
                  <Grid className={classes.gridCol}>
                    <TextField
                      id="outlined-select-currency"
                      select
                      value={app_for}
                      onChange={(e) => set_app_for(e.target.value)}
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        className: classes.select,
                      }}
                    >
                      <MenuItem value="sr">SR</MenuItem>
                      <MenuItem value="agent">Agent</MenuItem>
                      <MenuItem value="merchant">Merchant</MenuItem>
                      <MenuItem value="personal">Personal</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid className={classes.gridCol}></Grid>
                  <Grid className={classes.gridCol}></Grid>
                </Grid>
              </CardContent>
            </Card>
            {loading ? (
              <LinearProgress style={{ marginTop: 20 }} />
            ) : (
              <div className={classes.buttonWeraper}>
                <Button className={classes.styleCancel} onClick={handleCancel}>
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
                  Create & add another
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.buttonStyle}
                  type="submit"
                  onClick={(e) => setSubmitType("add")}
                >
                  Create FAQ
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewFaq;
