
export async function fetchRestaurants() {
   try {
     const res = await fetch(`http://localhost:3001/restaurants/`)
     return res.json()
   } catch (err) {
    return err.message
   }
}