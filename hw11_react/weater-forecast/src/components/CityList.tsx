import React, { FC, ReactElement }  from "react";
import { Divider, List } from "@material-ui/core";
import { City } from '../interfaces';
import { Link } from "react-router-dom";
import CityListItem from "./CityListItem";
import { useStyles } from "../hooks";

const  CityList: FC<{cityList: City[]}> = (({cityList = []}): ReactElement => {

  const css = useStyles();

  const list = cityList.map( (item: any, key: number) => 
    <Link className={css.link} to={`/${item.code}_${item.lat}_${item.lon}/`} key={key}>
      <CityListItem city={item} /> 
      <Divider light />
    </Link> 
  );

  return (
    <List>
      {list}
    </List>
  );
});

export default CityList;