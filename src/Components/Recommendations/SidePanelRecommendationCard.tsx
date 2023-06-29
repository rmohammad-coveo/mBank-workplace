import React from "react";
import { Theme } from "../../theme";
import styled from "styled-components";
import { chevronRight } from "react-icons-kit/feather/chevronRight";
import { Icon } from "react-icons-kit";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";  

interface RecommendationCardType {
  title: string;
  concept: string[];
  word: string;
  description: string;
  date: number;
  image: string;
  video?: boolean;
  clickUri: string;
  onClick: () => void;
  onContextMenu: () => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
  source?: string;
}

const RecommendtionCard: React.FC<RecommendationCardType> = ({
  title,
  concept,
  word,
  clickUri,
  onClick,
  onContextMenu,
  onMouseDown,
  onMouseUp,
  source = "",
}) => {

  return (
    <MainWrapper
      key={title}
      onClick={() => {
        onClick();
        window.open(`#`, "_self", "noopener,noreferrer");
      }}
      onContextMenu={onContextMenu}
    >
      <TextWrapper>
          {word}
      </TextWrapper>
    </MainWrapper>
  );
};

export const SkeletonRecommendtionCard: React.FC = () => {
  return (
    <MainWrapper>
      <Skeleton
        style={{ height: "250px", position: "relative", top: "-5px" }}
      />
      <div style={{ padding: "30px 20px" }}>
        <Skeleton count={1} style={{ marginBottom: "20px", height: "50px" }} />
        <Skeleton count={2} style={{ margin: "10px 0px" }} />
      </div>
    </MainWrapper>
  );
};

const ImageContainer = styled.div`
  overflow: hidden;
`;

const Image = styled.img`
object-fit: contain;
object-position: center center;
width: 20%;
height: 20%;
margin-left: 15px;
transition: 0.2s ease-in-out all;
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px 2px;
  flex-direction: column;
  overflow: hidden;
  text-transform: capitalize;
  white-space: wrap;
`;



const Title = styled.a`
  color: ${Theme.primaryText};
  display: inline-block;
  font-family: canada-type-gibson;
  text-rendering: optimizeLegibility;
  font-style: normal;
  align-self: center;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const SubTitle = styled.span`
font-family: canada-type-gibson;
text-rendering: optimizeLegibility;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: ${Theme.primaryText};
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ReferralLink = styled.a`
  font-family: inherit;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  margin-top: 10px;
  color: ${Theme.primaryText};
  text-decoration: none;
  display: flex;
  align-self: flex-start;
  opacity: 0.8;
  cursor: pointer;
`;

const MainWrapper = styled.div`
margin-right: 28px;
margin-bottom: 10px;
box-sizing: border-box;
transition: transform .2s;
padding: 3px;
overflow: hidden;
border-radius: 6px;
box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
border: 1px solid rgba(229, 231, 235, .5);
cursor: pointer;

&:hover{
  transform: scale(1.05);
}

  &:hover ${ReferralLink} {
    opacity: 1;
}
  }
  @media (max-width: 480px) {
    width: 90vw;
  }
`;

export default RecommendtionCard;
