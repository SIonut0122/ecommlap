
import faunadb from 'faunadb';
const q       = faunadb.query
const faunadbapi = import.meta.env.VITE_APP_FBD_KEY; 
 
  var client  = new faunadb.Client({
    secret: faunadbapi,
    domain: 'db.fauna.com',
    scheme: 'https',
  })
 
export { q, client } 