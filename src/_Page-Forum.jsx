// libs:
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Box,
  Typography
} from '@mui/material';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import HeadsetIcon from '@mui/icons-material/Headset';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import CableIcon from '@mui/icons-material/Cable';
import Hidden from '@mui/material/Hidden';

// comps:
import Transition from './_layout-transition';
import Loading from './loading';
import GSAPLoading from './gsap-loading';

// hooks:
import { useTheme } from '@mui/material/styles';

// utils:
import { http } from './util/http';
import { apiUrl } from './util/url';
import { asynch } from './util/async';
import { FETCH_STATUS } from './util/fetch-status';

// register:
gsap.registerPlugin(useGSAP);

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function ForumPage () {

  // ============================================

  // TODO: put in hook:
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(FETCH_STATUS.IDLE);
  const errorFn = ({err, msg}) => {
    console.error(err);
    notify({message: msg, variant: 'error', duration: 3000})();
    setStatus(FETCH_STATUS.ERROR);
    setError(err);
  };
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

  const [sections, setSections] = useState([]);
  const theme = useTheme();

  // ============================================

  const getSections = async () => {
    setStatus(FETCH_STATUS.LOADING);

    const url = apiUrl('sections');
    const promise = http({ url });
    const [data, err] = await asynch( promise );
    
    if (err) return errorFn({ err, msg: 'Error getting thread sections...' });
    
    setStatus(FETCH_STATUS.SUCCESS);
    console.log('data: ', data);
    setSections(data);
  };

  // ============================================

  useEffect(() => {
    getSections();
  }, []);

  // ============================================

  const Icons = [
    {
      comp: <NewspaperIcon />,
      color: theme.j.accent.green,
    },
    {
      comp: <LocalFireDepartmentIcon />,
      color: theme.j.accent.orange,
    },
    {
      comp: <CableIcon />,
      color: theme.j.accent.purple,
    },
    {
      comp: <HeadsetIcon />,
      color: theme.j.accent.blue,
    },
  ];
  
  // ============================================
  
  return (
    <Transition>
      <Container>
        <Typography 
          variant="h2"
          sx={{
            mb: 2,
          }}
        >
          Forum Sections
        </Typography>

        <GSAPLoading />

        {is_loading && <Loading />}

        {is_error && <Typography>Error: {error}</Typography>}

      </Container>
    </Transition>
  );
};