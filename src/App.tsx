import React, { useState, useEffect } from 'react';
import { PlayCircle, Trash2, Scale } from 'lucide-react';
import { Menu } from './components/Menu';
import { HowToPlay } from './components/HowToPlay';
import { ThemeToggle } from './components/ThemeToggle';
import { BalanceBeam } from './components/BalanceBeam';
import { NumberBlock } from './components/NumberBlock';
import { OperatorButton } from './components/OperatorButton';
import { CurrentOperation } from './components/CurrentOperation';
import { BalanceResult } from './components/BalanceResult';

interface Operation {
  id: string;
  num1: number;
  num2: number;
  operator: string;
  result: number;
}

const generateRandomNumbers = () => {
  const numbers = Array.from({ length: 6 }, () => Math.floor(Math.random() * 9) + 1);
  return numbers;
};

const App: React.FC = () => {
  const [leftNumbers, setLeftNumbers] = useState<number[]>(generateRandomNumbers());
  const [rightNumbers, setRightNumbers] = useState<number[]>(generateRandomNumbers());
  const [leftOperations, setLeftOperations] = useState<Operation[]>([]);
  const [rightOperations, setRightOperations] = useState<Operation[]>([]);
  const [selectedNumber1, setSelectedNumber1] = useState<number | null>(null);
  const [selectedNumber2, setSelectedNumber2] = useState<number | null>(null);
  const [selectedOperator, setSelectedOperator] = useState<string | null>(null);
  const [selectedSide, setSelectedSide] = useState<'left' | 'right'>('left');
  const [showHowToPlay, setShowHowToPlay] = useState(true);
  const [showBalanceResult, setShowBalanceResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const operators = ['+', '-', '*', '/'];

  const calculateResult = (num1: number, num2: number, operator: string): number => {
    switch (operator) {
      case '+': return num1 + num2;
      case '-': return num1 - num2;
      case '*': return num1 * num2;
      case '/': return num1 / num2;
      default: return 0;
    }
  };

  const leftTotal = leftOperations.reduce((sum, op) => sum + op.result, 0);
  const rightTotal = rightOperations.reduce((sum, op) => sum + op.result, 0);

  const handleNumberClick = (num: number, side: 'left' | 'right') => {
    setSelectedSide(side);
    if (selectedNumber1 === num) {
      setSelectedNumber1(null);
    } else if (selectedNumber2 === num) {
      setSelectedNumber2(null);
    } else if (!selectedNumber1) {
      setSelectedNumber1(num);
    } else if (!selectedNumber2) {
      setSelectedNumber2(num);
    }
  };

  const handleOperatorClick = (op: string) => {
    setSelectedOperator(op);
  };

  const handleAddOperation = (side: 'left' | 'right') => {
    if (!selectedNumber1 || !selectedNumber2 || !selectedOperator) return;

    const result = calculateResult(selectedNumber1, selectedNumber2, selectedOperator);
    const operation: Operation = {
      id: Date.now().toString(),
      num1: selectedNumber1,
      num2: selectedNumber2,
      operator: selectedOperator,
      result,
    };

    if (side === 'left') {
      setLeftOperations([...leftOperations, operation]);
      setLeftNumbers(leftNumbers.filter(n => n !== selectedNumber1 && n !== selectedNumber2));
    } else {
      setRightOperations([...rightOperations, operation]);
      setRightNumbers(rightNumbers.filter(n => n !== selectedNumber1 && n !== selectedNumber2));
    }

    setSelectedNumber1(null);
    setSelectedNumber2(null);
    setSelectedOperator(null);
  };

  const handleCheckBalance = () => {
    setShowBalanceResult(true);
    if (leftTotal === rightTotal) {
      setGameComplete(true);
    }
  };

  const handleGiveUp = () => {
    setGameComplete(true);
    setShowBalanceResult(false);
  };

  const handleRemoveOperation = (id: string, side: 'left' | 'right') => {
    if (side === 'left') {
      const operation = leftOperations.find(op => op.id === id);
      if (operation) {
        setLeftNumbers([...leftNumbers, operation.num1, operation.num2]);
        setLeftOperations(leftOperations.filter(op => op.id !== id));
      }
    } else {
      const operation = rightOperations.find(op => op.id === id);
      if (operation) {
        setRightNumbers([...rightNumbers, operation.num1, operation.num2]);
        setRightOperations(rightOperations.filter(op => op.id !== id));
      }
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Number Balance Game',
          text: `I balanced the numbers! Left total: ${leftTotal}, Right total: ${rightTotal}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  const resetGame = () => {
    setLeftNumbers(generateRandomNumbers());
    setRightNumbers(generateRandomNumbers());
    setLeftOperations([]);
    setRightOperations([]);
    setSelectedNumber1(null);
    setSelectedNumber2(null);
    setSelectedOperator(null);
    setGameComplete(false);
    setShowBalanceResult(false);
  };

  const renderSide = (side: 'left' | 'right') => {
    const numbers = side === 'left' ? leftNumbers : rightNumbers;
    const operations = side === 'left' ? leftOperations : rightOperations;
    const total = side === 'left' ? leftTotal : rightTotal;
    const isCurrentSide = selectedSide === side;

    return (
      <div className="bg-white dark:bg-dark-card rounded-xl p-4 shadow-lg space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            {side.charAt(0).toUpperCase() + side.slice(1)} Side
          </h2>
          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {total}
          </span>
        </div>

        <div className="relative">
          <CurrentOperation
            number1={isCurrentSide ? selectedNumber1 : null}
            number2={isCurrentSide ? selectedNumber2 : null}
            operator={isCurrentSide ? selectedOperator : null}
          >
            <button
              onClick={() => handleAddOperation(side)}
              disabled={!isCurrentSide || !selectedNumber1 || !selectedNumber2 || !selectedOperator}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2
                       text-indigo-600 dark:text-indigo-400
                       disabled:opacity-50 disabled:cursor-not-allowed
                       hover:text-indigo-700 transition-colors"
            >
              <PlayCircle size={24} />
            </button>
          </CurrentOperation>
        </div>

        <div className="flex gap-4">
          <div className="w-[55%] grid grid-cols-3 gap-2">
            {numbers.map((num, index) => (
              <NumberBlock
                key={`${side}-${num}-${index}`}
                number={num}
                onClick={() => handleNumberClick(num, side)}
                isSelected={
                  (selectedNumber1 === num || selectedNumber2 === num) && 
                  selectedSide === side
                }
              />
            ))}
          </div>

          <div className="w-[40%] grid grid-cols-2 gap-2">
            {operators.map((op) => (
              <OperatorButton
                key={op}
                operator={op}
                onClick={() => handleOperatorClick(op)}
                isSelected={selectedOperator === op && isCurrentSide}
              />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {operations.map((op) => (
            <div
              key={op.id}
              className="flex items-center justify-between bg-gray-50 dark:bg-dark-hover p-3 rounded-lg"
            >
              <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                {op.num1} {op.operator} {op.num2} = {op.result}
              </span>
              <button
                onClick={() => handleRemoveOperation(op.id, side)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dark-bg p-4 transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            Number Balance
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={handleCheckBalance}
              disabled={gameComplete}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg
                       hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Scale size={20} />
              Check Balance
            </button>
            <ThemeToggle />
            <Menu
              onShowHowToPlay={() => setShowHowToPlay(true)}
              onNewGame={resetGame}
              onShare={handleShare}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {renderSide('left')}
          {renderSide('right')}
        </div>

        <div className="my-8">
          <BalanceBeam leftWeight={leftTotal} rightWeight={rightTotal} />
        </div>

        {showHowToPlay && (
          <HowToPlay
            onClose={() => setShowHowToPlay(false)}
            onDontShowAgain={() => {
              setShowHowToPlay(false);
              localStorage.setItem('hideHowToPlay', 'true');
            }}
          />
        )}

        {showBalanceResult && (
          <BalanceResult
            isBalanced={leftTotal === rightTotal}
            leftTotal={leftTotal}
            rightTotal={rightTotal}
            onClose={() => setShowBalanceResult(false)}
            onGiveUp={handleGiveUp}
            onShare={handleShare}
          />
        )}
      </div>
    </div>
  );
};

export default App;