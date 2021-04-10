import React, { FC }  from "react";
import HomeIcon from '@material-ui/icons/Home';
import { IconButton, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const  HomeButton: FC = () => {

  const css = useStyles();

  const routerHistory = useHistory();

  const handleHomeClick = () => {
    routerHistory.push('/');
  };

  return (
    <IconButton
      edge="start"
      className={css.menuButton}
      color="inherit"
      aria-label="open drawer"
      onClick={handleHomeClick}
    >
      <HomeIcon />
    </IconButton>
  );
};

export default HomeButton;