export type Destination = {
  id: number,
  title: string,
  imgSrc: string
}

export type Destinations = Record<number, Destination>;

export const destinations: Destinations = {
    1: {
      id: 1,
      title: 'New Zealand',
      imgSrc: '/destinations/new-zealand.webp'
    },
    2: {
      id: 2,
      title: 'Fiji',
      imgSrc: '/destinations/fiji.webp'
    },
    3: {
      id: 3,
      title: 'Colombia',
      imgSrc: '/destinations/colombia.webp'
    },
};

export const users = [
  {
    id: 1,
    email: 'user1@site.com'
  },
  {
    id: 2,
    email: 'user2@site.com'
  },
  {
    id: 3,
    email: 'user3@site.com'
  },
  
]