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
import RecommendtionCard, {
  SkeletonRecommendtionCard,
} from "./RecommendationCard";
import SampleImage from "../../assets/sampleImages/recommendation.png";
import { CustomContextContext } from "../CustomContext/CustomContextContext";
import { MainRecommendationConfig } from "../../config/HomeConfig";
import Bulb from '../../assets/bulb.png';
import SharePoint from '../../assets/sharePoint_logo.png';
import Coveo from '../../assets/coveo.png';
import globe from '../../assets/globe.png';
import pdf from '../../assets/FileTypeIcons/pdf.svg'

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
    controller.subscribe(() => setState(controller.state));
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

  const skeletonArray = [1, 2, 3];
 
  const NumberOfResult = MainRecommendationConfig.numberOfResults;
  return (
    <MainWrapper>
      <div style={{display: 'flex', width : '100%'}}>
        <div style={{flexDirection: 'row', width : '5%', }}>
        <Logo src={Bulb}/>
        </div>
        <div style={{flexDirection: 'row', width : '95%'}}>
        <Title>{MainRecommendationConfig.title}</Title>
        </div>
      </div>
      {state.recommendations.length > 0 ? (
        <CardWrapper>
          {state?.recommendations
            ?.slice(0, NumberOfResult)
            .map((recommendation, index) => {
              const temp: unknown = recommendation.raw[`${MainRecommendationConfig.imageField}`];
              const tempo:  unknown  = recommendation.raw[`${MainRecommendationConfig.date}`];

                const imageURL: string = temp as string;
                const date:  number | string  = tempo as number;

              return (
                <div key={recommendation.title + recommendation.uniqueId}>
                  <RecommendtionCard
                    video={false}
                    title={recommendation.title}
                    description={recommendation.excerpt}
                    date={date}
                    image={recommendation.raw.filetype === "pdf" ? pdf : globe}
                    clickUri={recommendation.clickUri}
                    onClick={() => logClick(recommendation)}
                    onContextMenu={() => logClick(recommendation)}
                    onMouseDown={() => logClick(recommendation)}
                    onMouseUp={() => logClick(recommendation)}
                  />
                </div>
              );
            })}
        </CardWrapper>
      ) : (
        <CardWrapper>
          {skeletonArray.map((item, index) => {
            return (
              <div key={item}>
                <SkeletonRecommendtionCard />
              </div>
            );
          })}
        </CardWrapper>
      )}
    </MainWrapper>
  );
};

const MainRecommendationList = () => {
  const recommendationEngine = buildRecommendationEngine({
    configuration: {
      organizationId: process.env.REACT_APP_ORGANIZATION_ID!,
      accessToken: process.env.REACT_APP_API_KEY!,
      searchHub: MainRecommendationConfig.searchHub,
      pipeline: MainRecommendationConfig.pipeline,
      platformUrl: process.env.REACT_APP_PLATFORM_URL
    },
  });

  const { settingContextFromEngine } = useContext(CustomContextContext);

  settingContextFromEngine(recommendationEngine);

  const recController = buildRecommendationList(recommendationEngine, {
    options: { id: MainRecommendationConfig.id },
  });

  return (
    <RecommendationListRenderer
      controller={recController}
      engine={recommendationEngine}
    />
  );
};

export default MainRecommendationList;

const MainWrapper = styled.div`
  width: 95%;
  position: relative;
  padding: 10px 20px;
  display: flex;
  flex-flow: column wrap;
  align-content: flex-start;

`;

const Logo = styled.img`
width: 32px;
margin-top: 30px;
margin-bottom: 10px;
filter: drop-shadow(0 0 3px #36ddff);
`

const Title = styled.h2`
  font-family: canada-type-gibson;
  font-size: 26px;
  font-weight: 700;
  text-align: left;
  font-family: inherit;
  color: ${Theme.primaryText};
  margin-top: 30px;
  margin-bottom: 10px;
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
