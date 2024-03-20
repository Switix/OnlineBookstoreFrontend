import axios from 'axios';

export async function fetchAndSetBookImage(book) {
  try {
    const imageResponse = await axios.get(`http://localhost:8080/api/images/${book.imageUrl}`, {
      responseType: 'blob'
    });

    book.img = URL.createObjectURL(imageResponse.data);
  } catch (error) {
    console.error(`Error fetching book image for book ${book.id}:`, error);
    throw error; 
  }
}