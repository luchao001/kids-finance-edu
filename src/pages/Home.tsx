import React from 'react';
import { Box, Container, Typography, Button, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: '趣味学习',
      description: '通过生动有趣的故事和动画，学习基础理财知识',
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      path: '/learn'
    },
    {
      title: '互动游戏',
      description: '玩游戏也能学理财，边玩边学更有趣',
      icon: <SportsEsportsIcon sx={{ fontSize: 40 }} />,
      path: '/games'
    },
    {
      title: '成长奖励',
      description: '完成任务获得奖励，培养良好的理财习惯',
      icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
      path: '/rewards'
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pt: 8, pb: 8 }}>
      <Container>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h1" sx={{ mb: 2 }}>
            欢迎来到小小理财家
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, color: 'text.secondary' }}>
            让孩子从小培养正确的理财观念，快乐学习理财知识
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => navigate('/learn')}
            sx={{ mr: 2 }}
          >
            开始学习
          </Button>
          <Button
            variant="outlined"
            size="large"
            color="primary"
            onClick={() => navigate('/games')}
          >
            玩游戏
          </Button>
        </Box>

        {/* Features Section */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
          {features.map((feature, index) => (
            <Card
              key={index}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  transition: 'transform 0.3s ease-in-out'
                }
              }}
              onClick={() => navigate(feature.path)}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}; 