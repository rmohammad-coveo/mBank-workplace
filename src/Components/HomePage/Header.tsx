import React, { useContext, useEffect, useState } from "react";
import { Theme } from "../../theme";
import styled from "styled-components";
import HeaderLogo from "../../assets/HeaderLogo.png";
import { Link } from "react-router-dom";
import { Icon } from "react-icons-kit";
import Settings from '../../assets/settings.png';
import User from '../../assets/user.png';
import Bell from '../../assets/bell.png';
import { search } from "react-icons-kit/feather/search";
import HomeSearchBox from "./HomeSearchBox";
import { x } from "react-icons-kit/feather/x";
import Fade from "@mui/material/Fade";
import { useLocation, useNavigate } from "react-router-dom";
import { HeaderConfig } from "../../config/HomeConfig";
import Popover from "@mui/material/Popover";
import ContextForm from "../CustomContext/ContextForm";
import { CustomContextContext } from "../CustomContext/CustomContextContext";
import HomeResultsSearchBox from "./HomeResultsSearchBox";
import { keyframes } from 'styled-components'

const Header: React.FC = () => {
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {getProfile} = useContext(CustomContextContext)
  const onSearchPage = location.pathname.includes("search");
  const toggleSearchBox = () => {
    if (onSearchPage) {
      const input = document.querySelector(".search-box input");
      if (input instanceof HTMLElement) {
        input.focus();
      }
      return;
    }
    setOpenSearch(!openSearch);
  };

  useEffect(() => {
    if (openSearch) {
      const input = document.querySelector(".home-search-box input");
      if (input instanceof HTMLElement) {
        input.focus();
      }
    }
  }, [openSearch]);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
    {!onSearchPage && (
      <Wrapper>
        <SearchWrapper>
          <SearchBoxContainer>
            {!onSearchPage && 
            <HomeSearchBox toggleSearchBox={toggleSearchBox} />
            }
          </SearchBoxContainer>
        </SearchWrapper>
        <RightWrapper>
            <IconsWrapper>
              <div style={{display: 'flex'}}>
              {/* <div>
              <IconContainer
                style={{ color: Theme.headerIconColor, cursor: "pointer", flexDirection:'row' }}
                onClick={() => toggleSearchBox()}
              >
                {openSearch && !onSearchPage ? (
                  <Icon icon={x} size={20} />
                ) : (
                  <Icon icon={search} size={20} />
                )}
                </IconContainer>
                </div>
                <div><IconContainer
                style={{color: Theme.headerIconColor, cursor: "pointer", flexDirection:'row' }}
              > <Icon icon={envelopeO} size={20} /></IconContainer></div>
                <div>
                <IconContainer
                style={{ color: Theme.headerIconColor, cursor: "pointer", flexDirection:'row' }}
              >     <Icon icon={globe} size={20} /></IconContainer></div>
              <Divider/> */}
              <div>
              <ProfileIconContainer
                style={{ color: Theme.headerIconColor, cursor: "pointer" }}
                aria-describedby={id}
                onClick={(event)=>handleClick(event)}
              >
                <ProfileAvatar src= {User} />
                <ProfileName>{getProfile().name.split(' ').slice(0, -1).join(' ')}</ProfileName>
              </ProfileIconContainer>
              </div>
              <div>
                <IconContainer
                style={{color: Theme.headerIconColor, cursor: "pointer", flexDirection:'row' }}
              > <ProfileAvatar src={Settings} />
              </IconContainer>
              </div>
              <div>
                <IconContainer
                style={{ color: Theme.headerIconColor, cursor: "pointer", flexDirection:'row' }}
              >     <ProfileAvatar src={Bell} />
              </IconContainer>
              </div>
              </div>
              <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <ContextForm/>
                </Popover>
            </IconsWrapper>
        </RightWrapper>
      </Wrapper>
      )}
      {/* <Fade in={openSearch && !onSearchPage}>
      <SearchContainer>
          <SearchBoxContainer>
            {!onSearchPage && 
            <HomeSearchBox toggleSearchBox={toggleSearchBox} />
            }
          </SearchBoxContainer>
        </SearchContainer>
      </Fade> */}
    </>
  );
};

const slideIn = keyframes`
0% {
  transform: translateY(-200px);
}
100% {
  transform: translateY(0);
}
`

const Wrapper = styled.header`
position: fixed;
width: 85%;
height: 9vh;
left: 17.5rem;
border-bottom: #e5e8e8 1px solid;
z-index: 2;
display: flex;
background-color: white;
flex: 1;
-webkit-animation: ${slideIn} 0.6s forwards;
-webkit-animation-delay: 2s;
animation: ${slideIn} 0.6s forwards;
`;

const SearchWrapper = styled.div`
flex: 3 1 0%;
position: relative;
display: flex;
align-items: center;
padding-left: 20px;
`

const RightWrapper = styled.div`
flex: 1 1 0%;
display: flex;
justify-content: space-between;
align-items: center;
margin-left: 80px;
@media (min-width: 1650px) {
 margin-left: 580px;
}
`;

const Middlewrapper = styled.div`
display: flex;
margin-left: 100px;
flex: 1;
`;

const LeftWrapper = styled.div`
display: flex;
flex: 1;
justify-content: flex-start;
`;

const Logo = styled.img`
min-width: 156px;
width: 156px;
max-width: 100%;
height: auto;
`;

const LinkWrapper = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 600px;
  @media (max-width: 1000px) {
    width: auto;
  }
`;

const NavigationLink = styled(Link)`
  color: ${Theme.primaryText};
  font-family: canada-type-gibson;
  text-rendering: optimizeLegibility;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: 0.2s ease-in-out all;
  &:hover {
    opacity: 0.7;
    color: #00bdf2
  }
  @media (max-width: 1000px) {
    display: none;
  }
`;

const Divider = styled.div`
  border-right-width: 2px;
  width: 1px;
  height: 33px;
  background: #e5e8e8;
  @media (max-width:1000px) {
    display: none;
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  box-shadow: 0px 6px 16px rgba(229, 232, 232, 0.75);
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  background-color: white;
  justify-content: center;
`;

const IconsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const IconContainer = styled.button`
flex-direction: row;
background: none;
border: 0px;
width: 40px;
transition: 0.2s ease-in-out all;
&:hover{
  transform: scale(0.95);
}
&:active{
  transform: scale(0.85);
}
`

const ProfileName = styled.span`
font-size  : 14px;
font-weight: 400;
font-family: inherit;
margin-left: 15px;
color : ${Theme.secondaryText};
text-overflow: ellipsis;
`

const ProfileIconContainer = styled.button`
  background: none;
  border: 0px;
  margin-left: 20px;
  width: 90px;
  display: flex;
  align-items: center;
  transition: 0.2s ease-in-out all;
  &:hover{
  transform: scale(0.95);
}
&:active{
  transform: scale(0.85);
}

`

const SearchBoxContainer = styled.div`
  width: 100%;
  max-width: 800px;
  min-width: 500px;
  @media (max-width: 480px) {
    min-width: 80vw;
  }
`;


const ProfileAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 24px;
  object-fit: cover;
`

export default Header;
