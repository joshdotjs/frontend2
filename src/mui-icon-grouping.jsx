import * as React from 'react';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatBoldIcon from '@mui/icons-material/FormatBold';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

function BasicModal({ open, setOpen, setReply}) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [link_label, setLinkLabel] = React.useState('');
  const [link_url, setLinkUrl] = React.useState('');

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
                <input value={link_label} onChange={(e) => setLinkLabel(e.target.value)}></input>
              </label>
            </div>
            <div>
              <label>
                URL:{' '}
                <input value={link_url} onChange={(e) => setLinkUrl(e.target.value)}></input>
              </label>
            </div>
            <button
              onClick={() => {
                setReply((prev) => {
                  // const str = `${prev}<a href="${link_label}">${link_url}</a>`;
                  const str = `${prev} [${link_label}](${link_url})`;
                  return str;
                })
                setOpen(false);
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

export default function VerticalDividerMiddle({ setReply }) {

  const [open_modal, setOpenModal] = React.useState(false);

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          display: 'flex',
          color: 'text.secondary',
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
        <FormatBoldIcon />
        <Button onClick={() => setOpenModal(true)}>Open modal</Button>
      </Card>

      <BasicModal open={open_modal} setOpen={setOpenModal} {...{ setReply }} />
    </>
  );
}