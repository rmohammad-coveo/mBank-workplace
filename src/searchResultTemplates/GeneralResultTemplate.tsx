import React, {
  useContext,
} from "react";
import { ListItem, Box, Typography } from "@mui/material";
import {
  Result,
  buildInteractiveResult,
  SearchEngine,
} from "@coveo/headless";
import EngineContext from "../common/engineContext";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Theme } from "../theme";
import { FileTypeIconsConfig } from "../config/SearchConfig";
import {eye} from 'react-icons-kit/feather/eye'
import Icon from "react-icons-kit";
import { QuickViewModalContext } from "../Components/SearchPage/QuickViewModalContext";
import pdfIcon from "../assets/FileTypeIcons/pdf.png";

type Template = (result: Result) => React.ReactNode;

export function filterProtocol(uri: string) {
  // Filters out dangerous URIs that can create XSS attacks such as `javascript:`.
  const isAbsolute = /^(https?|ftp|file|mailto|tel):/i.test(uri);
  const isRelative = /^(\/|\.\/|\.\.\/)/.test(uri);

  return isAbsolute || isRelative ? uri : "";
}

interface FieldValueInterface {
  value: string;
  caption: string;
}

function ListItemLink(
  engine: SearchEngine,
  result: Result,
  source?: string,
  QuickViewOnClick? : boolean,
  setResult?: (x: Result) => void
) {
  const interactiveResult = buildInteractiveResult(engine, {
    options: { result },
  });
  return (
    <>
      {source === "Salesforce KB" ? (
        <Link
          to={`/salesforcekb/${result.raw.sfid}`}
          onClick={() => {
            
            if (setResult) {
              setResult(result);
            }
            interactiveResult.select();
          }}
          onContextMenu={() => interactiveResult.select()}
          onMouseDown={() => interactiveResult.select()}
          onMouseUp={() => interactiveResult.select()}
          onTouchStart={() => interactiveResult.beginDelayedSelect()}
          onTouchEnd={() => interactiveResult.cancelPendingSelect()}
        >
          {result.title}
        </Link>
      ) : (
        <a
          href={filterProtocol(result.clickUri)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => interactiveResult.select()}
          onContextMenu={() => interactiveResult.select()}
          onMouseDown={() => interactiveResult.select()}
          onMouseUp={() => interactiveResult.select()}
          onTouchStart={() => interactiveResult.beginDelayedSelect()}
          onTouchEnd={() => interactiveResult.cancelPendingSelect()}
        >
          {result.title}
        </a>
      )}
    </>
  );
}

function FieldValue(props: FieldValueInterface) {
  return (
      <Box mr={2}>
      {" "}
      <Typography
        color="textSecondary"
        style={{ fontWeight: "bold" }}
        variant="caption"
      >
        {props.caption}:&nbsp;
      </Typography>
      <Typography color="textSecondary" variant="caption">
        {props.value}
      </Typography>
    
    </Box>
  );
}

