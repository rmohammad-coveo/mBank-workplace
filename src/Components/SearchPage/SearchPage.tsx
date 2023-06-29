import React, { useContext, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SearchBox from "./SearchBox";
import QuerySummary from "./QuerySummary";
import ResultList from "./ResultList";
import Pager from "./Pager";
import Sort from "./Sort";
import FacetList from "./Facet/FacetList";
import ResultsPerPage from "./ResultsPerPage";
import { SearchEngine } from "@coveo/headless";
import DidYouMean from "./DidyouMean";
import SearchSideBarRecommendationList from "./SearchSideBarRecommendationList";
import { useParams } from "react-router-dom";
import SearchTabs from "./SearchTabs";
import {
  DefaultSideBarRecommendationConfig,
  SearchPageTabConfig,
} from "../../config/SearchConfig";
import BreadcrumbManager from "./BreadcrumbManager";
import styled from 'styled-components'
import { CustomContextContext } from "../CustomContext/CustomContextContext";
import { DefaultSideBarRecommendationConfigType, SearchPageTabConfigType, sideBarRecommendationConfigType } from "../../config/Types/ConfigTypes";
import NotifyTrigger from "./NotifyTrigger";
import SmartSnippet from "./SmartSnippet";
import RedirectionTrigger from "./RedirectionTrigger";
import ExecuteTrigger from "./ExecuteTrigger";
import SidePanel from '../HomePage/SidePanel';
import { keyframes } from 'styled-components';

interface ISearchPageProps {
  engine: SearchEngine;
}

const SearchPage: React.FunctionComponent<ISearchPageProps> = (props) => {
  const { filter } = useParams();
  const { engine } = props;
  const [resultLoading, setResultLoading] = useState(false);
  const {settingContext} = useContext(CustomContextContext);


  const IsSideBarRecommendation = ()=>{

    let flag = false;

    SearchPageTabConfig.map((tab : SearchPageTabConfigType, index: number) => {
      if (
        (filter?.toLowerCase() ===
          tab.caption.replace(/\s/g, "").toLowerCase() ||
          (index === 0 && filter === undefined)) &&
        tab.sideBarRecommendationConfig
      ){
          flag =  true;
      }

    })

    return flag;
  }



  return (
    <>
    <SidePanel/>
    <Content>
      <Grid
        container
        justifyContent="center"
        style={{
          background: "#ffffff",
        }}
      >
          <SearchBoxContainer>
          <SearchBox />
          </SearchBoxContainer>
      </Grid>
      <SearchTabs filterSelected={filter? filter : ""} />
      <Container maxWidth="xl" style={{ padding: "0px" }}>
        <Grid item mt={3} mb={2} mx={4}>
          <RedirectionTrigger/>
          <NotifyTrigger/>
          <ExecuteTrigger/>
          <DidYouMean />
        </Grid>
        <Box mx={4}>
          <Grid container style={{ opacity: resultLoading ? "0.6" : "1" }}>
            <Grid item xs={12} md={9} sm={12}>
            <BreadcrumbManager/>
              <Box pl={3} pr={2}>
                <Grid container alignItems="flex-end">
                  <Grid item md={10} xs ={12} mb={2}>
                    <QuerySummary />
                  </Grid>
                  <Grid
                    item
                    md={2}
                    xs ={12}
                    mb={2}
                  >
                    <Sort />
                    
                  </Grid>
                </Grid>
                <SmartSnippet/>
                <ResultList setResultLoading={setResultLoading} />
              </Box>
              <Box my={4}>
                <Grid container>
                  <Grid item md={6} ml = {2} mb={2}>
                    <Pager />
                  </Grid>
                  <Grid item md={5} ml = {2}>
                    <ResultsPerPage />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} md={3} sm={12}>
              <FacetList />
            </Grid>
          </Grid>
        </Box>
      </Container>
      </Content>
    </>
  );
};

export default SearchPage;



export const SideBarRecommendation :React.FC<{filter : string | undefined}> = ({filter})=>{

  return  <>
  {DefaultSideBarRecommendationConfig.length > 0? (
    <>
      {DefaultSideBarRecommendationConfig.map((item : DefaultSideBarRecommendationConfigType) => {
        return (
          <React.Fragment key={item.title}>
            <SearchSideBarRecommendationList
              pipeline={item?.pipeline}
              NumberofResults={item?.NumberofResults}
              title={item?.title}
              videoRecommendation={item?.videoRecommendation}
              imageField = {item.imageField}
              searchHub = {item.searchHub}
            />
          </React.Fragment>
        );
      })}
    </>
  ) : (
    <>
      {SearchPageTabConfig.map((tab : SearchPageTabConfigType, index: number) => {
        if (
          (filter?.toLowerCase() ===
            tab.caption.replace(/\s/g, "").toLowerCase() ||
            (index === 0 && filter === undefined)) &&
          tab.sideBarRecommendationConfig
        ) {
          return (
            <React.Fragment key={tab.caption}>
              <>
                {tab.sideBarRecommendationConfig.map((item : sideBarRecommendationConfigType) => {
                  return (
                    <React.Fragment key={item.title}>
                      <SearchSideBarRecommendationList
                        pipeline={item.pipeline}
                        NumberofResults={item.NumberofResults}
                        title={item.title}
                        videoRecommendation={item.videoRecommendation}
                        imageField = {item.imageField}
                        searchHub = {item.searchHub}
                      />
                    </React.Fragment>
                  );
                })}
              </>
            </React.Fragment>
          );
        }
      })}
    </>
  )}
  </>
}





const SearchBoxContainer = styled.div`
  width: 50%;
  max-width: 800px;
  min-width: 500px;
  padding: 20px 10px;
  flex: 1;
  position: relative;
  align-items: center;
  @media (max-width: 480px) {
    min-width: 80vw;
  }
  margin-right: auto;
  margin-left: 20px;

`
const slideIn = keyframes`
0% {
  transform: translateX(200px);
}
100% {
  transform: translateX(0);
}
`
const Content = styled.div`
position: relative;
left: 17.5rem;
width: calc(100% - 17.5rem);
height: 100vh;
@media (min-width: 1550px) {
    padding:0px;
}
-webkit-animation: ${slideIn} 0.6s forwards;
-webkit-animation-delay: 2s;
animation: ${slideIn} 0.6s forwards;
`