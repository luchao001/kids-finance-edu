import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';

interface LessonContent {
  title: string;
  content: string;
  tips: string[];
}

export const Learn: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<LessonContent | null>(null);

  const lessons = [
    {
      id: 1,
      title: '认识钱币',
      description: '了解货币的基本概念和使用',
      image: 'https://img.freepik.com/free-vector/realistic-yuan-banknotes-set_23-2147585657.jpg',
      content: {
        title: '认识钱币',
        content: '钱是我们日常生活中非常重要的东西。它可以帮助我们购买需要的物品，也可以储存起来以备将来使用。在中国，我们使用的货币叫做人民币。',
        tips: [
          '1元等于10角，1角等于10分',
          '保管好自己的钱，不要随意借给他人',
          '爱惜钱币，不要在钱币上乱画乱写'
        ]
      }
    },
    {
      id: 2,
      title: '储蓄的重要性',
      description: '学习如何储蓄和管理零花钱',
      image: 'https://img.freepik.com/free-vector/hand-drawn-saving-money-concept_23-2148793153.jpg',
      content: {
        title: '储蓄的重要性',
        content: '储蓄就像是给未来的自己存钱。当我们把钱存起来，它不仅能帮我们实现心愿，还能在紧急时刻帮助我们。',
        tips: [
          '制定储蓄目标，例如想买的玩具或书籍',
          '使用储蓄罐或卡通钱包来存钱',
          '每次收到零花钱，先存一部分再使用'
        ]
      }
    },
    {
      id: 3,
      title: '明智的消费',
      description: '学习如何做出明智的消费决定',
      image: 'https://img.freepik.com/free-vector/shopping-cart-realistic_1284-6011.jpg',
      content: {
        title: '明智的消费',
        content: '在花钱之前，我们需要思考这件物品是否真的需要。区分"需要"和"想要"可以帮助我们做出更好的选择。',
        tips: [
          '购物前列出清单，避免冲动消费',
          '比较不同商品的价格和质量',
          '考虑物品是否真的必需'
        ]
      }
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <Container>
        <Typography variant="h2" sx={{ mb: 4, textAlign: 'center' }}>
          趣味理财课堂
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 4 }}>
          {lessons.map((lesson) => (
            <Card 
              key={lesson.id}
              sx={{ 
                height: '100%',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.02)',
                  transition: 'transform 0.3s ease-in-out'
                }
              }}
              onClick={() => setSelectedLesson(lesson.content)}
            >
              <CardMedia
                component="img"
                height="200"
                image={lesson.image}
                alt={lesson.title}
                sx={{
                  objectFit: 'cover',
                  backgroundColor: 'background.paper'
                }}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/400x300?text=理财课程';
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {lesson.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {lesson.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Dialog
          open={Boolean(selectedLesson)}
          onClose={() => setSelectedLesson(null)}
          maxWidth="sm"
          fullWidth
        >
          {selectedLesson && (
            <>
              <DialogTitle>{selectedLesson.title}</DialogTitle>
              <DialogContent>
                <Typography paragraph>{selectedLesson.content}</Typography>
                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                  小贴士：
                </Typography>
                {selectedLesson.tips.map((tip, index) => (
                  <Typography key={index} paragraph>
                    {tip}
                  </Typography>
                ))}
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setSelectedLesson(null)}>关闭</Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </Box>
  );
}; 