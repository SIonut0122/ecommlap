import { client, q } from './db'

const getAllProducts = client.query(
  q.Paginate(
    q.Match(
      q.Ref('indexes/all_products')))
)
  .then(response => {
    const productsRefs = response.data
 
    const getAllProductDataQuery = productsRefs.map((ref) => {
      return q.Get(ref)
    })
    // query the refs
    return client.query(getAllProductDataQuery).then((data) => data)
  })
  .catch((error) => console.log('error', error.message))

export default getAllProducts;