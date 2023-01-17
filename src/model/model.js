export const data = [
  {
    type: 'Taxi',
    offers:[
      {
        id: 1,
        title: 'Add luggage',
        price: 30
      },
      {
        id: 2,
        title: 'Switch to comfort class',
        price: 100
      },
      {
        id: 3,
        title: 'Add meal',
        price: 15
      }
    ]
  },
  {
    type: 'Bus',
    offers:[
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 2,
        title: 'Add luggage',
        price: 30
      },
      {
        id: 3,
        title: 'Add meal',
        price: 10
      }
    ]
  },
  {
    type: 'Train',
    offers:[
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 2,
        title: 'Add luggage',
        price: 30
      },
      {
        id: 3,
        title: 'Add meal',
        price: 10
      }
    ]
  },
  {
    type: 'Ship',
    offers:[
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 2,
        title: 'Add luggage',
        price: 30
      },
      {
        id: 3,
        title: 'Add meal',
        price: 10
      }
    ]
  },
  {
    type: 'Drive',
    offers:[
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 2,
        title: 'Add luggage',
        price: 30
      },
      {
        id: 3,
        title: 'Add meal',
        price: 10
      }
    ]
  },
  {
    type: 'flight',
    offers:[
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 2,
        title: 'Add luggage',
        price: 30
      },
      {
        id: 3,
        title: 'Add meal',
        price: 10
      }
    ]
  },
  {
    type: 'Check-in',
    offers:[
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 2,
        title: 'Add luggage',
        price: 30
      },
      {
        id: 3,
        title: 'Add meal',
        price: 10
      }
    ]
  },
  {
    type: 'Sightseeing',
    offers:[
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 2,
        title: 'Add luggage',
        price: 30
      },
      {
        id: 3,
        title: 'Add meal',
        price: 10
      }
    ]
  },
  {
    type: 'Restaurant',
    offers:[
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 2,
        title: 'Add luggage',
        price: 30
      },
      {
        id: 3,
        title: 'Add meal',
        price: 10
      }
    ]
  },
];
export const destinations = [
  {
    id: 1,
    description: 'Order Uber +€  ',
    name: 'Chamonix',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'forest'
      }
    ]
  },
  {
    id: 2,
    description: 'Add luggage +€  50 Switch to comfort +€  ',
    name: 'Geneva',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163318',
        description: 'Hedgehog',
      }
    ]
  },
  {
    id: 3,
    description: 'Offers: Rent a car +€  ',
    name: 'Chamonix',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163319',
        description: 'mountain'
      }
    ]
  }
];
export const mockPoints = [
  {
    id: 1,
    type: 'bus',
    offers: [1, 2],
    destination: 2,
    basePrice: 500,
    dateFrom: '2019-07-18T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z'
  },
  {
    id: 2,
    type: 'train',
    offers: [1, 2],
    destination: 1,
    basePrice: 200,
    dateFrom: '2019-07-18T22:56:56.845Z',
    dateTo: '2019-07-11T11:22:14.375Z'
  },
  {
    id: 3,
    type: 'ship',
    offers: [],
    destination: 1,
    basePrice: 300,
    dateFrom: '2019-07-18T22:54:56.845Z',
    dateTo: '2019-07-11T11:22:08.375Z'
  },
  {
    id: 4,
    type: 'drive',
    offers: [1, 2],
    destination: 2,
    basePrice: 100,
    dateFrom: '2019-07-18T12:55:56.845Z',
    dateTo: '2019-07-11T11:15:13.375Z'
  },
  {
    id: 5,
    type: 'flight',
    offers: [],
    destination: 3,
    basePrice: 50,
    dateFrom: '2019-07-19T13:13:56.845Z',
    dateTo: '2019-07-11T11:15:13.375Z'
  },
  {
    id: 6,
    type: 'check-in',
    offers: [1,2],
    destination: 1,
    basePrice: 150,
    dateFrom: '2019-07-19T18:34:56.845Z',
    dateTo: '2019-07-11T11:10:13.375Z'
  },
  {
    id: 7,
    type: 'sightseeing',
    offers: [1, 2, 3],
    destination: 3,
    basePrice: 200,
    dateFrom: '2019-07-19T19:06:56.845Z',
    dateTo: '2019-07-11T11:12:12.375Z'
  },
  {
    id: 8,
    type: 'restaurant',
    offers: [1],
    destination: 2,
    basePrice: 120,
    dateFrom: '2019-07-20T11:11:56.845Z',
    dateTo: '2019-07-11T14:13:13.375Z'
  },
  {
    id: 9,
    type: 'taxi',
    offers: [1, 2, 3],
    destination: 1,
    basePrice: 300,
    dateFrom: '2019-07-20T19:10:56.845Z',
    dateTo: '2019-07-11T11:20:00.375Z'
  }
];
