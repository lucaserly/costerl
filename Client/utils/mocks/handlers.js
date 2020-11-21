import { rest } from 'msw';
const BASE_URL = 'http://10.197.6.154:3002/'


export const handlers = [
  rest.post(BASE_URL+'/register', (req, res, ctx) => {
    // Persist user's authentication in the session

    // sessionStorage.setItem('is-authenticated', true);

    return res(
      // Respond with a 200 status code

      ctx.status(200),
      ctx.json({
        id: 2,
        email: 'tester',
        password: '$2b$10$sinMLbtAUaSvuy.Un9B0wu.gnqwKPqbHEq8dQwU0jwGT2fizyb9TO',
        updatedAt: '2020-11-20T15:57:48.937Z',
        createdAt: '2020-11-20T15:57:48.937Z',
      }),
    );
  }),

//   rest.get('/user', (req, res, ctx) => {
//     // Check if the user is authenticated in this session

//     const isAuthenticated = sessionStorage.getItem('is-authenticated');

//     if (!isAuthenticated) {
//       // If not authenticated, respond with a 403 error

//       return res(
//         ctx.status(403),

//         ctx.json({
//           errorMessage: 'Not authorized',
//         }),
//       );
//     }

//     // If authenticated, return a mocked user details

//     return res(
//       ctx.status(200),

//       ctx.json({
//         username: 'admin',
//       }),
//     );
//   }),
// ];
