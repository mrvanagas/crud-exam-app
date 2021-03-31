const requestOptions = {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
};
  
const domain = 'http://localhost:5000';

export const getUsers = async (success, failure) => {
    try {
      const res = await fetch(domain + '/users', requestOptions);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message)
      success(data);
    } catch ({ message }) {
      failure(message);
    }
}

export const postUser = async (body, success, failure) => {
    try {
      const res = await fetch(domain + '/users', {
        method: 'POST',
        ...requestOptions,
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message)
      success(data);
    } catch ({ message }) {
      failure(message);
    }
}

export const updateUser = async (id, body, success, failure) => {
    try {
      const res = await fetch(domain + `/users/${id}`, {
        method: 'PATCH',
        ...requestOptions,
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message)
      success(data);
    } catch ({ message }) {
      failure(message);
    }
}

export const deleteUser = async (id, success, failure) => {
    try {
      const res = await fetch(domain + `/users/${id}`, {
        method: 'DELETE',
        ...requestOptions,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message)
      success(data);
    } catch ({ message }) {
      failure(message);
    }
}



const API = {
    getUsers,
    postUser,
    updateUser,
    deleteUser
};

export default API;