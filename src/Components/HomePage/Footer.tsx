import React from "react";
import styled from "styled-components";
import { Theme } from "../../theme";
import HeaderLogo from "../../assets/HeaderLogo.png";


const Footer: React.FC = () => {
  return (
    <Wrapper>
      <Logo src={HeaderLogo} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  background: linear-gradient(90deg,rgba(0,0,0,0.7),rgba(0,0,0,0) 99.61%);
`;

const Logo = styled.img`
height: 80px;
object-fit: contain;
margin-left: 30px;
`;

export default Footer;
