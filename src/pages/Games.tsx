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

interface Game {
  id: number;
  title: string;
  description: string;
  image: string;
  type: 'quiz' | 'simulation';
  content: GameContent;
}

interface GameContent {
  questions?: Question[];
  simulation?: SimulationScenario;
}

interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
}

interface SimulationScenario {
  initialMoney: number;
  goals: string[];
  choices: Choice[];
}

interface Choice {
  text: string;
  cost: number;
  impact: string;
}

export const Games: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [simulationMoney, setSimulationMoney] = useState(0);
  const [decisions, setDecisions] = useState<string[]>([]);

  const games: Game[] = [
    {
      id: 1,
      title: '理财小测试',
      description: '测试你的理财知识掌握程度',
      image: 'https://img.freepik.com/free-vector/quiz-word-concept_23-2147844150.jpg',
      type: 'quiz',
      content: {
        questions: [
          {
            text: '储蓄的好处是什么？',
            options: [
              '可以随时花掉',
              '为未来做准备',
              '让钱变少',
              '没有好处'
            ],
            correctAnswer: 1
          },
          {
            text: '以下哪个是明智的消费行为？',
            options: [
              '看到喜欢的就买',
              '货比三家后再决定',
              '全部零花钱都花掉',
              '向同学借钱购物'
            ],
            correctAnswer: 1
          }
        ]
      }
    },
    {
      id: 2,
      title: '小小理财家',
      description: '模拟真实的理财场景',
      image: 'https://img.freepik.com/free-vector/money-saving-composition-with-hand-putting-coin-piggy-bank_1284-60193.jpg',
      type: 'simulation',
      content: {
        simulation: {
          initialMoney: 100,
          goals: ['存够钱买一本心仪的图书', '为生日派对储蓄'],
          choices: [
            {
              text: '购买一包零食',
              cost: 10,
              impact: '虽然美味，但会减少储蓄'
            },
            {
              text: '把钱存进储蓄罐',
              cost: -20,
              impact: '为未来储蓄是明智的选择'
            },
            {
              text: '买一本有趣的书',
              cost: 30,
              impact: '知识的投资总是值得的'
            }
          ]
        }
      }
    }
  ];

  const handleGameStart = (game: Game) => {
    setSelectedGame(game);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    if (game.type === 'simulation') {
      setSimulationMoney(game.content.simulation?.initialMoney || 0);
      setDecisions([]);
    }
  };

  const handleAnswerSubmit = (answerIndex: number) => {
    if (!selectedGame?.content.questions) return;

    const isCorrect = answerIndex === selectedGame.content.questions[currentQuestion].correctAnswer;
    if (isCorrect) setScore(score + 1);

    if (currentQuestion + 1 < selectedGame.content.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleSimulationChoice = (choice: Choice) => {
    setSimulationMoney(simulationMoney - choice.cost);
    setDecisions([...decisions, `${choice.text} (${choice.impact})`]);
  };

  const handleClose = () => {
    setSelectedGame(null);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSimulationMoney(0);
    setDecisions([]);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <Container>
        <Typography variant="h2" sx={{ mb: 4, textAlign: 'center' }}>
          趣味游戏
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 4 }}>
          {games.map((game) => (
            <Card
              key={game.id}
              sx={{
                height: '100%',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.02)',
                  transition: 'transform 0.3s ease-in-out'
                }
              }}
              onClick={() => handleGameStart(game)}
            >
              <CardMedia
                component="img"
                height="200"
                image={game.image}
                alt={game.title}
                sx={{
                  objectFit: 'cover',
                  backgroundColor: 'background.paper'
                }}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/400x300?text=趣味游戏';
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {game.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {game.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Dialog
          open={Boolean(selectedGame)}
          onClose={handleClose}
          maxWidth="sm"
          fullWidth
        >
          {selectedGame && (
            <>
              <DialogTitle>{selectedGame.title}</DialogTitle>
              <DialogContent>
                {selectedGame.type === 'quiz' && !showResult && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      问题 {currentQuestion + 1} / {selectedGame.content.questions?.length}
                    </Typography>
                    <Typography paragraph>
                      {selectedGame.content.questions?.[currentQuestion].text}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {selectedGame.content.questions?.[currentQuestion].options.map((option, index) => (
                        <Button
                          key={index}
                          variant="outlined"
                          onClick={() => handleAnswerSubmit(index)}
                        >
                          {option}
                        </Button>
                      ))}
                    </Box>
                  </Box>
                )}

                {selectedGame.type === 'quiz' && showResult && (
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      测试结果
                    </Typography>
                    <Typography paragraph>
                      你答对了 {score} 道题目，共 {selectedGame.content.questions?.length} 题
                    </Typography>
                    <Typography color="primary" variant="h5">
                      {score === selectedGame.content.questions?.length
                        ? '太棒了！你是理财小能手！'
                        : '继续加油！'}
                    </Typography>
                  </Box>
                )}

                {selectedGame.type === 'simulation' && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      当前余额: {simulationMoney} 元
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        目标:
                      </Typography>
                      {selectedGame.content.simulation?.goals.map((goal, index) => (
                        <Typography key={index} color="text.secondary">
                          • {goal}
                        </Typography>
                      ))}
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {selectedGame.content.simulation?.choices.map((choice, index) => (
                        <Button
                          key={index}
                          variant="outlined"
                          onClick={() => handleSimulationChoice(choice)}
                          disabled={simulationMoney < choice.cost}
                        >
                          {choice.text} ({choice.cost > 0 ? `-${choice.cost}` : `+${-choice.cost}`} 元)
                        </Button>
                      ))}
                    </Box>
                    {decisions.length > 0 && (
                      <Box sx={{ mt: 3 }}>
                        <Typography variant="subtitle1" sx={{ mb: 1 }}>
                          你的决定:
                        </Typography>
                        {decisions.map((decision, index) => (
                          <Typography key={index} color="text.secondary">
                            {index + 1}. {decision}
                          </Typography>
                        ))}
                      </Box>
                    )}
                  </Box>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>退出游戏</Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </Box>
  );
}; 