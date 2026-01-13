import { faker } from '@faker-js/faker'

export const schemas: Record<string, any> = {
  user: {
    POST: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    },
  },
  'user/:id': {
    GET: null,
    PUT: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    },
    PATCH: {
      status: faker.helpers.arrayElement(['ACTIVE', 'INACTIVE']),
    },
  },
  users: {
    GET: null,
  },
}
