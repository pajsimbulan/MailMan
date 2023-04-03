import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { UserContext } from '../App';
import './Greet.css';
import { Avatar } from '@mui/material';

function Greet() {
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);
  const [showGreeting2, setShowGreeting2] = React.useState(false);

  React.useEffect(() => {
    // start the hand wave animation after 3 seconds (adjust as needed)
    setTimeout(() => {
     
    }, 3000);
  }, []);

  const handleAnimationEnd = () => {
    // display the greetingText2 text after the fadeIn animation has completed
    setShowGreeting2(true);
  };

  const greetingText = `Hello, ${userInfo.firstName}`;
  const splitText = greetingText.split('');
  const greetingText2 = `Lets check your mailbox`;
  const splitText2 = greetingText2.split('');

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        background: 'repeating-radial-gradient(#CCE3FA,#EDF6FF)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ my: 'auto', position: 'absolute', top: '30%' }}>
        <Avatar src="postman.jpg" sx={{ height: 100, width: 100, mx: 'auto' }} />
        <Box sx={{display:'flex', width:'100%', flexDirection:'column', textAlign:'center'}}>
            <div className='greetings-body-1'>
                {splitText.map((letter, index) => (
                <span
                    className="greeting-text greeting-text-font fadeIn"
                    key={index}
                    style={{ animationDelay: `${index * 100 }ms` }}
                    onAnimationEnd={index === splitText.length - 1 ? handleAnimationEnd : undefined}
                >
                    {letter}
                </span>
                ))}
            </div>
                <div className='greetings-body-2'>
                {showGreeting2 &&
                splitText2.map((letter, index) => (
                    <span
                    className="greeting-text greeting-text-font2 fadeIn"
                    key={index}
                    style={{ animationDelay: `${index * 50}ms` }}
                    onAnimationEnd={index === splitText.length - 1 ? ()=>{navigate('/main')} : undefined}
                    >
                    {letter}
                    </span>
                ))
                }
            </div>
        </Box>
      </Box>
    </Box>
  );
}

export default Greet;
