import { ListItemText, Typography } from "@material-ui/core";
import React, { FC, ReactElement }  from "react";
import { useDispatch } from "react-redux";
import { City,CityForecast } from '../interfaces';
import { WeatherService } from "../services/WeaterService";
import { useStyles, useForecast } from "../hooks";
import { IconSet } from "../assets/icons";
import { SvgIcon } from '@material-ui/core';
import { Util } from "../services/Util";


const  ForecastShort: FC<{city: City}> = (({city}): ReactElement => {

  const css = useStyles();
  const util = new Util();

  const cityCode = `${city.code.toLowerCase()}_${city.lat}_${city.lon}`;

  const dispatch = useDispatch();
  let forecast: CityForecast["forecast"] | undefined = useForecast(cityCode);

  if(forecast === undefined) {
    new WeatherService().getForecast(city)
      .then ( response => {
        dispatch({
          type: 'ADD_FORECAST',
          code: cityCode,
          result: response.data
        });
      });

    return (
      <div></div>
    );
  } else {
      return (
        <>
          <ListItemText>
            <Typography variant="h4" className={css.temperature}>
              { util.getTemperatureCFormatted(forecast.current.temp) }
            </Typography>
          </ListItemText>
          <SvgIcon className={css.weatherShort} component={IconSet[forecast.current.weather.icon]} viewBox="0 0 64 64" />
        </>
      ); 
  }  
  
});

export default ForecastShort;