import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { gameAPI } from '../services/api';
import { Play, Target, Coins, DollarSign } from 'lucide-react';

export const GameDashboard: React.FC = () => {
  const { user, updateCash } = useAuth();
  const [gameValue, setGameValue] = useState(1);
  const [loading, setLoading] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [message, setMessage] = useState('');

  const startGame = async () => {
    if (!user || user.cash < gameValue) {
      setMessage('Insufficient balance!');
      return;
    }

    setLoading(true);
    try {
      await gameAPI.startGame(gameValue);
      updateCash(user.cash - gameValue);
      setGameActive(true);
      setMessage(`Game started! You bet $${gameValue}`);
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'Failed to start game');
    } finally {
      setLoading(false);
    }
  };

  const killEnemy = async () => {
    setLoading(true);
    try {
      await gameAPI.killEnemy();
      const newCash = user!.cash + 0.85;
      updateCash(newCash);
      setMessage('Enemy killed! +$0.85 earned');
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'Failed to kill enemy');
    } finally {
      setLoading(false);
    }
  };

  const endGame = () => {
    setGameActive(false);
    setMessage('Game ended');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-green-500/30">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-green-400 mb-4">🐍 Slither Arena</h2>
          <p className="text-green-300 text-lg">
            Start a game, kill enemies, and earn cash!
          </p>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
            <p className="text-green-300 text-center">{message}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Game Controls */}
          <div className="space-y-6">
            <div className="bg-black/30 rounded-lg p-6 border border-green-500/20">
              <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center">
                <Play className="w-6 h-6 mr-2" />
                Game Controls
              </h3>

              {!gameActive ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-green-300 text-sm font-medium mb-2">
                      Bet Amount
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
                      <input
                        type="number"
                        min="0.1"
                        step="0.1"
                        value={gameValue}
                        onChange={(e) => setGameValue(parseFloat(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 bg-black/30 border border-green-500/50 rounded-lg text-white focus:outline-none focus:border-green-400"
                      />
                    </div>
                  </div>

                  <button
                    onClick={startGame}
                    disabled={loading || !user || user.cash < gameValue}
                    className="w-full flex items-center justify-center space-x-2 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-medium rounded-lg transition-colors"
                  >
                    <Play className="w-5 h-5" />
                    <span>{loading ? 'Starting...' : 'Start Game'}</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center py-4">
                    <div className="text-green-400 text-6xl mb-2">🎮</div>
                    <p className="text-green-300">Game Active!</p>
                  </div>

                  <button
                    onClick={killEnemy}
                    disabled={loading}
                    className="w-full flex items-center justify-center space-x-2 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-medium rounded-lg transition-colors"
                  >
                    <Target className="w-5 h-5" />
                    <span>{loading ? 'Killing...' : 'Kill Enemy (+$0.85)'}</span>
                  </button>

                  <button
                    onClick={endGame}
                    className="w-full py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                  >
                    End Game
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-6">
            <div className="bg-black/30 rounded-lg p-6 border border-green-500/20">
              <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center">
                <Coins className="w-6 h-6 mr-2" />
                Your Stats
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                  <span className="text-green-300">Current Balance:</span>
                  <span className="text-yellow-400 font-bold text-lg">
                    ${user?.cash.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                  <span className="text-green-300">Game Status:</span>
                  <span className={`font-bold ${gameActive ? 'text-green-400' : 'text-gray-400'}`}>
                    {gameActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                {gameActive && (
                  <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                    <span className="text-green-300">Current Bet:</span>
                    <span className="text-blue-400 font-bold">
                      ${gameValue.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Game Rules */}
            <div className="bg-black/30 rounded-lg p-6 border border-green-500/20">
              <h3 className="text-xl font-bold text-green-400 mb-4">How to Play</h3>
              <ul className="text-green-300 space-y-2 text-sm">
                <li>• Set your bet amount and start a game</li>
                <li>• Kill enemies to earn $0.85 each</li>
                <li>• Your bet is deducted when you start</li>
                <li>• Earn more than your bet to profit!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};