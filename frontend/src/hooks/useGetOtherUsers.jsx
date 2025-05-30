import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setOtherUsers } from '../redux/userSlice';
import { BASE_URL } from '..';

const useGetOtherUsers = () => {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.user); // Assuming your token is saved here

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        if (!token) {
          console.warn('No auth token found');
          return;
        }

        axios.defaults.withCredentials = true;

        const res = await axios.get(`${BASE_URL}/api/v1/user`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token here
          },
        });

        console.log('other users -> ', res.data);
        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.error('Error fetching other users:', error);
      }
    };

    fetchOtherUsers();
  }, [dispatch, token]);
};

export default useGetOtherUsers;
