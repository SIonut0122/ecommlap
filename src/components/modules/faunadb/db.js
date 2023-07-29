import faunadb from 'faunadb';
const secretKey = import.meta.env.VITE_FAUNADB_SECRET_KEY; 
 
const client = new faunadb.Client({ secret: secretKey })
const q = faunadb.query

export { client , q }