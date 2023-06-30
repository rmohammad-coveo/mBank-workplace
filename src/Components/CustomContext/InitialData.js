/* 
Before you edit:

When editing the 'InitialData', make sure to delete keys 'profile_selected' and 'context_data' in your localStorage to see the changes. 

To access localStorage:

Developer tools > Application > Storage > LocalStorage

*/
import SharePoint from '../../assets/sharePoint_logo.png'

// DONOT CHANGE
export const KEY_NAME_PROFILE_SELECTED = 'profile_selected_v2';
export const KEY_NAME_CONTEXT_DATA = 'context_data_v2'


export const InitialData = [
  // {
  //   name: "Anonymous",
  //   profile: "https://icon-library.com/images/anonymous-user-icon/anonymous-user-icon-2.jpg",
  //   context: [],
  // },
  {
    name: "Regina Hall",
    email : "regina.hall@coveo.com",
    role: 'kierownik operacyjny',
    department:'HR',
    location:'London, UK',
    years_of_service: '6',
    profile: "https://ntvb.tmsimg.com/assets/assets/167728_v3_bb.jpg",
    people_worked_with:['Sarah Young', 'HR Specialist', 'HR', "https://www.famousbirthdays.com/faces/rafferty-sarah-image.jpg"],
    tasks: ["Zacznij szkolenie", "Zorganizuj spotkanie ze swoim zespołem"],
    files:['Plan Benefits Open Enrollment', 'Documents', 'Dec 16 2022', SharePoint],
    context: [
      {
        active: true,
        keyName: "solution",
        keyValue: "commerce",
        customQRF: false,
      }
    ],
  },
  {
    name: "Jesse Eisenberg",
    email : "jeisenberg@coveo.com",
    role: 'programista',
    department:'R&D',
    location:'Montreal, CA',
    years_of_service: '2',
    profile:
      "https://www.themoviedb.org/t/p/w500/yYhwWRcxDHTn63gSEF1vnDAD7cD.jpg",
    people_worked_with:['Dule Hill', 'Director','Engineering', "https://vz.cnwimg.com/wp-content/uploads/2011/07/Dule-Hill-e1567471440831.jpg"],
    tasks: ["Skontaktuj się z zespołem ds. kadr", "Skontaktuj się z Antoine"],
    files:['Free Food and other Culinary Perks at Coveo', 'Documents','Nov 23 2021', SharePoint],
    context: [
      {
        active: true,
        keyName: "solution",
        keyValue: "service",
        customQRF: false,
      }
    ],
  },
];



