import * as axios from "axios";
import i18next from "i18next";

const instance = axios.create({
  // baseURL: 'https://api.tashin.uz',
  baseURL: "https://api.iamafi.ninja/",
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  config.headers["Accept-Language"] = i18next.language;
  return config;
});

export const accountAPI = {
  // registerAcc(registerData) {
  //     return instance.post(`account/register`, registerData).then((data) => {
  //         return { data: data.data }
  //     }).catch(err => {
  //         let error = err.response.data;
  //         return { error }
  //     })
  // },

  getLogin(userData) {
    return instance
      .post(`account/login`, userData)
      .then((data) => {
        return { data: data.data };
      })
      .catch((err) => {
        let error = err.response.data;
        return { error };
      });
  },

  tokenAcc(code) {
    return instance.post(`account/register/token`, code).then((data) => {
      return data.data;
    });
  },

  getProfile() {
    return instance
      .get(`account/profile`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      })
      .then((data) => {
        return data.data;
      });
  },

  putPassword(passwordData) {
    return instance
      .put("account/password/change", passwordData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      })
      .then((data) => {
        return data.data;
      });
  },

  postPasswordReset(passwordData) {
    return instance
      .post("account/password/reset", passwordData)
      .then((data) => {
        return data.data;
      });
  },

  postPasswordResetCode(code) {
    return instance
      .post("account/password/reset/code", code)
      .then((data) => {
        return { data: data.data };
      })
      .catch((err) => {
        return { error: err.response.data };  
      });
  },

  postSetPasswordReset(passwordData) {
    return instance
      .post("account/password/set", passwordData, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("resetToken"),
        },
      })
      .then((data) => {
        return data.data;
      });
  },

  putProfile(profileData) {
    return instance
      .put("account/profile", profileData, {
        headers: { Authorization: "Bearer " + localStorage.getItem("Token") },
      })
      .then((data) => {
        return data.data;
      });
  },

  deleteProfile() {
    return instance
      .delete(`account/delete`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      })
      .then((data) => {
        return data.data;
      });
  },
  setPhoto(file) {
    const formData = new FormData();
    formData.append("avatar", file);
    return instance
      .put("account/profile/avatar", formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response.data;
      });
  },
  getStatus() {
    return instance
      .get(`account/status`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      })
      .then((data) => {
        return data.data;
      });
  },
};

export const monthlyBestAPI = {
  getMonthlyBest(params) {
    return instance.get(`best${params ? params : ""}`).then((data) => {
      return data.data;
    });
  },
};

export const categoryAPI = {
  getCategory(category) {
    return instance.get(`category/${category}`).then((data) => {
      return data.data;
    });
  },
  getCategoryList() {
    return instance.get(`category/list`).then((data) => {
      return data.data;
    });
  },
};
export const manufacturerAPI = {
  getManufacturer(manufacturer) {
    return instance.get(`manufacturer/${manufacturer}`).then((data) => {
      return data.data;
    });
  },
  getManufacturerList() {
    return instance.get(`manufacturer/list`).then((data) => {
      return data.data;
    });
  },
};

export const productAPI = {
  getProductDetail(slug) {
    return instance.get(`product/${slug}`).then((data) => {
      return data.data;
    });
  },
  addProductCart(id) {
    return instance.post(`cart/add/`, id).then((data) => {
      return data.data;
    });
  },
  getProductsCart() {
    return instance.get(`cart/detail/`).then((data) => {
      return data.data;
    });
  },
  deleteProductCart(id) {
    return instance.post(`cart/remove/`, { id }).then((data) => {
      return data.data;
    });
  },
  getCartLength() {
    return instance.get(`cart/length/`).then((data) => {
      return data.data;
    });
  },
  getCartDetail() {
    return instance.get(`cart/detail/`).then((data) => {
      return data.data;
    });
  },
  searchProduct(search) {
    return instance.get(`product/search${search}`).then((data) => {
      return data.data;
    });
  },
  getReviewList(slug, queries) {
    return instance
      .get(`review/${slug}/list${queries ? queries : ""}`)
      .then((data) => {
        return data.data;
      });
  },
  getReviewDetail(slug) {
    return instance.get(`review/${slug}/detail`).then((data) => {
      return data.data;
    });
  },
  createReview(slug, data) {
    const formData = new FormData();
    formData.append("image_1", data.image_1);
    formData.append("image_2", data.image_2);
    formData.append("image_3", data.image_3);
    formData.append("image_4", data.image_4);
    formData.append("comment", data.comment);
    formData.append("stars", data.stars);
    return instance
      .post(`review/${slug}/create`, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((data) => {
        return data.data;
      });
  },
};

export const orderAPI = {
  createOrder(data) {
    return instance
      .post(`order/create`, data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      })
      .then((data) => {
        return data.data;
      });
  },
  initOrder() {
    return instance
      .get(`order/init`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      })
      .then((data) => {
        return data.data;
      });
  },
};

export const vendorsAPI = {
  vendorCreate(data) {
    const formData = new FormData();
    formData.append("avatar", data.avatar);
    formData.append("banner", data.banner);
    formData.append("title", data.title);
    formData.append("phone", data.phone);
    formData.append("website", data.website);
    formData.append("instagram", data.instagram);
    formData.append("description", data.description);
    return instance
      .post(`vendors/create`, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      })
      .then((data) => {
        return data.data;
      });
  },
  getCabinet() {
    return instance
      .get(`vendors/cabinet`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      })
      .then((data) => {
        return data.data;
      });
  },
  updatePhotoCabinet(file) {
    const formData = new FormData();
    formData.append("avatar", file);
    return instance
      .put(`vendors/avatar`, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      })
      .then((data) => {
        return data.data;
      });
  },
  getTotalStatistics() {
    return instance
      .get(`vendors/statistics`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      })
      .then((data) => {
        return data.data;
      });
  },
};
