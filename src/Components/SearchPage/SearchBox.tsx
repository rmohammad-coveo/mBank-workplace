import {FunctionComponent, useEffect, useState, useContext} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {
  buildSearchBox,
  SearchBox as HeadlessSearchBox,
  SearchBoxOptions,
} from '@coveo/headless';
import EngineContext from '../../common/engineContext';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { Icon } from "react-icons-kit";
import { search } from "react-icons-kit/feather/search";


interface SearchBoxProps {
  controller: HeadlessSearchBox;
}

const SearchBoxRenderer: FunctionComponent<SearchBoxProps> = (props) => {
  const {controller} = props;
  const [state, setState] = useState(controller.state);

  useEffect(
    () => controller.subscribe(() => setState(controller.state)),
    [controller]
  );

  const onPressSearchButton = ()=>{
    controller.submit();
  }


  return (
    <Container>
      <SearchButton type='submit' variant="contained" style={{height : '50px'}} onClick={onPressSearchButton}><Icon icon={search} size={24} /></SearchButton>
    <Autocomplete
      inputValue={state.value}
      onInputChange={(_, newInputValue) => {
        controller.updateText(newInputValue);
      }}
      onChange={() => {
        controller.submit();
      }}
      options={state.suggestions.map((suggestion) => suggestion.rawValue)}
      freeSolo
      style={{width: '100%', background: 'white'}}
      renderInput={(params) => (
        <TextField {...params} size="medium" className='search-box' placeholder="Czego szukasz?"
        sx={{"& fieldset": {border:"none"}, marginTop: "4px"}}/>
      )}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option, inputValue);
        const parts = parse(option, matches);
        return (
          <li {...props}>
            <div>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{
                    fontWeight: part.highlight ? 400 : 300,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          </li>
        );
      }}
    />
    </Container>
  );
};

const SearchBox = () => {
  const options: SearchBoxOptions = {numberOfSuggestions: 8};
  const engine = useContext(EngineContext)!;
  const controller = buildSearchBox(engine, {options});

// This is added to fix a bug which does not allow to see query suggestion on first click.  
  if(controller.state.value === ""){
    controller.updateText('');
  }
  
  return <SearchBoxRenderer controller={controller} />;
};

export default SearchBox;


const Container = styled.div`
  display: flex;
  flex-direction: row; 
  align-items: center;
  border: 1px solid #aaaaaa;
  border-bottom: 3px solid #2f46de;
  border-radius: 2px;
`

const SearchButton = styled(Button)`
background-color: white;
color: #ae0000;
border: none;
box-shadow: none;
&:hover {
  background-color: white;
  box-shadow: none;
}
`
