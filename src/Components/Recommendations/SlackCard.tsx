import React from "react";
import { Theme } from "../../theme";
import styled from "styled-components";
import { chevronRight } from "react-icons-kit/feather/chevronRight";
import { Icon } from "react-icons-kit";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface RecommendationCardType {
  title: string;
  handler: string;
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

const SlackCard: React.FC<RecommendationCardType> = ({
  title,
  handler,
  date,
  image,
  video = true,
  clickUri,
  onClick,
  onContextMenu,
  onMouseDown,
  onMouseUp,
  source = "",
}) => {
  
  const newdate = new Date(Number(date));

  return (
    <MainWrapper
      key={title}
      onClick={() => {
        onClick();
        window.open(clickUri, "_blank", "noopener,noreferrer");
      }}
      onContextMenu={onContextMenu}
      /* onMouseDown = {onMouseDown}
        onMouseUp = {onMouseUp} */
    >
      <ImageContainer>
        <Image src={image} />
      </ImageContainer>
      <TextWrapper>
        <Title>{title}</Title>
        <SubTitle>@{handler}</SubTitle>
      </TextWrapper>
    </MainWrapper>
  );
};

export const SkeletonRecommendationCard: React.FC = () => {
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

`;

const Image = styled.img`
border-radius: 50%;
object-fit: contain;
object-position: center center;
height: 50px;
width: 50px;
filter: drop-shadow(0 0 1px #242424);
margin-left: 15px;
transition: 0.2s ease-in-out all;
`;
const TextWrapper = styled.div`
  display: flex;
  padding: 10px 20px;
  flex-direction: column;
`;

const Title = styled.a`
  color: ${Theme.primaryText};
  font-family: canada-type-gibson;
  text-rendering: optimizeLegibility;
  font-style: normal;
  align-self: flex-start;
  font-weight: 600;
  font-size: 18px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const SubTitle = styled.span`
font-family: canada-type-gibson;
text-rendering: optimizeLegibility;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: ${Theme.secondaryText};
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-left: 8px;
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
display: flex;
align-items: center;
width: 400px;
margin-right: 28px;
margin-bottom: 20px;
box-sizing: border-box;
transition: transform .2s;
padding: 16px;
overflow: hidden;
box-shadow: 5px 5px #cccccc;
border: 1px solid #e5e8e8;
cursor: pointer;
transition: all 300ms ease;

&:hover {
  border-color: #ae0000;
  box-shadow: 0 0 0 #cccccc;
  filter: brightness(0.9);
}

  &:hover ${ReferralLink} {
    opacity: 1;
}
  }
  @media (max-width: 480px) {
    width: 90vw;
  }
`;

export default SlackCard;
