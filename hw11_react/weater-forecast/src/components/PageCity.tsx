import { Box, Button, Divider, Grid, List, ListItem, ListItemText, Paper, Typography } from "@material-ui/core";
import React, { FC, useState }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CityForecast, RootState } from "../interfaces";
import { WeatherService } from "../services/WeaterService";
import PageNotFound from '../components/PageNotFound';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { CityStorage } from "../services/CityStorage";
import { useForecast, useStyles } from "../hooks";
import { City } from "../interfaces";
import { IconSet } from "../assets/icons";
import { SvgIcon } from '@material-ui/core';
import { Util } from "../services/Util";



const  PageCity: FC = () => {
    const css = useStyles();
    const dispatch = useDispatch();
    const util = new Util();

    const [ cityNotFound, setCityNotFound ] = useState(false);

    //извлекаем код города из параметров
    const { cityCode } = useParams<{cityCode: string}>();
    const [ code, latStr, lonStr ] = cityCode.split('_');
    const lat = parseFloat(latStr);
    const lon = parseFloat(lonStr);

    const [ inFavorite, setInFavorite ] = useState(new CityStorage().isCityInStorage(code,lat,lon));

    //получаем город из стора
    const city = useSelector( (state: RootState) => state.cities.find( (item: City) => {
      if( item.code == code && item.lat == lat && item.lon == lon ) {
        return item;
      }
    }));  
    

    const handleClickFavorite = () => {
      if( city !== undefined) {
        if( !inFavorite ) {
          new CityStorage().addCity(city);
          setInFavorite(true);
        } else {
          new CityStorage().removeCity(city);
          setInFavorite(false);
        }  
      }
    };


    //если в сторе города нет, запрашиваем его по АПИ и кладем в стор - это вызовет перерисовку компонента
    //к этому моменту город уже будет в сторе
    if(city === undefined) {
      new WeatherService().search(code)
        .then ( response => {
          dispatch({
            type: 'ADD_QUERY',
            query: code,
            cities: response.data
          });
          let isCityFound = false;
          response.data.forEach( item => {
            const city = {
              name: item.local_names.ru,
              code: item.name.toLowerCase(),
              country: item.country,
              lat: item.lat,
              lon: item.lon
            };
            if( city.code === code && city.lat == lat && city.lon == lon) {
              isCityFound = true;
            }
            dispatch({
              type: 'ADD_CITY',
              city: city
            })
          });
          if(!isCityFound) {
            setCityNotFound(true);
          }
        });
    }

    //запрашиваем прогноз
    let forecast: CityForecast["forecast"] = useForecast(cityCode);

    //если в сторе прогноза нет (или кэш истек), запрашиваем и кладем в стор
    if(forecast === undefined && city !== undefined) {
      new WeatherService().getForecast(city)
        .then ( response => {
          dispatch({
            type: 'ADD_FORECAST',
            code: cityCode,
            result: response.data
          });
        });
    }    

    if( cityNotFound ) {
      return (
        <PageNotFound />
      );
    } else {
      if( city === undefined || forecast === undefined) {
        return (
          <div></div>
        );
      } else {
        const hourly = forecast.hourly.slice(0,12).map( (element,key) => {
          if( key % 3 === 0) {
            return (
              <Grid item xs={3}  key={key}>
              <Paper className={css.paper}>
                <Typography variant="h6"  className={css.headerHourly}>
                  {util.getTime(element.dt)}
                </Typography>
                <Typography variant="h4">
                  {util.getTemperatureCFormatted(element.temp)}
                </Typography>
                <SvgIcon className={css.weatherShort} component={IconSet[element.weather.icon]} viewBox="0 0 64 64" />
                <div>{element.weather.description}</div>
              </Paper>
            </Grid>
            );
          }
        });
        const daily = forecast.daily.map( (element,key) => (
          <ListItem key={key} className={css.listItem}>
            <ListItemText>
              <Typography variant="h4">
                {util.getDate(element.dt)}
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography variant="h4" className={css.temperature}>
                { util.getTemperatureCFormatted(element.temp.day) }
              </Typography>
            </ListItemText>
            <SvgIcon className={css.weatherShort} component={IconSet[element.weather.icon]} viewBox="0 0 64 64" />
          </ListItem>
        ));
        return (
          <>
            <Typography variant="h4" className={css.title}>
                Погода в г. {city.name}, {new Date().toLocaleDateString()}
            </Typography>

            <Grid container spacing={0}>
              <Grid item xs={8}>
                <Box>
                  <Typography variant="h1" className={css.temperatureDetail}>
                    { util.getTemperatureCFormatted(forecast.current.temp)}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box className={css.weather}>
                  <SvgIcon className={css.weather} component={IconSet[forecast.current.weather.icon]} viewBox="0 0 64 64" />
                  <div className={css.weatherDesc}>{forecast.current.weather.description}</div>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <List>
                <ListItem className={css.listItem}>
                  Влажность: {forecast.current.humidity} %
                </ListItem>
                <ListItem className={css.listItem}>
                  Атмосферное давление: {forecast.current.pressure}
                </ListItem>
                <ListItem className={css.listItem}>
                  Ветер: {forecast.current.wind.speed} м/с
                </ListItem>
              </List>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              className={css.button}
              onClick={handleClickFavorite}
              startIcon={!inFavorite ? <FavoriteBorderIcon /> : <FavoriteIcon />}
            >
              {!inFavorite ? `Добавить в избранное` : `Удалить из избранного`}
            </Button>

            <Divider />

            <Typography variant="h6" className={css.title}>
                Погода в ближайшие часы
            </Typography>

            <Grid container spacing={2} className={css.gridHourly}>
              { hourly }
            </Grid>

            <Divider />

            <Typography variant="h6" className={css.title}>
                Погода на неделю
            </Typography>

            <List>
              { daily }
            </List>
          </>
        )  
      }  
    }
};

export default PageCity;