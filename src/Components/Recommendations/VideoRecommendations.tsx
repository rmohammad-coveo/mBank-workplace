import { useEffect, useState, FunctionComponent, useContext } from "react";
import {
  RecommendationList as HeadlessRecommendationList,
  loadClickAnalyticsActions,
  Result,
  buildRecommendationEngine,
  buildRecommendationList,
} from "@coveo/headless/recommendation";
import { Theme } from "../../theme";
import styled from "styled-components";
import RecommendtionCard, { SkeletonRecommendtionCard } from "./VideoRecommendationCard";
import SampleImage from "../../assets/sampleImages/recommendation.png";
import { CustomContextContext } from "../CustomContext/CustomContextContext";
import { VideoRecommendationConfig } from "../../config/HomeConfig";
import Youtube from '../../assets/youtube.png';

interface RecommendationListProps {
  controller: HeadlessRecommendationList;
  engine: any;
}

export const RecommendationListRenderer: FunctionComponent<
  RecommendationListProps
> = (props) => {
  const engine = props.engine;
  const { controller } = props;
  const [state, setState] = useState(controller.state);

  useEffect(() => {
    controller.refresh();
    controller.subscribe(() => setState(controller.state))
  }, []);


  if (state.error) {
    return (
      <div>
        <div>Oops {state.error.message}</div>
        <code>{JSON.stringify(state.error)}</code>
        <button onClick={() => controller.refresh()}>Try again</button>
      </div>
    );
  }

  const logClick = (recommendation: Result) => {
    if (!engine) {
      return;
    }
    const { logRecommendationOpen } = loadClickAnalyticsActions(engine);
    engine.dispatch(logRecommendationOpen(recommendation));
  };

  const skeletonArray = [1,2,3]
  const NumberOfResult = VideoRecommendationConfig.numberOfResults
  return (
    <MainWrapper>
      <div style={{display: 'flex', width : '100%', alignItems: "center"}}>
        <div style={{flexDirection: 'row', width : '5%', marginRight: "8px"}}>
        <Logo src={Youtube}/>
        </div>
        <div style={{flexDirection: 'row', width : '95%'}}>
        <Title>{VideoRecommendationConfig.title}</Title>
        </div>
      </div>
      {/* <SubTitle>{VideoRecommendationConfig.description}</SubTitle> */}
      {state.recommendations.length > 0 ?
      <CardWrapper>
        {state?.recommendations?.slice(0, NumberOfResult).map((recommendation, index) => {

        const temp: unknown = recommendation.raw[`${VideoRecommendationConfig.imageField}`];
        const tempo: unknown = recommendation.raw[`${VideoRecommendationConfig.date}`];

                const imageURL: string = temp as string;
                const date: number = tempo as number;
  
                console.log(recommendation.raw.date)

          return (
            <div key = {recommendation.title + recommendation.uniqueId}>
            <RecommendtionCard
              video={true}
              title={recommendation.title}
              date={date}
              description={recommendation.excerpt}
              image={imageURL? imageURL: SampleImage}
              clickUri={recommendation.clickUri} 
              onClick={() => logClick(recommendation)}
              onContextMenu={() => logClick(recommendation)}
              onMouseDown={() => logClick(recommendation)}
              onMouseUp={() => logClick(recommendation)}
            />
            </div>
          );
        })}
      </CardWrapper> : <CardWrapper>
        {skeletonArray.map((item, index) => {
          return (
            <div key = {item}>
            <SkeletonRecommendtionCard/>
            </div>
          );
        })}
      </CardWrapper> }
    </MainWrapper>
  );

};

const VideoRecommendation = () => {
  const recommendationEngine = buildRecommendationEngine({
    configuration: {
      organizationId: process.env.REACT_APP_ORGANIZATION_ID!,
      accessToken: process.env.REACT_APP_API_KEY!,
      searchHub : VideoRecommendationConfig.searchHub,
      pipeline : VideoRecommendationConfig.pipeline,
      platformUrl: process.env.REACT_APP_PLATFORM_URL

    },
  });


  const {settingContextFromEngine} = useContext(CustomContextContext)

  settingContextFromEngine(recommendationEngine)

  const recController = buildRecommendationList(recommendationEngine, {
    options: { id: VideoRecommendationConfig.id },
  });

  return (
    <RecommendationListRenderer
      controller={recController}
      engine={recommendationEngine}
    />
  );
};

export default VideoRecommendation;

const MainWrapper = styled.div`
width: 95%;
position: relative;
top: -80px;
padding: 40px 20px;
display: flex;
flex-flow: column wrap;
align-content: flex-start;
margin-bottom: 20px;
`;

const Title = styled.h2`
font-family: canada-type-gibson;
font-size: 26px;
font-weight: 700;
text-align: left;
font-family: inherit;
color: ${Theme.primaryText};
margin-top: 30px;
margin-bottom: 10px;
margin-left: 10px;
`;

const Logo = styled.img`
width: 50px;
margin-top: 30px;
margin-bottom: 10px;
position: relative;
`;

const SubTitle = styled.p`
font-weight: 300;
font-size: 18px;
line-height: 28px;
color: ${Theme.primaryText};
margin-bottom: 20px;
`;

const CardWrapper = styled.div`
display: flex;
  flex-wrap: wrap;
  flex: 1 1 50%;
  align-items: center;
  justify-content: flex-start;
  max-width: 1250px;
  margin-top: 20px;
`;

