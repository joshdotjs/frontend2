import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import LinkIcon from '@mui/icons-material/Link';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import ToggleButtonGroupCustom from './mui-toggle-button-group-custom';
import ToggleButtonGroup from './mui-toggle-button-group';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// ==============================================
// ==============================================
// ==============================================
// ==============================================

function LinkModal({ open, setOpen, setReply, link, setLink, highlight }) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const [link_label, setLinkLabel] = useState('');
  // const [link_url, setLinkUrl] = useState('');

  return (
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter a Link
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Enter a Link
          </Typography>


          <div>
            <div>
              <label>
                Label:{' '}
                <input value={link.label} onChange={(e) => setLink((prev) => ({ ...prev, label: e.target.value }))}></input>
              </label>
            </div>
            <div>
              <label>
                URL:{' '}
                <input value={link.url} onChange={(e) => setLink((prev) => ({ ...prev, url: e.target.value }))}></input>
              </label>
            </div>
            <button
              onClick={() => {
                setReply((prev) => {
                  // const str = `${prev}<a href="${link_label}">${link_url}</a>`;
                  let str;
                  if (!highlight.on) {
                    str = `${prev}<a href="${link.url}">${link.label}</a>`;
                  } else {
                    const { start, end } = highlight;
                    const before = prev.substring(0, start);
                    const after = prev.substring(end);
                    str = `${before}<a href="${link.url}">${link.label}</a>${after}`;  
                  }
                  return str;
                })
                setOpen(false);
                setLink({ lable: '', url: '' });
              }}
            >
              Add Link
            </button>
          </div>
        </Box>


      </Modal>



    </div>
  );
}

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function IconGrouping({ setReply, highlight, setHighlight, underline, setUnderline }) {

  const [open_modal, setOpenModal] = useState(false);
  const [link, setLink] = useState({ label: '', url: '' });

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          display: 'flex',
          // color: 'text.secondary',
          '& svg': {
            m: 1,
          },
          '& hr': {
            mx: 0.5,
          },
        }}
      >
        <FormatAlignLeftIcon />
        <FormatAlignCenterIcon />
        <FormatAlignRightIcon />
        <Divider orientation="vertical" variant="middle" flexItem />

        <FormatBoldIcon 
          // disabled={highlight.on ? false : true}
          disabled={true}
          color="primary" 
          sx={{ 
            cursor: 'pointer',
            opacity: highlight.on ? 1 : 0.5,
            pointerEvents: highlight.on ? 'auto' : 'none',
          }}
          onClick={() => {
            console.log('clicked bold')

            setReply((prev) => {
              const { start, end, text } = highlight;
              const before = prev.substring(0, start);
              const after = prev.substring(end);
              const str = `${before}<strong>${text}</strong>${after}`;  
              return str;
            });
            
            // TODO: Repeat the process if you just click the button without selecting anything
            // TODO: If there is already a <strong> tag inside the selection, remove it
          }} 
        />

        {/* <Button onClick={() => setOpenModal(true)}> */}

        <LinkIcon onClick={() => {
            console.log('highlight:', highlight);

            if (highlight.on) {
              setLink({
                label: highlight.text,
                url: '',
              });
            }

            setOpenModal(true);
          }} 
          color="primary" 
          sx={{ cursor: 'pointer' }} 
        />
        {/* </Button> */}
      </Card>

      <ToggleButtonGroupCustom />
      <ToggleButtonGroup />

      <LinkModal open={open_modal} setOpen={setOpenModal} {...{ setReply, link, setLink, highlight }} />
    </>
  );
}