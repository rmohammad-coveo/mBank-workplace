import React from "react";
import { Theme } from "../../theme";
import styled from "styled-components";
import { chevronRight } from "react-icons-kit/feather/chevronRight";
import { Icon } from "react-icons-kit";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface RecommendationCardType {
  title: string;
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
  description,
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
        <SubTitle>{description}</SubTitle>
        <ReferralLink>
          oglądaj teraz
          <div style={{ marginLeft: "5px", color: Theme.primary }}>
            <Icon icon={chevronRight} />
          </div>
        </ReferralLink>
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
  width: 100%;
  object-fit: cover;
  transition: 0.2s ease-in-out all;
`;
const TextWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 230px;
  align-items: center;
  justify-content: space-around;
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
font-size: 16px;
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
  color: ${Theme.primaryText};
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ReferralLink = styled.a`
  font-family: inherit;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: ${Theme.primary};
  text-decoration: none;
  display: flex;
  align-self: flex-start;
  opacity: 0.8;
  cursor: pointer;
`;

const MainWrapper = styled.div`
width: calc(33.33% - 28px);
margin-right: 28px;
margin-bottom: 20px;
max-width: 37.5em;
min-width: 17.5em;
box-sizing: border-box;
transition: all .3s ease;
height: 370px;
width: 200px;
overflow: hidden;
box-shadow: 5px 5px #cccccc;
border: 1px solid #e5e8e8;
cursor: pointer;

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

export default RecommendtionCard;
