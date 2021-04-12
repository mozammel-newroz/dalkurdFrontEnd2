import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Typography from "@material-ui/core/Typography";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, TableFooter, TablePagination } from "@material-ui/core";
import axios from "axios";
import Skeleton from "@material-ui/lab/Skeleton";
import PanoramaIcon from "@material-ui/icons/PanoramaOutlined";
import moment from "moment";

const useStyles = makeStyles({
  title: {
    textAlign: "left",
  },
});

const Blogall = () => {
  const classes = useStyles();
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const getBlog = async () => {
    setLoading(true);
    try {
      let url = `/public/blog/api/v1/articles?page=${page + 1}`;
      console.log("url", url);
      let res = await axios({
        url: url,
        method: "get",
      });

      console.log("blog", res.data.data.pageData);
      setBlogs(res.data.data.pageData);
      setTotalData(res.data.data.pageCount);

      let mydata = res.data.data.pageData;
      console.log("my data", mydata[0].medias[0].contentName);
    } catch (error) {}
    setLoading(false);
  };

  const handleChangePage = async (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    getBlog();
    console.log("base url", process.env.REACT_APP_BASE_URL);
  }, [page]);

  return (
    <div className="wrapper">
      <SideBar />
      <div className="wrapper_inner">
        <Typography variant="h4" className={classes.title}>
          Blog List
        </Typography>

        {!loading ? (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>title</TableCell>
                  <TableCell>Total likes</TableCell>
                  <TableCell>Total Comments</TableCell>
                  <TableCell>Updated</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>View</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {blogs.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell>{row.totalLikes}</TableCell>
                    <TableCell>{row.totalComments}</TableCell>
                    <TableCell>
                      {moment(row.updatedAt).format("DD-MMMM-YYYY")}
                    </TableCell>
                    <TableCell>
                      {/* {row.medias[0].contentName} */}
                      {/* <img src={row.medias[0].contentName} alt=""/> */}
                      {row.medias[0] ? (
                        <img
                          src={row.medias[0].contentName}
                          width="100px"
                          alt=""
                        />
                      ) : (
                        <PanoramaIcon style={{ fontSize: 70 }} />
                      )}
                    </TableCell>
                    <TableCell>
                      <Button size="small" color="primary" variant="outlined">
                        <Link
                          to={{
                            pathname: "/comments",
                            state: { id: row.id, title: row.title },
                          }}
                        >
                          View
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow></TableRow>
              </TableFooter>
            </Table>
            <TablePagination
              component="div"
              count={totalData}
              page={page}
              onChangePage={handleChangePage}
              rowsPerPage={rowsPerPage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              // rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              rowsPerPageOptions={[10]}
            />
          </TableContainer>
        ) : (
          <>
            <Skeleton height={80} />
            <Skeleton height={80} />
            <Skeleton height={80} />
            <Skeleton height={80} />
            <Skeleton height={80} />
            <Skeleton height={80} />
            <Skeleton height={80} />
            <Skeleton height={80} />
          </>
        )}
      </div>
    </div>
  );
};

export default Blogall;
