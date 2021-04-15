import { createStyles, fade, makeStyles, Theme } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../interfaces";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      margin: theme.spacing(2, 0, 2),
      flexGrow: 1
    },
    link: {
      textDecoration: 'none',
      color: 'inherit'
    },
    appContainer: {
      minHeight: '100vh',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
    weather: {
      margin: '0 auto',
      width: '100px',
      height: '100px',
      position: 'relative'
    },
    weatherShort: {
      width: '48px',
      height: '48px',
      marginLeft: '10px'
    },
    paper: {
      textAlign: 'center',
      height: '200px',
    },
    headerHourly: {
      backgroundColor: theme.palette.primary.light,
      color: '#ffffff',
      margin: theme.spacing(0,0,2,0)
    },
    alignCenter: {
      textAlign: 'center',
    },
    deg: {
      fontSize:'2rem',
      position: 'relative',
      top: '-2rem'
    },
    ml_0: {
      marginLeft: 0,
      paddingLeft: 0
    },
    listItem: {
      marginLeft: 0,
      paddingLeft: '0!important',
      marginRight: 0,
      paddingRight: '0!important'
    },
    weatherDesc: {
      textAlign: 'center',
      width: '100%',
      position: 'absolute',
      bottom: '-50px'
    },
    gridHourly: {
      marginBottom: theme.spacing(4)
    },
    button: {
      margin: theme.spacing(1,0,4,0),
      marginBottom: '32px!important'
    },
    temperature: {
      textAlign:'right'
    },
    temperatureDetail: {
      textAlign:'left'
    },
  }),
);

export const useForecast = (cityCode: string) => useSelector((state: RootState) => {
  let forecast = undefined;
  let result = state.forecasts.find ( (item )  => {
    if(item.code == cityCode) {
      return item; 
    }
  });
  //проверяем время запроса. Если не укладывается в кэш, возвращаем пустой ответ
  if(result !== undefined) {
    let forecastTimeStamp = result.queryTime;
    let currentTimeStamp = Date.now();

  console.log(forecastTimeStamp,process.env.CACHE_TTL, '=>', currentTimeStamp);
  console.log('comparing_TTL',forecastTimeStamp + parseInt(process.env.CACHE_TTL) - currentTimeStamp);
    if( forecastTimeStamp + parseInt(process.env.CACHE_TTL) * 1000 > currentTimeStamp ) {
      forecast = result.forecast;
    }
  }
  return forecast;
})