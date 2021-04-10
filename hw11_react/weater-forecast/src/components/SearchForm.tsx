import { InputBase } from "@material-ui/core";
import React, { FC, useState }  from "react";
import SearchIcon from '@material-ui/icons/Search';
import { useHistory, useLocation } from "react-router-dom";
import { useStyles } from '../hooks';

//const  SearchForm: FC = () => {
const SearchForm: FC = () => {

  //разбираем параметры запроса
  const useQuery = () => {
    return new URLSearchParams(useLocation().search).get("query") || "";
  }
  let query = useQuery();  

  const classes = useStyles();

  const [search, setSearch] = useState(query);

  const routerHistory = useHistory();

  const handleSubmit = ( event ) => {
    event.preventDefault();
    
    if(search === '') {
      routerHistory.push('/');
    } else {
      routerHistory.push(`/search?query=${search}`);
    }
    
    return false;
  }

  return (
    <div className={classes.search}>
      <form onSubmit={handleSubmit}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </form>
    </div>
  );
}

export default SearchForm;

