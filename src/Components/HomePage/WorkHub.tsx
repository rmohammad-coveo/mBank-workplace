import React from 'react';
import SidePanel from './SidePanel';
import HubContent from './HubContent';
import {Theme} from '../../theme';
import styled from "styled-components";
import { HeroConfig } from '../../config/HomeConfig';
import { useNavigate } from 'react-router-dom';
import {chevronRight} from 'react-icons-kit/fa/chevronRight';
import { Icon } from "react-icons-kit";

const WorkHub: React.FC = ()=>{
    const navigate = useNavigate();
    return (
        <>
            <SidePanel />
            <HubContent />
        </>
    )
};

export default WorkHub;