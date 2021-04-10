import { Typography } from "@material-ui/core";
import React, { FC }  from "react";
import { CityStorage } from '../services/CityStorage';
import CityList from "./CityList";
import { useStyles } from "../hooks";

const  PageMyCities: FC = () => {

  const css = useStyles();

  const cities = new CityStorage().getList();

  let pageContent: JSX.Element = (<></>);

  if( cities.length === 0) {
    pageContent = (
      <div>
        Вы пока не выбрали ни одного города. <br />
        Воспользуйтесь формой поиска
      </div>
    );
  } else {

    pageContent = (
      <CityList cityList={cities} />
    );  
  }

  return (
    <>
      <Typography variant="h6" className={css.title}>
          Мои города
      </Typography>

      {pageContent}
    </>
  );
};

export default PageMyCities;