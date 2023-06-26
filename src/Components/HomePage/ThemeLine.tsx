import React from "react";
import styled from "styled-components";

function ThemeLine() {

    return (
        <LinesContainer>
        <Lines style={{width:"25%", backgroundColor:"red"}}/>
        <Lines style={{width:"5%", backgroundColor:"black"}}/>
        <Lines style={{width:"30%", backgroundColor:"orange"}}/>
        <Lines style={{width:"10%", backgroundColor:"brown"}}/>
        <Lines style={{width:"5%", backgroundColor:"blue"}}/>
        <Lines style={{width:"25%", backgroundColor:"green"}}/>
      </LinesContainer>
    )
}

const LinesContainer = styled.div`
  display: flex;
  margin: 0 auto;
  width: 1005;
`;

const Lines = styled.div`
  height: 5px;
`;

export default ThemeLine;