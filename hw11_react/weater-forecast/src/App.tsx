import React, { FC }  from "react";
import {hot} from "react-hot-loader";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Container, CssBaseline, Toolbar, Typography } from "@material-ui/core";
import SearchForm from "./components/SearchForm";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import PageCity from "./components/PageCity";
import PageMyCities from "./components/PageMyCities";
import PageNotFound from "./components/PageNotFound";
import PageSearch from "./components/PageSearch";
import HomeButton from "./components/HomeButton";
import { useStyles } from './hooks';


const  App: FC = () => {

  const title = "Weather Forecast";
  const css = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Router>
          <Box border={1}  className={css.appContainer} borderColor="grey.300">
            <AppBar position="static">
              <Toolbar>
                <HomeButton />
                <Typography variant="h6" className={css.title} noWrap>
                  {title}
                </Typography>
                <SearchForm />
              </Toolbar>
            </AppBar>
            <Container maxWidth="sm">
              <Switch>
                <Route exact path="/search/">
                  <PageSearch />
                </Route>
                <Route exact path="/">
                  <PageMyCities />
                </Route>
                <Route path="/:cityCode/" children={<PageCity />} />
                <Route path="*">
                  <PageNotFound />
                </Route>
              </Switch>
            </Container>
          </Box>
        </Router>
      </Container>
    </React.Fragment>
  );
};

export default hot(module)(App);