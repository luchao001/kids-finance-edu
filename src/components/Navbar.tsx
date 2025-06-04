import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontFamily: '"Comic Sans MS", cursive',
            fontSize: '1.5rem',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/')}
        >
          小小理财家
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" onClick={() => navigate('/learn')}>
            学习
          </Button>
          <Button color="inherit" onClick={() => navigate('/games')}>
            游戏
          </Button>
          <Button color="inherit" onClick={() => navigate('/rewards')}>
            奖励
          </Button>
          <Button color="inherit" onClick={() => navigate('/profile')}>
            我的
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}; 