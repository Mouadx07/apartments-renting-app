import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', 
  timeout: 10000, 
});

// Function to get data from an API
const getData = async (endpoint, params = {}) => {
  try {
    const response = await apiClient.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    
    throw error;
  }
};
//console.log(await getData('test'))
// Function to post data to an API
const postData = async (endpoint, data = {}) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
    
  } catch (error) {
    console.error('Error posting data:', error);
    
    throw error;
  }
};
export const  signUpApi = async (name, email, phone, password) => {
  try{
    return await postData('register', {name, email, password, phone})
  }
  catch {
    return 'Email or Password not valid!'
  }
}
export const logInApi = async (email, password) => {
  try {
    return await postData('login', {email, password})
  }
  catch {
    return 'Email or Password not valid!'
  }
    
}


export const getAllApartments = async () => {
  try {
    return await getData('apartments/all');
  }
  catch (error) {
    return 'error' + error;
  }
}
//console.log(await getAllApartments());
export const getApartment = async (id) => {
  try {
    return await getData(`apartments/${id}`);
  }
  catch (error) {
    return 'error' + error;
  }
}
export const listApartment = async (data) => {

  try {
    return await postData('apartments/store', data,  {headers: {
      'Content-Type': 'multipart/form-data',  
    }});
  }
  catch (error) {
    {}
  }
}
export const editApartment = async (data) => {
  try {
    return await postData('apartments/update', data);
  }
  catch (error) {
    return 'error' + error;
  }
}
export const deleteApartment = async (id) => {
  try {
    return await postData('apartments/delete', {id});
  }
  catch (error) {
    return 'error' + error;
  }
}
export const getUserProfile = async (userId) => {
  return await getData(`user/${userId}/profile`, {userId});
}
export const book = async (data) => {
  return await postData('book', data);
}
// export const getUserApartments = async (userId) => {
//   return await getData(`user/${userId}/apartments`, {userId});
// }
// export const getUserBookings = async (userId) => {
//   return await getData(`user/${userId}/bookings`, {userId});
// }
 //console.log(await signUpApi('Mouad', 'mouad7@gmail.com', '+212642531245', 'pass12345'))
 //console.log((await logInApi('mouad4@gmail.com', '123456')).token)
