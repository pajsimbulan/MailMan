import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { IconButton, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import PropTypes from 'prop-types';
import hourOfDay from '../../utils/DateHOD';
import parseDate from '../../utils/DateParser';
import { UserContext } from '../../App';
import { intArrayToBase64String } from '../../utils/DatatoBinary64';
import useEmail from '../../hooks/useEmail';

function EmailBlock({
  email, selected, setCheck, allChecked,
}) {
  const [starred, setStarred] = React.useState(email.starred);
  const user = React.useContext(UserContext);
  const { updateEmail, loading, statusCode } = useEmail();
  const isInitialRender = React.useRef(true);

  React.useEffect(() => {
    if (isInitialRender.current) {
    // Skip the effect on initial render
      isInitialRender.current = false;
    } else {
      async function updateStarred() {
        //console.log(`updating this email ${email._id} to ${starred}`);
        await updateEmail(user.userInfo._id, email._id, starred, user.accessToken);
        //console.log(`statusCode: ${statusCode}`);
      }
      updateStarred();
    }
  }, [starred]);

  return (
    <Box
      onClick={() => { selected(email); }}
      sx={{
        width: '100%',
        border: 'solid',
        mt: -0.5,
        borderWidth: 0,
        display: 'flex',
        flexDirection: 'row',
        boxShadow: 2,
        bgcolor: 'white',
        borderRadius: 3,
        py: 1,
        '&:hover': {
          borderWidth: 1, boxShadow: 5, cursor: 'pointer', borderColor: '#338FEB',
        },
      }}
    >
      <Checkbox
        onClick={(event) => { event.stopPropagation(); }}
        onChange={(event) => { event.stopPropagation(); setCheck(event.target.checked); }}
        checked={allChecked}
        sx={{
          my: 'auto',
          transform: 'scale(0.8)',
          ml: 1,
          '@media (max-width: 800px)': { transform: 'scale(0.65)', mr: -1 },
        }}
      />
      <IconButton
        sx={{
          height: 25, width: 25, my: 'auto', mr: 0.5, '@media (max-width: 800px)': { height: 20, width: 20 },
        }}
        onClick={(event) => { event.stopPropagation(); setStarred(!starred); }}
      >
        {starred ? <StarIcon sx={{ height: 25, width: 25, '@media (max-width: 800px)': { height: 20, width: 20 } }} /> : <StarBorderIcon sx={{ height: 25, width: 25, '@media (max-width: 800px)': { height: 20, width: 20 } }} />}
      </IconButton>
      <Avatar alt="$user_avatar" src={email.from && email.from.avatar ? `data:image/jpeg;base64,${intArrayToBase64String(email.from.avatar.data)}` : null} sx={{ my: 'auto', height: 30, width: 30 }} />
      <Box
        component="div"
        sx={{
          display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', m: 1,
        }}
      >
        <Typography sx={{
          fontWeight: 'bold', fontSize: '14px', '@media (max-width: 800px)': { fontSize: '12px' }, '@media (max-width: 500px)': { fontSize: '10px' },
        }}
        >
          {email.subject == '' ? 'No subject' : email.subject}
        </Typography>
        <Box sx={{ maxWidth: '100%' }}>
          <Typography sx={{ fontSize: '12px', '@media (max-width: 800px)': { fontSize: '10px' }, '@media (max-width: 500px)': { fontSize: '8px' } }}>
            {email.contents}
          </Typography>
        </Box>
      </Box>
      <Box sx={{
        minWidth: 100, my: 'auto', display: 'flex', justifyContent: 'center', '@media (max-width: 800px)': { fontSize: '10px', minWidth: 75 }, '@media (max-width: 500px)': { fontSize: '8px', minWidth: 50 },
      }}
      >
        <Typography sx={{
          color: 'grey', fontWeight: 'bold', fontSize: '12px', '@media (max-width: 800px)': { fontSize: '10px' }, '@media (max-width: 500px)': { fontSize: '8px' },
        }}
        >
          {parseDate(email.createdAt).toLowerCase() === 'today' ? hourOfDay(email.createdAt) : parseDate(email.createdAt)}
        </Typography>
      </Box>
    </Box>
  );
}
EmailBlock.propTypes = {
  email: PropTypes.object.isRequired,
  avatar: PropTypes.string,
  selected: PropTypes.func.isRequired,
};

export default EmailBlock;
