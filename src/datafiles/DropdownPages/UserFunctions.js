import axios from 'axios'

export const hackdata = okUser => {
  return axios
    .post('http://poc100.herokuapp.com/register/add_hackerrank', {
        mod: okUser.mod,
        cert: okUser.cert,
        empName: okUser.empName,
        hScore: okUser.hScore,
        dateH: okUser.dateH,
        pop: okUser.pop,
        skill: okUser.skill,
     
    },{
    headers:{
      'id': sessionStorage.getItem('use'),
      'role': sessionStorage.getItem('user'),
      }})
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      console.log('Registered',response.data)
      return response.data
    })
  }

  export const trenddata = okUser => {
    return axios
      .post('http://poc100.herokuapp.com/register/add_trendnext', {
          trendScore: okUser.trendScore,
          dateT: okUser.dateT,
          pop: okUser.pop,
          topics: okUser.topics,
    
      },{
        headers:{
          'id': sessionStorage.getItem('use'),
          'role': sessionStorage.getItem('user'),
          }})
      .then(response => {
        localStorage.setItem('usertoken', response.data)
        console.log('Registered',response.data)
        return response.data
      })
    }

    export const detaildata = okUser => {
      return axios
        .post('http://poc100.herokuapp.com/assign/add_details', {
            dateFrom: okUser.dateFrom,
            dateTill: okUser.dateTill,
            pop: okUser.pop,
            res: okUser.res,
  
        },{
          headers:{
            'id': sessionStorage.getItem('use'),
            'role': sessionStorage.getItem('user'),
            }})
        .then(response => {
          localStorage.setItem('usertoken', response.data)
          console.log('Registered',response.data)
          return response.data
        })
      }

      export const shridata = okUser => {
        return axios
          .post('http://poc100.herokuapp.com/register/add_shristi', {
              shristiTitle: okUser.shristiTitle,
              shristiID: okUser.shristiID,
              dateP: okUser.dateP,
              pop: okUser.pop,
              des: okUser.des,
     
          },{
            headers:{
              'id': sessionStorage.getItem('use'),
              'role': sessionStorage.getItem('user'),
              }})
          .then(response => {
            localStorage.setItem('usertoken', response.data)
            console.log('Registered',response.data)
            return response.data
          })
        }

        export const wcdata = okUser => {
          return axios
            .post('http://poc100.herokuapp.com/register/add_winnercircle', {
                rFrom: okUser.rFrom,
                wcPoints: okUser.wcPoints,
                dateP: okUser.dateP,
                pop: okUser.pop,
                des: okUser.des,
    
            },{
              headers:{
                'id': sessionStorage.getItem('use'),
                'role': sessionStorage.getItem('user'),
                }})
            .then(response => {
              localStorage.setItem('usertoken', response.data)
              console.log('Registered',response.data)
              return response.data
            })
          }

        export const pragdata = okUser => {
          return axios
            .post('http://poc100.herokuapp.com/register/add_pragati', {
              pragatiTitle: okUser.pragatiTitle,
              pragatiID: okUser.pragatiID,
              dateP: okUser.dateP,
              pop: okUser.pop,
              des: okUser.des,
    
            },{
              headers:{
                'id': sessionStorage.getItem('use'),
                'role': sessionStorage.getItem('user'),
                }})
            .then(response => {
              localStorage.setItem('usertoken', response.data)
              console.log('Registered',response.data)
              return response.data
            })
          }

          export const topcdata = okUser => {
            return axios
              .post('http://poc100.herokuapp.com/register/add_topgearl', {
                  cert: okUser.cert,
                  dateT: okUser.dateT,
                  pop: okUser.pop,
                  chalID: okUser.chalID,
 
              },{
                headers:{
                  'id': sessionStorage.getItem('use'),
                  'role': sessionStorage.getItem('user'),
                  }})
              .then(response => {
                localStorage.setItem('usertoken', response.data)
                console.log('Registered',response.data)
                return response.data
              })
            }

            export const topgdata = okUser => {
              return axios
                .post('http://poc100.herokuapp.com/register/add_topgearc', {
                    cert: okUser.cert,
                    topTitle: okUser.topTitle,
                    dateH: okUser.dateH,
                    pop: okUser.pop,
                    topID: okUser.topID,
                    cash: okUser.cash,
                    points:okUser.points,
           
                },{
                  headers:{
                    'id': sessionStorage.getItem('use'),
                    'role': sessionStorage.getItem('user'),
                    }})
                .then(response => {
                  localStorage.setItem('usertoken', response.data)
                  console.log('Registered',response.data)
                  return response.data
                })
              }

