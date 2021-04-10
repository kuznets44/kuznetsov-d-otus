import { Typography } from "@material-ui/core";
import React, { FC }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState, SearchQuery } from "../interfaces";
import { WeatherService } from "../services/WeaterService";
import CityList from "./CityList";
import { useStyles } from '../hooks';


const PageSearch: FC = () => {  

  //разбираем параметры запроса
  const useQuery = () => {
    return new URLSearchParams(useLocation().search).get("query");
  }
  let query = useQuery();

  const classes = useStyles();

  //результаты поиска

  const dispatch = useDispatch();
  let result: SearchQuery | undefined = useSelector((state: RootState) => {
    return state.searchQueries.find ( (item: SearchQuery)  => {
      if(item.query == query.toUpperCase()) {
        return item;
      }
    })
  });

  let pageContent: JSX.Element = (<></>);

  if(result === undefined) {
    new WeatherService().search(query)
      .then ( response => {
        dispatch({
          type: 'ADD_QUERY',
          query: query,
          cities: response.data
        });
        response.data.forEach( item => dispatch({
          type: 'ADD_CITY',
          city: {
            name: item.local_names.ru,
            code: item.name.toLowerCase(),
            country: item.country,
            lat: item.lat,
            lon: item.lon
          }
        }));
      });
    //result = {query: query, cities: []};

  } else {
    pageContent = (
      <CityList cityList={result.cities} />
    );  
  }

  return (
    <>
      <Typography variant="h6" className={classes.title}>
          Результаты поиска
      </Typography>

      {pageContent}
    </>
  );
}

export default PageSearch;