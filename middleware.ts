export { default } from 'next-auth/middleware';

export const config = {
  mather: [
    '/issues/new',
    '/issues/:id+/edit',
  ]
}