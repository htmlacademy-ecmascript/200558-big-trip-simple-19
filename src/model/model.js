function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function getRandomType() {
  let array = ['taxi','bus','train','ship','drive','flight','sightseeing','restaurant'];
  return array[getRandom(0, array.length - 1)];
}
function getRandomPrice() {
  return getRandom(1,1000);
}
let fromHour,
    fromMin,
    toHour,
    toMin,
    fromDay,
    toDay;
function  numberFormat(number) {
  if(number < 10) {
      return '0' + number;
  } else {
    return number;
  }
}
function getRandomDateFrom() {
  fromDay = getRandom(1,31);
  fromHour = getRandom(10,15);
  fromMin = getRandom(0,60);
  let date;
  let stringDay = numberFormat(fromDay),
      stringHour = numberFormat(fromHour),
      stringMin = numberFormat(fromMin);
  return `2019-07-${stringDay}T${stringHour}:${stringMin}:56.845Z`;
}
function getRandomDateFromTo() {
  //((((fromDay * 24 + fromHour) * 60 + fromMin)*60) + getRandom(1000000, 10000000))
  toHour = fromHour + getRandom(1,10);
  toMin = fromMin + getRandom(5,60);
  toDay = fromDay + getRandom(1,2);
  console.log('toMin=',toMin);
  console.log('toHour=',toHour);
  let date = new Date(2023,3,toDay,toHour,toMin);
  console.log('date=',date);
  toDay = date.getDate();
  console.log('date.getDate()=',date.getDate());
  console.log('toDay=',toDay);
  toHour = date.getHours(); 
  toMin = date.getMinutes();
  console.log('toMin=',toMin);
  toDay = numberFormat(toDay);
  toHour = numberFormat(toHour);
  toMin = numberFormat(toMin);
  //console.log(`2019-07-${toDay}T${toHour}:${toMin}:56.845Z`);

  return `2019-07-${toDay}T${toHour}:${toMin}:56.845Z`;
}
export const data = [
  {
    type: getRandomType(),
    offers:[
      {
        id: 1,
        title: 'Add luggage 1.1',
        price: getRandomPrice()
      },
      {
        id: 2,
        title: 'Switch to comfort class 1.2',
        price: getRandomPrice()
      },
      {
        id: 3,
        title: 'Add meal 1.3',
        price: getRandomPrice()
      }
    ]
  },
  {
    type: getRandomType(),
    offers:[
      {
        id: 1,
        title: 'Upgrade to a business class 2.1',
        price: getRandomPrice()
      },
      {
        id: 2,
        title: 'Add luggage 2.2',
        price: getRandomPrice()
      },
      {
        id: 3,
        title: 'Add meal 2.3',
        price: getRandomPrice()
      },
      {
        id: 4,
        title: 'Add meal 2.4',
        price: getRandomPrice()
      }

    ]
  },
  {
    type: getRandomType(),
    offers:[
      {
        id: 1,
        title: 'Upgrade to a business class 3.1',
        price: getRandomPrice()
      },
      {
        id: 2,
        title: 'Add luggage 3.2',
        price: getRandomPrice()
      },
      {
        id: 3,
        title: 'Add meal 3.3',
        price: getRandomPrice()
      },
      {
        id: 3,
        title: 'Add meal 3.4',
        price: getRandomPrice()
      }
    ]
  },
  {
    type: getRandomType(),
    offers:[
      {
        id: 1,
        title: 'Upgrade to a business class 4.1',
        price: getRandomPrice()
      },
      {
        id: 2,
        title: 'Add luggage 4.2',
        price: getRandomPrice()
      },
      {
        id: 3,
        title: 'Add meal 4.3',
        price: getRandomPrice()
      },
      {
        id: 3,
        title: 'Add meal 4.4',
        price: getRandomPrice()
      }
    ]
  },
  {
    type: getRandomType(),
    offers:[
      {
        id: 1,
        title: 'Upgrade to a business class 5.1',
        price: getRandomPrice()
      },
      {
        id: 2,
        title: 'Add luggage 5.2',
        price: getRandomPrice()
      },
    ]
  },
  {
    type: getRandomType(),
    offers:[
      {
        id: 1,
        title: 'Upgrade to a business class 6.1',
        price: getRandomPrice()
      },
    ]
  },
  {
    type: getRandomType(),
    offers:[
      {
        id: 1,
        title: 'Upgrade to a business class 6.2',
        price: getRandomPrice()
      },
    ]
  },
  {
    type: getRandomType(),
    offers:[
      {
        id: 1,
        title: 'Upgrade to a business class 7.1',
        price: getRandomPrice()
      },
      {
        id: 2,
        title: 'Add luggage 7.2',
        price: getRandomPrice()
      },
      {
        id: 3,
        title: 'Add meal 7.3',
        price: getRandomPrice()
      }
    ]
  },
  {
    type: getRandomType(),
    offers:[
      {
        id: 1,
        title: 'Upgrade to a business class 8.1',
        price: getRandomPrice()
      },
      {
        id: 2,
        title: 'Add luggage 8.2',
        price: getRandomPrice()
      },
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
    type: getRandomType(),
    offers: [0, 1],
    destination: 2,
    basePrice: getRandomPrice(),
    dateFrom: getRandomDateFrom(),
    dateTo: getRandomDateFromTo(),
  },
  {
    id: 2,
    type: getRandomType(),
    offers: [1, 2],
    destination: 1,
    basePrice: getRandomPrice(),
    dateFrom: getRandomDateFrom(),
    dateTo: getRandomDateFromTo()
  },
  {
    id: 3,
    type: getRandomType(),
    offers: [0,2,3],
    destination: 1,
    basePrice: getRandomPrice(),
    dateFrom: getRandomDateFrom(),
    dateTo: getRandomDateFromTo()
  },
  {
    id: 4,
    type: getRandomType(),
    offers: [0, 3],
    destination: 2,
    basePrice: getRandomPrice(),
    dateFrom: getRandomDateFrom(),
    dateTo: getRandomDateFromTo()
  },
  {
    id: 5,
    type: getRandomType(),
    offers: [0,1],
    destination: 3,
    basePrice: getRandomPrice(),
    dateFrom: getRandomDateFrom(),
    dateTo: getRandomDateFromTo()
  },
  {
    id: 6,
    type: getRandomType(),
    offers: [1],
    destination: 1,
    basePrice: getRandomPrice(),
    dateFrom: getRandomDateFrom(),
    dateTo: getRandomDateFromTo()
  },
  {
    id: 7,
    type: getRandomType(),
    offers: [],
    destination: 3,
    basePrice: getRandomPrice(),
    dateFrom: getRandomDateFrom(),
    dateTo: getRandomDateFromTo()
  },
  {
    id: 8,
    type: getRandomType(),
    offers: [0,1],
    destination: 2,
    basePrice: getRandomPrice(),
    dateFrom: getRandomDateFrom(),
    dateTo: getRandomDateFromTo()
  },
  {
    id: 9,
    type: getRandomType(),
    offers: [],
    destination: 1,
    basePrice: getRandomPrice(),
    dateFrom: getRandomDateFrom(),
    dateTo: getRandomDateFromTo()
  },
  {
    id: 10,
    type: getRandomType(),
    offers: [1, 2, 3],
    destination: 1,
    basePrice: getRandomPrice(),
    dateFrom: getRandomDateFrom(),
    dateTo: getRandomDateFromTo()
  }
];
