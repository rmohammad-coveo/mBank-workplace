import GeneralResultTemplate from "../searchResultTemplates/GeneralResultTemplate";
import pdfIcon from "../assets/FileTypeIcons/pdf.svg";
import htmlIcon from "../assets/FileTypeIcons/html.svg";
import docIcon from "../assets/FileTypeIcons/doc.svg";
import pptIcon from "../assets/FileTypeIcons/ppt.svg";
import pubIcon from "../assets/FileTypeIcons/pub.svg";
import sfIcon from "../assets/FileTypeIcons/sf.svg";
import { ResultTemplatesHelpers } from "@coveo/headless";
import PeopleResultTemplate from "../searchResultTemplates/PeopleResultTemplate";
import VideoResultTemplate from "../searchResultTemplates/VideoResultTemplate";
import { Result } from "@coveo/headless";
import { DefaultSideBarRecommendationConfigType, SearchPageTabConfigType } from "./Types/ConfigTypes";
import CustomPeopleResultTemplate from "../searchResultTemplates/CustomPeopleResultTemplate";
import SharePoint from '../assets/sharePoint_logo.png';
import SalesforceDoc from '../assets/salesforce-doctype-html.svg';
import Text from '../assets/txt.png';
import FB from '../assets/facebook.png';


/* 
FacetConfig is used to initialize all the facet when the webpage loads up, 
You can later set which facet to show in each Tab
*/

export const FacetConfig = [
  {
    field: "source",
    title: "źródło",
  },
  {
    field: "author",
    title: "Twórca",
  },
  {
    field: "filetype",
    title: "File Type",
  },
  {
    field: "concepts",
    title: "Popular Topics",
  },
  {
    field: "profile_sectors",
    title: "Sectors",
  },
  {
    field: "profile_services",
    title: "Services",
  },
  {
    field :"adspecial",
    title : "Speciality"
  },{
    field :"adminimums",
    title : "Minimums"
  },{
    field :"adstate",
    title : "State"
  },{
    field :"adcity",
    title : "City"
  },{
    title: "More Info",
    field : "mynav4b"
  }
] as const;


/* 
ResultTemplateConfig helps you select which result template to show on which condition. At moment there are 3 genertic result template:
1. GeneralResultTemplate
2. PeopleResultTemplate
3. VideoResultTemplate

You can create custom one using the searchResultTemplates/GeneralResultTemplate.tsx as template. 
*/

export const ResultTemplateConfig = [
  {
    conditions: [],
    content: (result: Result) => 
    <GeneralResultTemplate 
      result={result} 
      imageField={"image"}
      QuickViewOnClick = {true} 
      FieldValues = {[{caption: 'source type', value : 'sysfiletype'},{caption: 'source', value : 'source'}]} 
    />,
    priority: 1,
  },
  {
    conditions: [ResultTemplatesHelpers.fieldMustMatch("source", ["Advisor"])],
    content: (result: Result) => (
      <CustomPeopleResultTemplate result={result} imageField={"image"} />
    ),
    priority: 2,
  },
  {
    conditions: [
      ResultTemplatesHelpers.fieldMustMatch("filetype", ["youtubevideo"]),
    ],
    content: (result: Result) => (
      <VideoResultTemplate result={result} imageField={"ytthumbnailurl"} />
    ),
    priority: 2,
  },
];



/* 
FileTypeIconsConfig helps you add file type icons in the GeneralResultTemplate.
The key should be the field raw.sysfiletype e.g html,pdf,doc etc

You can add more images to the assets/FileTypeIcons folder. Make sure to import the in the top of this file using the following statement.

    import newIconName from "../assets/FileTypeIcons/newIconName.png";

*/

export const FileTypeIconsConfig  = {
  pdf: pdfIcon,
  html: htmlIcon,
  txt: Text,
  PostFB: FB,
  CommentFB: FB,
  epub: pubIcon,
  doc : docIcon,
  SalesforceItem : SalesforceDoc,
  sharepointonlinelistitem: SharePoint
};





/* 
FieldToIncludesInSearchResults helps you add more fields to the result templates. 
When setting imageField in this file, make sure the field is included in the FieldToIncludesInSearchResults array. 

The fields 'date', 'ytthumbnailurl', 'sysfiletype' should NOT be removed. 
*/

export const FieldToIncludesInSearchResults : string[] = [
  "sfanswer__c",
  "sfid",
  "sysfiletype", 
  "date",
  "adimage",
  "ytthumbnailurl",
  "sfimage__c",
  "sfimage_url__c",
  'adspecial',
  'image',
  'icon'
];





/* 
SearchPageTabConfig helps you configure the Tabs. Each object represent a new Tab.

 - caption -> Name of the Tab
 - expression -> query expression to show in the Tab
 - isActive -> To be active initially when search page loads up
 - sideBarRecommendationConfig -> Can add multiple recommendation in the side bar
 - facetToInclude -> facets to show on a particular Tab


You can leave the Array empty if you don't want any tabs

*/

const polishCondition = `@language==Polish`;

export const SearchPageTabConfig : SearchPageTabConfigType[] = [
  {
    caption: "wszystko",
    expression: "" + polishCondition,
    isActive: true,
    sideBarRecommendationConfig: [
      {
        pipeline: "youtube",
        searchHub : 'default',
        NumberofResults: 3,
        title: "Related Videos",
        videoRecommendation: true,
        imageField: 'ytthumbnailurl',
      }
    ],
    facetToInclude: ["source","author", "concepts",],
  },
  {
    caption: "KNF",
    expression: `@source==KNF AND` + polishCondition,
    isActive: false,
    sideBarRecommendationConfig: [
      {
        pipeline: "youtube",
        searchHub : 'default',
        NumberofResults: 6,
        title: "Related for Investing",
        imageField : 'ytthumbnailurl',
        videoRecommendation: false,
      },
    ],
    facetToInclude: ["author", "concepts"],
  },
  /* {
    caption: "HR",
    expression: `@sourcetype==("Sitemap")`,
    isActive: false,
    facetToInclude: ["concepts"],
  }, */
  {
    caption: "Gazeta",
    expression: `@source==Gazeta AND` + polishCondition,
    isActive: false,
    facetToInclude: ["concepts"],
  },
  {
    caption: "SharePoint",
    expression: `@source==Sharepoint`,
    isActive: false,
    facetToInclude: ["concepts"],
  },
  {
    caption: "Facebook Workplace",
    expression: `@source==("Facebook Workplace", "Facebook Workplace Posts")`,
    isActive: false,
    facetToInclude: ["concepts"],
  },
/*   {
    caption: "Coveo Web",
    expression: `@source==("Sitemap")`,
    isActive: false,
    facetToInclude: ["concepts"],
  }, */
  {
    caption: "Youtube",
    expression: `@filetype=="youtubevideo" AND` + polishCondition,
    isActive: false,
    facetToInclude: ["concepts"],
  },
];



/* 
DefaultSideBarRecommendationConfig is used if you want to show same sideBar recommendation on each tab.
*/

export const DefaultSideBarRecommendationConfig: DefaultSideBarRecommendationConfigType[] =
  []; /* [{
  pipeline: "IRS test",
  NumberofResults: 5,
  title: "Related for Investing",
  videoRecommendation: true,
  imageField: 'ytthumbnailurl'
}] */

export const ResultsPerPagesConfig = [10, 25, 50];
