import axios from 'axios';

async function test() {
  try {
    const response = await axios.post('http://localhost:5000/api/search', {
      query: "Find me a 2BHK under 50L in Bangalore near metro and schools"
    });
    console.log("Success Response:", response.data);
  } catch (error) {
    console.error("Error Response:", error.response?.status, error.response?.data);
  }
}
test();
