import { getLS } from './local-storage';

// ==============================================

const http = async ({ url, method='GET', body={} }) => {

  // let debug_str = `%cmaking REQUEST to ${url} \n- METHOD:  ${method} \n- BODY: ${JSON.stringify(body, null, 2)}`;
  // console.log(debug_str, 'color: orange');
  
  let config = { 
    method, 
    headers: { 'Content-Type': 'application/json' } 
  };
  if (method !== 'GET') // GET requests do not have a body
    config.body = JSON.stringify( body );

  const user = getLS('user');
  if (user?.token) // auth protected endpoint
    config.headers.Authorization = user.token;
  
  const resp = await fetch(url, config);

  if (!resp.ok) 
    throw new Error('Error thrown in http.js');

  const data = await resp.json();

  // debug_str = `%cresponse -- DATA: ${JSON.stringify(data, null, 2)} \n CODE: ${resp.status}`;
  // console.log(debug_str, 'color: #bada55');

  return data;
};

// ==============================================

export { http };