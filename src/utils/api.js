import axios from "axios";

// axios.get("https://animeworld-y5ms.onrender.com/api/products",params).then(response => {
//     console.log(response);
//   })

export const fetchDataFromApi = async (url) => {
    try {
        const { data } = await axios.post(
            // "http://localhost:5000/api/user/recruitment"
        );
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};

// export const makePaymentRequest = axios.create({
//     baseURL: process.env.REACT_APP_STRIPE_APP_DEV_URL,
//     headers: {
//         Authorization: "bearer " + process.env.REACT_APP_STRIPE_DEV_APP_KEY,
//     },
// });
