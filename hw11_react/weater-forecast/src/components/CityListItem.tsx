import { ListItem, ListItemText } from "@material-ui/core";
import React, { FC, ReactElement }  from "react";
import ForecastShort from "./ForecastShort";
import { City } from '../interfaces';
import { useStyles } from "../hooks";


const  CityListItem: FC<{city:City}> = (({city}): ReactElement => {

  const css = useStyles();
  

  return (
    <ListItem className={css.listItem}>
      <ListItemText
        primary={city.name}
        secondary={`Страна: ${city.country}; координаты: ${city.lat},${city.lon}`}
      />
      <ForecastShort city={city} />
    </ListItem>
  );
});

export default CityListItem;