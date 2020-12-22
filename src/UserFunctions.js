import axios from 'axios'

export const reg = newUser => {
  return axios
    .post('https://poc100.herokuapp.com/auth/register', {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      password: newUser.password,
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      console.log('Registered',response.data)
      return response.data
    })
}
export const sign = user => {
  return axios
    .post('https://poc100.herokuapp.com/auth/signin', {
      email: user.email,
      password: user.password,
      role: user.role,

    })
    .then(response => {
      sessionStorage.setItem('use', JSON.stringify (response.data.id))
      sessionStorage.setItem('user', JSON.stringify (response.data.role))
      console.log('Registered',response.data.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const check = newuser => {
  return axios
    .post('https://poc100.herokuapp.com/auth/forgot_password', {
      email: newuser.email,
      firstName: newuser.firstName,
      lastName: newuser.lastName,
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      if(response.data.msg==="True")
      alert("Your Password is : " + response.data.password)
      if(response.data.msg==="False")
      alert(response.data.message)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}
