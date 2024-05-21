import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useSnackbar } from 'notistack';

// register:
gsap.registerPlugin(useGSAP);

// ==============================================
// ==============================================
// ==============================================
// ==============================================

const FETCH_STATUS = {
  IDLE: 'idle', // initial state - no request made
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

// ==============================================
// ==============================================
// ==============================================
// ==============================================

const useLoading = () => {

  const { enqueueSnackbar } = useSnackbar();

  const notify = ({ message, variant, duration }) => {
    // variant: 'default' | 'error' | 'success' | 'warning' | 'info'
    enqueueSnackbar(message, { variant, autoHideDuration: duration });
  };

  
  // ============================================

  // TODO: put in hook:
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(FETCH_STATUS.IDLE);
  const errorFn = ({err, msg}) => {
    console.error(err);
    notify({message: msg, variant: 'error', duration: 3000});
    setStatus(FETCH_STATUS.ERROR);
    setError(err);
  };
  const is_loading = status === FETCH_STATUS.LOADING;
  const is_success = status === FETCH_STATUS.SUCCESS;
  const is_error = status === FETCH_STATUS.ERROR;

  const container_ref = useRef();

  useGSAP(
    () => {
      // gsap code here...
      if (is_success) {
        gsap.to('.loading', { opacity: 0, delay: 1 });
        gsap.to('.success', { opacity: 1, delay: 1 });
      }
    },
    { 
      scope: container_ref, 
      dependencies: [is_loading, is_success],
    }
  ); // <-- scope is for selector text (optional)

  // ============================================

  return { error, setError, setStatus, errorFn, is_loading, is_success, is_error, container_ref, notify, FETCH_STATUS };
};

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export { useLoading };