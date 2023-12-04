import { openDB } from 'idb';


const dbName = 'productDB';
const storeName = 'products';

async function openDatabase() {
  return await openDB(dbName, 1, {
    upgrade(db) {
      db.createObjectStore(storeName, { keyPath: 'id' });
    },
  });
}

async function saveProduct(product) {
  try {
    const db = await openDatabase();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  await store.put(product);
  await tx.done;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
  
}

async function getAllProducts() {
  try {
     const db = await openDatabase();
  const tx = db.transaction(storeName, 'readonly');
  const store = tx.objectStore(storeName);
  return store.getAll();
  } catch (error) {
    console.error('Error fetching products:', error);
  }
 
}
async function DeleteProduct(productId){

  try {
    const db = await openDatabase();
    const transaction =db.transaction('products', 'readwrite');
    const objectStore =transaction.objectStore('products');
    await objectStore.delete(productId);
    getAllProducts()
    window.location.reload()

  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

export { saveProduct, getAllProducts,DeleteProduct};