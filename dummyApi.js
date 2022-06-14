let url = "https://dummyjson.com/products?limit=100"
async function  getAPI() {
  let apiResponse = await fetch(url);
  let response = await apiResponse.json();
 
  return response
}


