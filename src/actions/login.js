import {axiosInstance} from '../globals'

export const handleLogin = user_data => async (dispatch) => {
    return await axiosInstance
        .post('/users/login/', user_data)
        .then((response) => {

            localStorage.setItem('currentUser', response.data.username);
            localStorage.setItem('token', response.data.token);
        })
        .catch((error) => {

        })
        .catch((error) => {

        });
};