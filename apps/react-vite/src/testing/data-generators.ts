import {
  randCompanyName,
  randUserName,
  randEmail,
  randParagraph,
  randUuid,
  randPassword,
  randCatchPhrase
} from '@ngneat/falso'

const generateUser = () => ({
  id: randUuid() + Math.random(),
  first_name: randUserName({ withAccents: false }),
  last_name: randUserName({ withAccents: false }),
  email: randEmail(),
  password: randPassword(),
  team_id: randUuid(),
  team_name: randCompanyName(),
  role: 'ADMIN',
  bio: randParagraph(),
  created_at: Date.now()
})

export const createUser = <T extends Partial<ReturnType<typeof generateUser>>>(
  overrides?: T
) => {
  return { ...generateUser(), ...overrides }
}

const generateTeam = () => ({
  id: randUuid(),
  name: randCompanyName(),
  description: randParagraph(),
  created_at: Date.now()
})

export const createTeam = <T extends Partial<ReturnType<typeof generateTeam>>>(
  overrides?: T
) => {
  return { ...generateTeam(), ...overrides }
}

const generateDiscussion = () => ({
  id: randUuid(),
  title: randCatchPhrase(),
  body: randParagraph(),
  created_at: Date.now()
})

export const createDiscussion = <
  T extends Partial<ReturnType<typeof generateDiscussion>>
>(
  overrides?: T & {
    author_id?: string
    team_id?: string
  }
) => {
  return { ...generateDiscussion(), ...overrides }
}

const generateComment = () => ({
  id: randUuid(),
  body: randParagraph(),
  created_at: Date.now()
})

export const createComment = <
  T extends Partial<ReturnType<typeof generateComment>>
>(
  overrides?: T & {
    author_id?: string
    discussion_id?: string
  }
) => {
  return { ...generateComment(), ...overrides }
}
