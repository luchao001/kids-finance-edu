import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';

interface Achievement {
  id: number;
  title: string;
  description: string;
  points: number;
  progress: number;
  maxProgress: number;
  reward: string;
}

export const Rewards: React.FC = () => {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [totalPoints, setTotalPoints] = useState(120);

  const achievements: Achievement[] = [
    {
      id: 1,
      title: '储蓄达人',
      description: '连续7天存钱',
      points: 50,
      progress: 5,
      maxProgress: 7,
      reward: '获得"储蓄达人"徽章和50积分'
    },
    {
      id: 2,
      title: '理财小能手',
      description: '完成3次理财小测试',
      points: 30,
      progress: 2,
      maxProgress: 3,
      reward: '获得"理财小能手"徽章和30积分'
    },
    {
      id: 3,
      title: '明智消费者',
      description: '完成5次模拟消费决策',
      points: 40,
      progress: 3,
      maxProgress: 5,
      reward: '获得"明智消费者"徽章和40积分'
    }
  ];

  const rewards = [
    {
      id: 1,
      title: '额外零花钱',
      points: 100,
      description: '可以获得20元额外零花钱'
    },
    {
      id: 2,
      title: '玩具商店代金券',
      points: 150,
      description: '获得30元玩具商店代金券'
    },
    {
      id: 3,
      title: '书店礼品卡',
      points: 200,
      description: '获得50元书店礼品卡'
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <Container>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h2" sx={{ mb: 2 }}>
            成长奖励
          </Typography>
          <Typography variant="h5" color="primary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <StarIcon /> 当前积分: {totalPoints}
          </Typography>
        </Box>

        <Typography variant="h4" sx={{ mb: 3 }}>
          成就进度
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4, mb: 6 }}>
          {achievements.map((achievement) => (
            <Card
              key={achievement.id}
              sx={{
                height: '100%',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  transition: 'transform 0.3s ease-in-out'
                }
              }}
              onClick={() => setSelectedAchievement(achievement)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmojiEventsIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">{achievement.title}</Typography>
                </Box>
                <Typography color="text.secondary" paragraph>
                  {achievement.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      进度: {achievement.progress}/{achievement.maxProgress}
                    </Typography>
                    <Typography variant="body2" color="primary">
                      +{achievement.points} 积分
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(achievement.progress / achievement.maxProgress) * 100}
                  />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Typography variant="h4" sx={{ mb: 3 }}>
          可兑换奖励
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
          {rewards.map((reward) => (
            <Card key={reward.id}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {reward.title}
                </Typography>
                <Typography color="text.secondary" paragraph>
                  {reward.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography color="primary">
                    <StarIcon sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                    {reward.points} 积分
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={totalPoints < reward.points}
                  >
                    兑换
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Dialog
          open={Boolean(selectedAchievement)}
          onClose={() => setSelectedAchievement(null)}
          maxWidth="xs"
          fullWidth
        >
          {selectedAchievement && (
            <>
              <DialogTitle>成就详情</DialogTitle>
              <DialogContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {selectedAchievement.title}
                </Typography>
                <Typography paragraph>
                  {selectedAchievement.description}
                </Typography>
                <Typography color="text.secondary" paragraph>
                  完成奖励：{selectedAchievement.reward}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    当前进度: {selectedAchievement.progress}/{selectedAchievement.maxProgress}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={(selectedAchievement.progress / selectedAchievement.maxProgress) * 100}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setSelectedAchievement(null)}>关闭</Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </Box>
  );
}; 