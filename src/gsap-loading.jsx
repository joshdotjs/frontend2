// libs:
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// utils:
import { FETCH_STATUS } from './util/fetch-status';

// register:
gsap.registerPlugin(useGSAP);

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default () => {

  // ============================================

  const [error, setError] = useState(null);
  const [status, setStatus] = useState(FETCH_STATUS.IDLE);

  const is_loading = status === FETCH_STATUS.LOADING;
  const is_success = status === FETCH_STATUS.SUCCESS;
  const is_error = status === FETCH_STATUS.ERROR;

  const container = useRef();

  useGSAP(
    () => {
      // gsap code here...
      if (is_success) {
        gsap.to('.loading', { opacity: 0 });
        gsap.to('.success', { opacity: 1 });
      }
    },
    { 
      scope: container, 
      dependencies: [is_loading, is_success],
    }
  ); // <-- scope is for selector text (optional)

  // ============================================

  const getData = async () => {
    setStatus(FETCH_STATUS.LOADING);

    setTimeout(() => {
      setStatus(FETCH_STATUS.SUCCESS);
      console.log('data: ', data);
    }, 250);    
  };

  // ============================================

  useEffect(() => {
    getData();
  }, []);
  
  // ============================================
  
  return (
    <main 
      ref={container}
      style={{
      position: 'relative',
      height: '100px',
      width: '100px',
      border: 'solid red 10px',
    }}>
      <section className="loading" style={{ position: 'absolute', background: 'blue',  height: '100%', width: '100%', display: 'grid', placeItems: 'center', opacity: 1 }}>Loading...</section>
      <section className="success" style={{ position: 'absolute', background: 'green', height: '100%', width: '100%', display: 'grid', placeItems: 'center', opacity: 0 }}>Success!!</section>
    </main>
  );
};