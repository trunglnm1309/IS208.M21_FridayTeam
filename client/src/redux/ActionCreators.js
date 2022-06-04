import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../baseUrl'

export const addBook = (book) => ({
  type: ActionTypes.ADD_BOOK,
  payload: book
});

export const postBook = (name, author, description, isbn, cat, floor, shelf, copies) => (dispatch) => {
    const newBook = {
      name: name, author: author,
       description: description, isbn: isbn,
        cat: cat, floor: floor, 
        shelf: shelf, copies: copies
    };
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'books', {
        method: "POST",
        body: JSON.stringify(newBook),
        headers: {
          "Content-Type": "application/json",
          'Authorization': bearer
        }
     //   ,        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => { alert('Sách đã được thêm thành công!');
      return  dispatch(addBook(response));})
    .catch(error =>  { alert('Sách của bạn không thể thêm.\nLỗi: '+error.message); });
};

export const editBook = (_id, name, author, description, isbn, cat, floor, shelf, copies) => (dispatch) => {

  const newBook = {
    name: name, author: author,
     description: description, isbn: isbn,
      cat: cat, floor: floor, 
      shelf: shelf, copies: copies
  };
  const bearer = 'Bearer ' + localStorage.getItem('token');
  return fetch(baseUrl + 'books/' + _id, {
      method: "PUT"
    //  ,     credentials: 'same-origin'
      ,      body: JSON.stringify(newBook),
      headers: {
        "Content-Type": "application/json",
        'Authorization': bearer
      } })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => (dispatch(editBookdispatch(response))))
  .catch(error =>  {  
  alert('Sách của bạn không thể chỉnh sửa.\nLỗi: '+error.message); });
};

export const editPassword = (_id,username,password) => (dispatch) => {
  const bearer = 'Bearer ' + localStorage.getItem('token');
  return fetch(baseUrl + 'users/password/' + _id, {
    method: "PUT"
  //  ,     credentials: 'same-origin'
    ,      body: JSON.stringify({password: password}),
    headers: {
      "Content-Type": "application/json",
      'Authorization': bearer
    } })
.then(response => {
    if (response.ok) {
      return response;
    } else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText+'\n ');
      error.response = response;
      throw error;
    }
  },
  error => {
        throw error;
  })
.then(response => response.json())
.then(response => { 
  let newCreds={username: username, password: password};
  localStorage.removeItem('creds');
  localStorage.setItem('creds', JSON.stringify(newCreds));
  alert('Mật khẩu thay đổi thành công!');
  return dispatch(editPasswordDispatch(newCreds));})
.catch(error =>  {  
alert('Mặt khẩu của bạn không thể thay đổi.\nLỗi: '+error.message); });
}

export const editUser = (_id, firstname, lastname, roll, email) => (dispatch) => {

  const newUser = {
firstname: firstname,
lastname: lastname,
roll: roll,
email: email  };
  const bearer = 'Bearer ' + localStorage.getItem('token');
  return fetch(baseUrl + 'users/' + _id, {
      method: "PUT"
    //  ,     credentials: 'same-origin'
      ,      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
        'Authorization': bearer
      } })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => { 
    localStorage.removeItem('userinfo');
    localStorage.setItem('userinfo', JSON.stringify(response));
    return dispatch(editUserdispatch(response));})
  .catch(error =>  {  
  alert('Thông tin của bạn không thể sửa đổi.\nLỗi: '+error.message+'\n Đã có người sử dụng tên đăng nhập hoặc email này.'); });
};

export const deleteBook = (_id) => (dispatch) => {
  
  const bearer = 'Bearer ' + localStorage.getItem('token');    
  return fetch(baseUrl + 'books/' + _id, {
      method: "DELETE"
    //  ,       credentials: "same-origin"
      ,       headers: {
        'Authorization': bearer
      }
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => dispatch(deleteBookdispatch(response)))
  .catch(error =>  {alert('Không thể xóa sách!\nError: '+error.message); });
};

export const fetchBooks = () => (dispatch) => {
    dispatch(booksLoading(true));
    return fetch(baseUrl+'books')
        .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(books => dispatch(addBooks(books)))
    .catch(error => dispatch(booksFailed(error.message)));
}


export const fetchUsers = () => (dispatch) => {
  const bearer = 'Bearer ' + localStorage.getItem('token');
  dispatch(usersLoading(true));
  return fetch(baseUrl+'users',{
    headers: {
      'Authorization': bearer
    }
  })
      .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          var errmess = new Error(error.message);
          throw errmess;
    })
  .then(response => response.json())
  .then(users => dispatch(addUsers(users)))
  .catch(error => dispatch(usersFailed(error.message)));
}


export const booksLoading = () => ({
    type: ActionTypes.BOOKS_LOADING
});

export const booksFailed = (errmess) => ({
    type: ActionTypes.BOOKS_FAILED,
    payload: errmess
});

export const addBooks = (books) => ({
    type: ActionTypes.ADD_BOOKS,
    payload: books
});

export const addUsers = (users) => ({
  type: ActionTypes.ADD_USERS,
  payload: users
});

export const usersLoading = () => ({
  type: ActionTypes.USERS_LOADING
});

export const editBookdispatch = (books) => ({
  type: ActionTypes.EDIT_BOOK,
  payload: books
});

export const returnBookdispatch = (issue) => ({
  type: ActionTypes.RETURN_ISSUE,
  payload: issue
});

export const editUserdispatch = (USER) => ({
  type: ActionTypes.EDIT_USER,
  payload: USER
});

