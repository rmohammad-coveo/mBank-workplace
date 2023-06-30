import HeroImage from '../assets/Hero.jpg'
import { RecommendationType } from './Types/ConfigTypes';
import Home from '../assets/home.png';
import Search from '../assets/search.png';
import Chat from '../assets/chat.png';
import Sun from '../assets/sun.png';
import Concur from '../assets/concur_logo.png';
import Confluence from '../assets/confluence_logo.png';
import Slack from '../assets/slack.png';
import Workday from '../assets/workday_logo.png';
import JIRA from '../assets/jira_logo.png';


export const NavBarConfig = [
  {
    title: "Personal",
    redirectTo: "/home",
  },
  {
    title: "Business",
    redirectTo: "/",
  },
  {
    title: "Commerical",
    redirectTo: "/",
  },
  {
    title: "About",
    redirectTo: "/",
  },
];


export const HeaderConfig = [
    {
        title: "Dashboard",
        redirectTo: "/home",
        image: Home,
      },
      {
        title: "Search",
        redirectTo: "/search",
        image: Search,
      },
      {
        title: "Conversations",
        redirectTo: "/search/Facebook",
        image: Chat,
      }
]



export const HeroConfig = {
    title  : 'Good ',
    time : new Date(),
    subtitle:'Twoje dzisiejsze zadania',
    description : '',
    background : Sun,
    buttonText : 'Explore here',
    onClickButtonRedirect : '/search',  
}

export const ToolsConfig = [
  {
  title  : 'Concur',
  desc : 'Expenses reports',
  image: Concur, 
  },
  {
    title  : 'Slack',
    desc : 'Official Chat platform',
    image:Slack, 
  },
  {
    title  : 'Confluence',
    desc : 'Internal documentation',
    image: Confluence, 
  },
  {
    title  : 'Workday',
    desc : 'Finance, HR, and planning',
    image: Workday, 
  },
  {
    title  : 'JIRA',
    desc : 'Agile Project Management',
    image: JIRA, 
  }
]


export const HeroHomeConfig : RecommendationType= {

  title : 'Twoje dzisiejsze zadania',
  concept: 'concepts',
  description : "",
  date: 'date',
  numberOfResults:5,
  imageField : 'icon',
  pipeline : 'Task Mgt',
  searchHub: 'default',
  id : 'Recommendation'
}

export const MainRecommendationConfig : RecommendationType= {
  title : 'Informacje które mogą cię zainteresować',
  concept: 'concepts',
  description : "",
  date: 'date',
  numberOfResults:6,
  imageField : 'icon',
  pipeline : 'workplace_rec_content',
  searchHub: 'default',
  id : 'Recommendation'
}

export const SlackConfig : RecommendationType= {

  title : 'Twój Slack',
  concept: 'concepts',
  description : "",
  date: 'date',
  numberOfResults:6,
  imageField : 'slackuseravatarurl',
  pipeline : 'slack_content',
  searchHub: 'default',
  id : 'Recommendation'
}

export const VideoRecommendationConfig : RecommendationType  = {

  title : 'Polecane filmy',
  description : "Here are your personalized recommendations",
  numberOfResults: 3,
  imageField : 'ytthumbnailurl',
  pipeline : 'Video Rec Sidebar',
  searchHub: 'default',
  id : 'Recommendation'
}


export const EnableAuthentication = false;