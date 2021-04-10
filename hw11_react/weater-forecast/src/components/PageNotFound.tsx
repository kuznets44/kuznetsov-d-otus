import { Typography } from "@material-ui/core";
import React, { FC }  from "react";
import { useStyles } from "../hooks";


const  PageNotFound: FC = () => {

  const css = useStyles();

  return (
    <>
      <Typography variant="h6" className={css.title}>
          Страница не найдена
      </Typography>
    </>
  );
};

export default PageNotFound;