function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function randomArray(array) {
  return array[random(0, array.length - 1)];  
}
function randomType() {
  return randomArray(['taxi','bus','train','ship','drive','flight','sightseeing','restaurant']);
}
function randomPrice() {
  return random(1,1000);
}
let fromHour,
    fromMin,
    toHour,
    toMin,
    fromDay,
    toDay;
function  numberFormat(number) {
  if(number<10) {
      return '0' + number;
  }
    else {
    return number;
  }
}
function randomDateFrom() {
  fromDay = random(1,31);
  fromHour = random(10,15);
  fromMin = random(0,60);
  let date;
  let stringDay = numberFormat(fromDay),
      stringHour = numberFormat(fromHour),
      stringMin = numberFormat(fromMin);
  return `2019-07-${stringDay}T${stringHour}:${stringMin}:56.845Z`;
}
function randomDateFromTo() {
  toDay = (((fromDay * 24 + fromHour) * 60 + fromMin) + random(10, 2880)) / 1440;
  console.log('toDay=',toDay); 
  toHour = toDay * 24 % 24; 
  toDay = Math.round(toDay);
  toMin =  toHour * 60 % 60;
  toHour = Math.round(toHour);
  toMin = Math.round(toMin);

  toDay = numberFormat(toDay);
  toHour = numberFormat(toHour);
  toMin = numberFormat(toMin);
  //console.log(`2019-07-${toDay}T${toHour}:${toMin}:56.845Z`);

  return `2019-07-${toDay}T${toHour}:${toMin}:56.845Z`;
}
export const data = [
  {
    type: randomType(),
    offers:[
      {
        id: 1,
        title: 'Add luggage 1.1',
        price: randomPrice()
      },
      {
        id: 2,
        title: 'Switch to comfort class 1.2',
        price: randomPrice()
      },
      {
        id: 3,
        title: 'Add meal 1.3',
        price: randomPrice()
      }
    ]
  },
  {
    type: randomType(),
    offers:[
      {
        id: 1,
        title: 'Upgrade to a business class 2.1',
        price: randomPrice()
      },
      {
        id: 2,
        title: 'Add luggage 2.2',
        price: randomPrice()
      },
      {
        id: 3,
        title: 'Add meal 2.3',
        price: randomPrice()
      },
      {
        id: 4,
        title: 'Add meal 2.4',
        price: randomPrice()
      }

    ]
  },
  {
    type: randomType(),
    offers:[
      {
        id: 1,
        title: 'Upgrade to a business class 3.1',
        price: randomPrice()
      },
      {
        id: 2,
        title: 'Add luggage 3.2',
        price: randomPrice()
      },
      {
        id: 3,
        title: 'Add meal 3.3',
        price: randomPrice()
      },
      {
        id: 3,
        title: 'Add meal 3.4',
        price: randomPrice()
      }
    ]
  },
  {
    type: randomType(),
    offers:[
      {
        id: 1,
        title: 'Upgrade to a business class 4.1',
        price: randomPrice()
      },
      {
        id: 2,
        title: 'Add luggage 4.2',
        price: randomPrice()
      },
      {
        id: 3,
        title: 'Add meal 4.3',
        price: randomPrice()
      },
      {
        id: 3,
        title: 'Add meal 4.4',
        price: randomPrice()
      }
    ]
  },
  {
    type: randomType(),
    offers:[
      {
        id: 1,
        title: 'Upgrade to a business class 5.1',
        price: randomPrice()
      },
      {
        id: 2,
        title: 'Add luggage 5.2',
        price: randomPrice()
      },
    ]
  },
  {
    type: randomType(),
    offers:[
      {
        id: 1,
        title: 'Upgrade to a business class 6.1',
        price: randomPrice()
      },
    ]
  },
  {
    type: randomType(),
    offers:[
      {
        id: 1,
        title: 'Upgrade to a business class 6.2',
        price: randomPrice()
      },
    ]
  },
  {
    type: randomType(),
    offers:[
      {
        id: 1,
        title: 'Upgrade to a business class 7.1',
        price: randomPrice()
      },
      {
        id: 2,
        title: 'Add luggage 7.2',
        price: randomPrice()
      },
      {
        id: 3,
        title: 'Add meal 7.3',
        price: randomPrice()
      }
    ]
  },
  {
    type: randomType(),
    offers:[
      {
        id: 1,
        title: 'Upgrade to a business class 8.1',
        price: randomPrice()
      },
      {
        id: 2,
        title: 'Add luggage 8.2',
        price: randomPrice()
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
    type: randomType(),
    offers: [0, 1],
    destination: 2,
    basePrice: randomPrice(),
    dateFrom: randomDateFrom(),
    dateTo: randomDateFromTo(),
  },
  {
    id: 2,
    type: randomType(),
    offers: [1, 2],
    destination: 1,
    basePrice: randomPrice(),
    dateFrom: randomDateFrom(),
    dateTo: randomDateFromTo()
  },
  {
    id: 3,
    type: randomType(),
    offers: [0,2,3],
    destination: 1,
    basePrice: randomPrice(),
    dateFrom: randomDateFrom(),
    dateTo: randomDateFromTo()
  },
  {
    id: 4,
    type: randomType(),
    offers: [0, 3],
    destination: 2,
    basePrice: randomPrice(),
    dateFrom: randomDateFrom(),
    dateTo: randomDateFromTo()
  },
  {
    id: 5,
    type: randomType(),
    offers: [0,1],
    destination: 3,
    basePrice: randomPrice(),
    dateFrom: randomDateFrom(),
    dateTo: randomDateFromTo()
  },
  {
    id: 6,
    type: randomType(),
    offers: [1],
    destination: 1,
    basePrice: randomPrice(),
    dateFrom: randomDateFrom(),
    dateTo: randomDateFromTo()
  },
  {
    id: 7,
    type: randomType(),
    offers: [],
    destination: 3,
    basePrice: randomPrice(),
    dateFrom: randomDateFrom(),
    dateTo: randomDateFromTo()
  },
  {
    id: 8,
    type: randomType(),
    offers: [0,1],
    destination: 2,
    basePrice: randomPrice(),
    dateFrom: randomDateFrom(),
    dateTo: randomDateFromTo()
  },
  {
    id: 9,
    type: randomType(),
    offers: [],
    destination: 1,
    basePrice: randomPrice(),
    dateFrom: randomDateFrom(),
    dateTo: randomDateFromTo()
  },
  {
    id: 10,
    type: randomType(),
    offers: [1, 2, 3],
    destination: 1,
    basePrice: randomPrice(),
    dateFrom: randomDateFrom(),
    dateTo: randomDateFromTo()
  }
];
