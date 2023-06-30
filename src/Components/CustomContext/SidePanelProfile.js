import * as React from 'react';
import styled from "styled-components";
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';
import { CustomContextContext } from './CustomContextContext';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function ProfileSelector({ContextData,setProfiledSelected, profileSelected}) {

  const FilteredProfileContext = ContextData.filter((item)=> item.name === profileSelected)
  const {settingContext} = React.useContext(CustomContextContext)
  const theme = useTheme();
  /* const [personName, setPersonName] = React.useState([]); */

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setProfiledSelected(value)
  };

  return (
    <div style = {{display: 'flex', flexDirection: 'column'}}>
    <div style = {{display: 'flex', flexDirection: 'column', alignItems : "center", width: '100%', justifyContent:'left'}}>
      <Avatar
        alt="Remy Sharp"
        src={FilteredProfileContext[0].profile}
        sx={{ width: 100, height: 100, marginBottom : '20px'}}
      />
    </div>
    <div style = {{display: 'flex', flexDirection: 'column', alignItems : "center", width: '100%', justifyContent:'left'}}>
      <ProfileData>{FilteredProfileContext[0].name}</ProfileData>
      <p style={{fontSize: '14px'}}>{FilteredProfileContext[0].role}</p>
    <br/>
      <h5>{FilteredProfileContext[0].department}</h5>
      <ProfileData>{FilteredProfileContext[0].location}</ProfileData>
      <br/>
      {FilteredProfileContext[0].years_of_service && (<ProfileData>Dołączył(a) {FilteredProfileContext[0].years_of_service} lat temu</ProfileData>)}
    </div>
    </div>
  );
}

const ProfileData = styled.p`
color: #181d3a;
font-weight: 700;
font-size: 16px;
`