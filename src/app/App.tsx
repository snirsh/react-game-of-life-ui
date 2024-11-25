import { useGameController } from './components/game-controller/GameController';
import { Grid } from './components/grid/Grid';

export const App = () => {
  const { gridData, isRunning, handleStart, handleStop, handleReset, handleDot, handleBlock, handleGlider } = useGameController();

	return (
		<div className="App">
			<h1>Conway's Game of Life</h1>
			<Grid gridData={gridData} />
			<div className="controls">
				<button onClick={handleStart} disabled={isRunning}>
					Start
				</button>
				<button onClick={handleStop} disabled={!isRunning}>
					Stop
				</button>
				<button onClick={handleReset}>Reset</button>
			</div>
			<div className="examples-controls">
				<button onClick={handleDot}>
					Dot
				</button>
				<button onClick={handleBlock}>
					Block
				</button>
				<button onClick={handleGlider}>Glider</button>
			</div>
		</div>
	);
};
