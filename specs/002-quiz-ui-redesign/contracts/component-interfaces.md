# Component Contracts

> Visual redesign — no new external APIs. These contracts define the internal component interfaces.

## LandingCard

```typescript
interface LandingCardProps {
  onCreateRoom: () => void
  onJoinRoom: () => void
  isLoading?: boolean
}
```

## JoinForm

```typescript
interface JoinFormProps {
  onSubmit: (roomCode: string, nickname: string) => void
  onBack: () => void
  isLoading?: boolean
  error?: string | null
}
```

## PlayerCard

```typescript
interface PlayerCardProps {
  nickname: string
  score?: number
  isHost?: boolean
  size?: 'sm' | 'md' | 'lg'
}
```

## AnswerButton

```typescript
interface AnswerButtonProps {
  index: 0 | 1 | 2 | 3
  text: string
  state: 'idle' | 'selected' | 'correct' | 'incorrect' | 'disabled'
  onPress: (index: number) => void
}
```

## AnswerGrid

```typescript
interface AnswerGridProps {
  answers: string[]
  selectedIndex: number | null
  correctIndex: number | null
  answered: boolean
  onSelect: (index: number) => void
  disabled?: boolean
}
```

## TimerBar

```typescript
interface TimerBarProps {
  remaining: number
  total: number
}
```

## QuizQuestion

```typescript
interface QuizQuestionProps {
  questionNumber: number
  totalQuestions: number
  questionText: string
  answers: string[]
  selectedIndex: number | null
  correctIndex: number | null
  answered: boolean
  timeRemaining: number
  timeTotal: number
  onSelectAnswer: (index: number) => void
  isHost: boolean
  onNext?: () => void
  onFinish?: () => void
}
```

## RankingBoard

```typescript
interface RankingBoardProps {
  players: Array<{
    nickname: string
    score: number
  }>
  onPlayAgain: () => void
}
```

## Toast

```typescript
interface ToastProps {
  id: string
  message: string
  type: 'error' | 'success' | 'info'
  action?: {
    label: string
    onClick: () => void
  }
  onDismiss: (id: string) => void
}
```