export const editPasswordDispatch = (CREDS) => ({
  type: ActionTypes.EDIT_PASSWORD,
  payload: CREDS
})

export const deleteBookdispatch = (resp) => ({
  type: ActionTypes.DELETE_BOOK,
  payload: resp
});

export const requestLogin = (creds) => {
  return {
      type: ActionTypes.LOGIN_REQUEST,
      creds
  }
}

export const receiveLogin = (response) => {
  return {
      type: ActionTypes.LOGIN_SUCCESS,
      token: response.token,
      userinfo: response.userinfo
  }
}

export const loginError = (message) => {
  return {
      type: ActionTypes.LOGIN_FAILURE,
      message
  }
}

export const loginUser = (creds) => (dispatch) => {

  dispatch(requestLogin(creds));
  return fetch(baseUrl + 'users/login', {
      method: 'POST',
      headers: { 
          'Content-Type':'application/json' 
      },
      body: JSON.stringify(creds)
  })
  .then(response => {
      if (response.ok) {
          return response;
      } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
      }
      },
      error => {
          throw error;
      })
  .then(response => response.json())
  .then(response => {
      if (response.success) {
          // If login was successful, set the token in local storage
          localStorage.setItem('token', response.token);
          localStorage.setItem('creds', JSON.stringify(creds));
          localStorage.setItem('userinfo', JSON.stringify(response.userinfo));    
          dispatch(fetchIssues(!response.userinfo.admin));      
          if(response.userinfo.admin) {
            dispatch(fetchUsers())
          }
          setTimeout(()=>{
            logoutUser();
            alert('Your JWT token has expired. \nVui lòng đăng nhập lại để tiếp tục.');
           },3600*1000);
          // Dispatch the success action
          dispatch(receiveLogin(response));
      
      }
      else {
          var error = new Error('Error ' + response.status);
          error.response = response;
          throw error;
      }
  })
  .catch(error => {
    alert(error.message+'\n'+"Tên đăng nhập hoặc mật khẩu không đúng!");
     return dispatch(loginError(error.message));})
};

export const registerUser = (creds) => (dispatch) => {


  return fetch(baseUrl + 'users/signup', {
      method: 'POST',
      headers: { 
          'Content-Type':'application/json' 
      },
      body: JSON.stringify(creds)
  })
  .then(response => {
      if (response.ok) {
          return response;
      } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
      }
      },
      error => {
          throw error;
      })
  .then(response => response.json())
  .then(response => {
      if (response.success) {
          // If Registration was successful, alert the user
          alert('Đăng ký thành công!');
        }
      else {
          var error = new Error('Error ' + response.status);
          error.response = response;
          throw error;
      }
  })
  .catch(error => alert(error.message+'\n'+
      'Đã có người sử dụng tên đăng nhập hoặc email này.\nVui lòng thử nhập tên hoặc email khác! '))
};

export const addIssue = (issue) => ({
  type: ActionTypes.ADD_ISSUE,
  payload: issue
});

export const postIssue = (bookId,studentId) => (dispatch) => {
    const newIssue = {
    book: bookId,
    student: studentId 
    };
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'issues', {
        method: "POST",
        body: JSON.stringify(newIssue),
        headers: {
          "Content-Type": "application/json",
          'Authorization': bearer
        }
     //   ,        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => { alert('Mượn sách thành công!');
      return  dispatch(addIssue(response));})
    .catch(error =>  {
      alert('Không thể mượn sách!\nLỗi: '+error.message+'\n'+
      'Người dùng này đã mượn tối đa 3 cuốn sách! Vui lòng trả sách cũ trước khi mượn mới. \n'+
      'Hoặc sách hiện không có sẵn. Bạn có thể chờ ít ngày để sách được hoàn trả về thư viện.'); });
};

export const returnIssue = (issueId) => (dispatch) => {
  const bearer = 'Bearer ' + localStorage.getItem('token');
  return fetch(baseUrl + 'issues/' + issueId, {
      method: "PUT"
    //  ,     credentials: 'same-origin'
    , headers: {
        "Content-Type": "application/json",
        'Authorization': bearer
      } })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => { 
    alert('Trả sách thành công!');
    return dispatch(returnBookdispatch(response));})
  .catch(error =>  {  
  alert('Không thể trả sách!\nLỗi: '+error.message); });
};

export const fetchIssues = (student) => (dispatch) => {
  let issueUrl;
  const bearer = 'Bearer ' + localStorage.getItem('token');
  if(student) {
    issueUrl='issues/student';
  }
  else {
    issueUrl='issues';
  }
  dispatch(issuesLoading(true));
  return fetch(baseUrl+issueUrl,{
     headers: {
        'Authorization': bearer
       }
  })
      .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          var errmess = new Error(error.message);
          throw errmess;
    })
  .then(response => response.json())
  .then(issues => dispatch(addIssues(issues)))
  .catch(error => dispatch(issuesFailed(error.message)));
}



export const issuesLoading = () => ({
  type: ActionTypes.ISSUES_LOADING
});

export const issuesFailed = (errmess) => ({
  type: ActionTypes.ISSUES_FAILED,
  payload: errmess
});

export const addIssues = (issues) => ({
  type: ActionTypes.ADD_ISSUES,
  payload: issues
});

export const usersFailed = (errmess) => ({
  type: ActionTypes.USERS_FAILED,
  payload: errmess
});


export const requestLogout = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST
  }
}

export const receiveLogout = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS
  }
}


export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout())
  localStorage.removeItem('token');
  localStorage.removeItem('creds');  
  localStorage.removeItem('userinfo');  
  dispatch(receiveLogout())
}
