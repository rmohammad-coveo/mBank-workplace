import React , { useContext } from "react";
import Header from "./Header";
import {Theme} from '../../theme';
import styled from "styled-components";
import { HeroConfig } from '../../config/HomeConfig';
import { useNavigate } from 'react-router-dom';
import {chevronRight} from 'react-icons-kit/fa/chevronRight';
import { Icon } from "react-icons-kit";
import { keyframes } from 'styled-components';
import { CustomContextContext } from "../CustomContext/CustomContextContext";
import HomePage from './HomePage';
import {
    FieldToIncludesInSearchResults,
    ResultTemplateConfig,
  } from "../../config/SearchConfig";
import {  AtomicSearchInterface, AtomicResultSectionBadges,AtomicResultBadge,AtomicResultText, AtomicText} from "@coveo/atomic-react";
import {AtomicCategoryFacet} from "@coveo/atomic-react";
import { MainRecommendationConfig, ToolsConfig } from "../../config/HomeConfig";
import SideRecommendation from '../Recommendations/SideRecommendations';
import Avatar from '@mui/material/Avatar';


const HubContent: React.FC = ()=>{
    const navigate = useNavigate();
    const {profileSelected, setProfiledSelected, ContextData,setContextData,handleSave, } = useContext(CustomContextContext);
    const FilteredProfileContext = ContextData.filter((item: any)=> item.name === profileSelected);
    const name = FilteredProfileContext[0].name === 'Anonymous'? 'None': FilteredProfileContext[0].people_worked_with[0];
    const role = FilteredProfileContext[0].name === 'Anonymous'? '': FilteredProfileContext[0].people_worked_with[1];
    const dept = FilteredProfileContext[0].name === 'Anonymous'? '': FilteredProfileContext[0].people_worked_with[2];
    const source = FilteredProfileContext[0].name === 'Anonymous'? '': FilteredProfileContext[0].people_worked_with[3];
    

    const docname = FilteredProfileContext[0].name === 'Anonymous'? '': FilteredProfileContext[0].files[0];
    const doctype = FilteredProfileContext[0].name === 'Anonymous'? '': FilteredProfileContext[0].files[1];
    const docdate = FilteredProfileContext[0].name === 'Anonymous'? '': FilteredProfileContext[0].files[2];
    const docimg = FilteredProfileContext[0].name === 'Anonymous'? '': FilteredProfileContext[0].files[3];

    return (
        <Main>
            <Dashboard>
                <Header/>
                <MainContent>
                    <LeftSection><HomePage/></LeftSection>
                    <RightSection>
                        <Trending>
                        <br/>
                            <h2>Popularne tematy</h2>
                            <SideRecommendation />
                            <h2>Osoby z którymi Państwo pracuja</h2>
                            <div style={{display: 'flex', marginTop: '20px', marginBottom: '20px'}}> 
                            <div>
                            <Avatar
                                alt="image"
                                src={source}
                                style={{ width: 60, height: 60, marginBottom : '20px'}}
                            />
                            </div>
                            <div style={{paddingLeft: '10px', paddingTop: '5px'}}>
                             <h5>{name}</h5>
                             <p style={{fontSize: '11px'}}>{role}</p>
                             <p style={{fontSize: '11px'}}>{dept}</p>
                             </div>
                             </div>
                            <h2>Podobne pliki</h2>
                            <div style={{display: 'flex', marginTop: '10px', marginBottom: '20px'}}> 
                            <div>
                                {FilteredProfileContext[0].name === 'Anonymous'? 'None': <img src={docimg} style={{width:'36px', height: '36px'}}/>}
                            </div>
                            <div style={{paddingLeft: '10px'}}>
                                <p style={{fontWeight: '500'}}>{docname}</p>
                                <p style={{float: 'left', backgroundColor: '#f5f5f5', color: '#777777', margin: '4px 8px 4px 0px', borderRadius: '4px'}}>{doctype} </p> 
                                <p style={{float: 'left', paddingLeft: '10px', color: '#777777', margin: '4px 8px 4px 0px'}}>{docdate}</p>
                            </div>
                                
                            </div>
                            <h2>Twoje programy</h2>
                            {ToolsConfig.map((tool, index)=>{
                                return (
                                    <div key={index} style={{display: 'flex', marginBottom: '10px', marginTop: '10px'}}>
                                        <img src={tool.image} style={{width: '35px', height: '35px'}}/>
                                        <span style={{paddingLeft: '15px'}}>
                                            <h4>{tool.title}</h4>
                                            <p style={{fontSize: '12px'}}>{tool.desc}</p>
                                        </span>
                                </div>
                                )
                                
                            })}
                        </Trending>
                    </RightSection>
                </MainContent>
            </Dashboard>
        </Main>
        )
};


const slideIn = keyframes`
0% {
  transform: translateX(200px);
}
100% {
  transform: translateX(0);
}
`
const RecommendationBadge = styled.div`
  background: red;
  width: 100px;
  height: 20px;
  border-radius: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: ${Theme.excerpt};
`;

const BadgeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 210px;
  justify-content: space-between;
`;


const Trending = styled.div`
    justify-content: center;
    align-items: center;
    padding: 20px;
`

const Main = styled.div`
position: relative;
left: 17.5rem;
width: calc(100% - 17.5rem);
height: 100vh;
@media (min-width: 1550px) {
    padding:0px;
}
`
const Dashboard = styled.div`
display: block;
@media (min-width: 1550px) {
    padding:0px;
}
`

const MainContent = styled.div`
position: relative;
top: 9vh;
display: flex;
-webkit-animation: ${slideIn} 0.6s forwards;
-webkit-animation-delay: 2s;
animation: ${slideIn} 0.6s forwards;

`

const LeftSection = styled.div`
flex: 3 1 0%;
overflow: hidden;
`

const RightSection = styled.div`
flex: 1 1 0%;
overflow: hidden;
border-left: #e5e8e8 1px solid;
`



export default HubContent;