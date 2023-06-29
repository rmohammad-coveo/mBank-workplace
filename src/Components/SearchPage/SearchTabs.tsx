import React, { useEffect, useContext } from "react";
import { buildTab, Tab } from "@coveo/headless";
import EngineContext from "../../common/engineContext";
import styled from "styled-components";
import { Theme } from "../../theme";
import { useNavigate } from "react-router-dom";
import { SearchPageTabConfig } from "../../config/SearchConfig";
import { SearchPageTabConfigType } from "../../config/Types/ConfigTypes";


const isRouteMatching  = (param : string, caption : string) => {
  if (!param && caption === SearchPageTabConfig[0].caption) {
    return true;
  }
  return (
    (param && caption.replace(/\s/g, "").toLowerCase() === param.toLowerCase())? true : false
  );
};


interface SearchTabType {
  item : SearchPageTabConfigType,
  controller : Tab,
  selected : boolean 
}


export const SearchTab: React.FC<SearchTabType> = ({ controller, item, selected }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (selected) {
      controller.select();
    }
  }, []);

  return (
    <TabTitle
      key={item.caption}
      onClick={() => {
        navigate(`/search/${item.caption.replace(/\s/g, "")}`);
        if (!selected) {
          controller.select();
        }
      }}
      isActive={selected}
    >
      {item.caption}
    </TabTitle>
  );
};


interface SearchTabsType {
  filterSelected : string
}

const SearchTabs : React.FC<SearchTabsType> = ({ filterSelected }) => {
  const engine = useContext(EngineContext)!;

  return (
    <Wrapper>
      {SearchPageTabConfig.map((item) => {
        const controller = buildTab(engine, {
          options: {
            id: item.caption,
            expression: item.expression,
          },
        });

        return (
          <React.Fragment key = {item.caption}>
          <SearchTab
            item={item}
            controller={controller}
            selected={isRouteMatching(filterSelected, item.caption)}
          ></SearchTab>
          </React.Fragment>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-weight: 300;
  flex-wrap: wrap;
  margin-left: 64px;
`;

const TabTitle = styled.a<{isActive : boolean }>`
  margin: 0 8px;
  padding: 15px 0;
  font-size: ${(props) => (props.isActive ? 16 : 15)}px;
  text-align: center;
  color: black;
  font-weight: ${(props) => (props.isActive ? 'bold' : 300)};
  text-transform: uppercase;
  cursor: pointer;
  font-family: inherit;
  opacity: ${(props) => (props.isActive ? 1 : 0.8)};
  transition: 0.2s ease-in-out all;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    height: 3px;
    bottom: 10px;
    ${(props) => (!props.isActive 
      ? 
      'width: 0; left: 50%;'
      :
      'width: 100%; left: 0;' 
      )}
    z-index: 3;
    background: #ae0000;
    transition: all 0.2s ease;
  }
  &:hover::after {
    width: 100%;
    left: 0;
  }
`;

export default SearchTabs;
