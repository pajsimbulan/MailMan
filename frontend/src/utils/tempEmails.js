const data0 = {
  _id: '63ba4964742a1ea687c54c43',
  from: 'drake@mailman.com',
  to: 'kanye@mailman.com',
  subject: 'About that collab...',
  contents: 'Hey Kanye,\nWhat do you think about working on a track together?\n',
  createdAt: '2023-01-08T04:41:08.635+00:00',
  __v: { $numberInt: '0' },
};

const data1 = {
  _id: '63ba4964742a1ea687c54c46',
  from: 'tswiftie1989@mailman.com',
  to: 'queenbey@mailman.com',
  subject: 'Squad goals!',
  contents: "Hey Beyoncé,\nLet's have a girls' night out soon with the squad!\n",
  createdAt: '2023-01-11T19:23:08.635+00:00',
  __v: { $numberInt: '0' },
};

const data2 = {
  _id: '63ba4964742a1ea687c54c47',
  from: 'spidermanholland@mailman.com',
  to: 'ironmanstark@mailman.com',
  subject: 'Suit upgrade?',
  contents: 'Hey Mr. Stark,\nCan we talk about some upgrades for my suit?\n',
  createdAt: '2023-01-12T14:15:08.635+00:00',
  __v: { $numberInt: '0' },
};

const data3 = {
  _id: '63ba4964742a1ea687c54c48',
  from: 'captainjack@mailman.com',
  to: 'orlandobloom@mailman.com',
  subject: "Where's my rum?",
  contents: 'Orlando,\nDid you take my bottle of rum again? \n',
  createdAt: '2023-01-13T09:32:08.635+00:00',
  __v: { $numberInt: '0' },
};
const data4 = {
  _id: '63ba4964742a1ea687c54c49',
  from: 'theellenshow@mailman.com',
  to: 'mrbean@mailman.com',
  subject: 'Dance-off invitation!',
  contents: 'Hey Mr. Bean,\nHow about a dance-off on my show next week?\n',
  createdAt: '2023-01-14T05:20:08.635+00:00',
  __v: { $numberInt: '0' },
};

const data5 = {
  _id: '63ba4964742a1ea687c54c50',
  from: 'theRockCooking@mailman.com',
  to: 'gordonramsay@mailman.com',
  subject: 'Cook-off challenge!',
  contents: "Hey Gordon,\nI challenge you to a cook-off, let's see who the real chef is!\n",
  createdAt: '2023-01-15T08:45:08.635+00:00',
  __v: { $numberInt: '0' },
};

const data6 = {
  _id: '63ba4964742a1ea687c54c51',
  from: 'cardiBrrr@mailman.com',
  to: 'nickiMinajesty@mailman.com',
  subject: 'Fashion collab?',
  contents: "Hey Nicki,\nLet's do a fashion collab, it's gonna be lit!\n",
  createdAt: '2023-01-16T10:30:08.635+00:00',
  __v: { $numberInt: '0' },
};

const data7 = {
  _id: '63ba4964742a1ea687c54c43',
  from: 'john@mailman.com',
  to: 'jane@mailman.com',
  subject: 'Hello from John!',
  contents: "Dear Jane,\nI hope you're having a great day!\n",
  createdAt: '2023-01-08T04:41:08.635+00:00',
  __v: { $numberInt: '0' },
};

const data8 = {
  _id: '63ba4964742a1ea687c54c44',
  from: 'alice@mailman.com',
  to: 'bob@mailman.com',
  subject: 'Meeting tomorrow',
  contents: "Dear Bob,\nDon't forget our meeting tomorrow at 10 AM.\n",
  createdAt: '2023-01-09T10:41:08.635+00:00',
  __v: { $numberInt: '0' },
};

const data9 = {
  _id: '63ba4964742a1ea687c54c52',
  from: 'jimmyfallonfun@mailman.com',
  to: 'conanobrien@mailman.com',
  subject: 'Late-night host party!',
  contents: "Hey Conan,\nLet's have a late-night host get-together this weekend!\n",
  createdAt: '2023-01-17T16:20:08.635+00:00',
  __v: { $numberInt: '0' },
};

const data10 = {
  _id: '63ba4964742a1ea687c54c53',
  from: 'adelehello@mailman.com',
  to: 'samsmithsings@mailman.com',
  subject: 'Duet proposal',
  contents: 'Hi Sam,\nWhat do you think about recording a heart-wrenching duet together?\n',
  createdAt: '2023-01-18T12:25:08.635+00:00',
  __v: { $numberInt: '0' },
};

const data11 = {
  _id: '63ba4964742a1ea687c54c54',
  from: 'oprahwinfreyshow@mailman.com',
  to: 'ellen@mailman.com',
  subject: 'TV show host reunion',
  contents: "Dear Ellen,\nLet's plan a reunion for TV show hosts. It's been a while!\n",
  createdAt: '2023-01-19T15:30:08.635+00:00',
  __v: { $numberInt: '0' },
};

export const tempEmails = [data0, data1, data2, data3, data4];
tempEmails.push([...tempEmails, data5, data6, data7, data8, data9, data10, data11]);

export default tempEmails;
