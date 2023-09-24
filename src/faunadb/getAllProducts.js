import { client, q } from './db'

const getAllProducts = client.query(
  q.Paginate(
    q.Match(
      q.Ref('indexes/all_products')))
)
  .then((response) => {
    const productsRefs = response.data
    // create new query out of todo refs. 
    const getAllProductsMap = productsRefs.map((ref) => {
      return q.Get(ref)
    })
    // query the refs
    return client.query(getAllProductsMap).then((data) => data)
  })
  .catch((error) => console.log('error', error.message))

export default getAllProducts;