import { useGameController } from './components/game-controller/GameController';
import { Grid } from './components/grid/Grid';

export const App = () => {
  const { gridData, isRunning, handleStart, handleStop, handleReset } = useGameController();

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
		</div>
	);
};