const GeneralResultTemplate: React.FC<{ result: Result,imageField: string; QuickViewOnClick : boolean, FieldValues? : FieldValueInterface[] }> = ({ result,imageField, QuickViewOnClick = false, FieldValues =[] }) => {
  const engine = useContext(EngineContext)!;
  const {setOpenModal, setResult} = useContext(QuickViewModalContext)!;
  const filetype: any = result.raw.sysfiletype;
  const date = new Date(Number(result.raw.date));
  
  const isFileTypeIconIndex = () => {
    if (Object.keys(FileTypeIconsConfig).indexOf(filetype) > 0) {
      return Object.keys(FileTypeIconsConfig).indexOf(filetype);
    }
    return 0;
  };


  const highlightedExcerpt = (result :  Result)=>{
    let highlightedString = result.excerpt;
    let adjustmentoffset = 0;
    result.excerptHighlights.forEach((item)=>{
    highlightedString =  highlightedString.slice(0,item.offset + adjustmentoffset) + "<b>" + highlightedString.slice(item.offset + adjustmentoffset,item.offset + adjustmentoffset + item.length) + "</b>" + highlightedString.slice(item.offset + adjustmentoffset + item.length);
    adjustmentoffset = adjustmentoffset + 7;
    })
    return highlightedString;

  }

const imag: any = result.raw.image

  return (
    <>
      <ListItem disableGutters key={result.uniqueId}>
        <Box my={1} width={'100%'} >
          <BadgeWrapper>
          {result.isRecommendation && (
            <RecommendationBadge>Recommended</RecommendationBadge>
          )}
          {result.isTopResult && (
            <RecommendationBadge>Featured</RecommendationBadge>
          )}
          </BadgeWrapper>
          <MainWrapper>
          {filetype in FileTypeIconsConfig && (
              <SourceTypeWrapper>
                <IconImage
                  src={
                    Object.values(FileTypeIconsConfig)[isFileTypeIconIndex()]
                  }
                  alt={`${filetype} icon`}
                />
              </SourceTypeWrapper>
            )}
            <TextWrapper>
              <TitltAndDateWrapper>
                <Title>{ListItemLink(engine, result, "",QuickViewOnClick)}</Title>
                <DateContainer>
                {QuickViewOnClick &&
                <Icon icon = {eye} style = {{cursor : 'pointer', marginRight: '10px'}} onClick={()=>{
                  setResult(result);
                  setOpenModal(true);
                }}/>}
                {result.raw.date && (
                  <Excerpt>
                    {date.getDate() +
                      "/" +
                      (date.getMonth() + 1) +
                      "/" +
                      date.getFullYear()}
                  </Excerpt>
                )}
                </DateContainer>
              </TitltAndDateWrapper>
              {result.excerpt && (
                <Box pb={1}>
                  <Excerpt dangerouslySetInnerHTML={{ __html: highlightedExcerpt(result) }} />
                </Box>
              )}
              {FieldValues.length > 0 &&
              <AdditionalInfoFieldContainer>
                {FieldValues.map((item, index)=>{
                const temp: unknown = result.raw[`${item.value}`];
                const fieldValue: string = temp as string;
                      return <FieldValue caption = {item.caption} value = {fieldValue} key={index}/>
                })}
            </AdditionalInfoFieldContainer>
              }
            </TextWrapper>
            
          </MainWrapper>
          
        </Box>
      </ListItem>
      <div
        style={{
          width: "97%",
          height: "2px",
          background: "#E5E8E8",
        }}
      />
    </>
  );
};

export default GeneralResultTemplate;



const MainWrapper = styled.div`
width: 95%;
    display: flex;
    flex-direction: row;
    padding: 10px 0px;
`;

const SourceTypeWrapper = styled.div`
flex: 1;
display: flex;
align-items: center;
}
`;

const IconImage = styled.img`
width: 70px;
border-radius: 8px;
height: 50px;
`;

const TextWrapper = styled.div`
  flex: 8;
  min-height: 100px;
  display: flex;
  padding-left: 20px;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h2`
font-family: canada-type-gibson;
font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  width: 80%;
  margin-bottom: 10px;


  & a {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-weight: 400;
    text-decoration: none;
    color: ${Theme.resultLink};
  }

  & a:hover {
    text-decoration: underline;
  }
  @media (max-width: 480px) {
   font-size: 18px;
   & a {
    display: -webkit-box;
    -webkit-line-clamp: 2;
   }
}
`;

const Excerpt = styled.span`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 16px;
  font-family:canada-type-gibson;
  color: ${Theme.excerpt};
    line-height: 1.71429;
    font-weight: 400;
  @media (max-width: 480px) {
   font-size: 12px;
}

& b{
  font-weight: 400;
}
`;

const RecommendationBadge = styled.div`
  background:${Theme.primary};
  width: 100px;
  height: 30px;
  border-radius: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: ${Theme.navbar};
`;

const TitltAndDateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BadgeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 210px;
  justify-content: space-between;

`


const DateContainer = styled.div`
display: flex;
align-items: center;
width: 130px;

`


const AdditionalInfoFieldContainer = styled.div`
  display: flex;
`
