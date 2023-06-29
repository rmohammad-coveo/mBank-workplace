import React from "react";
import HeroHome from "./HeroHome";
import { Theme } from "../../theme";
import styled from "styled-components";
import MainRecommendations from "../Recommendations/MainRecommendations";
import VideoRecommendations from "../Recommendations/VideoRecommendations";
import SlackList from "../Recommendations/SlackList";
import { MainRecommendationConfig, VideoRecommendationConfig, SlackConfig } from "../../config/HomeConfig";

const HomePage: React.FC = () => {

  return (
    <>
      <MainWrapper>
        <HeroHome />
        {Object.keys(MainRecommendationConfig).length !== 0 &&  <MainRecommendations />}
        {Object.keys(SlackConfig).length !== 0 &&  <SlackList />}
        {Object.keys(VideoRecommendationConfig).length !== 0 && <VideoRecommendations />}
      </MainWrapper>
    </>
  );
};

const MainWrapper = styled.div`
  width: 100%;
  background-color: ${Theme.navbar};
  display: flex;
  flex-direction: column;
  align-items: center;
`;



export default HomePage;