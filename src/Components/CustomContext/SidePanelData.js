import React, { useContext } from "react";
import styled from "styled-components";
import SidePanelProfile from "./SidePanelProfile";
import ContextDataTable from "./ContextDataTable";
import { CustomContextContext } from "./CustomContextContext";
import SidePanel from "../HomePage/SidePanel";

const ContextForm = () => {

  const {profileSelected, setProfiledSelected, ContextData,setContextData,handleSave, } = useContext(CustomContextContext)

  return (
    <Wrapper>
      <SidePanelProfile
        setProfiledSelected={setProfiledSelected}
        profileSelected={profileSelected}
        ContextData={ContextData}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 30px 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default ContextForm;
