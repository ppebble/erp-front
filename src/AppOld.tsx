// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '../public/vite.svg';
// import './css/App.css';
// import testService, { TestService } from './services/testService';
// import { getSampleParams } from './store/sample/sampleRequest';

// const App = () => {
// 	const [myCount, setMyCount] = useState(0);
// 	const data1 = testService().postMutation;
// 	const data2 = testService().getMutation;

// 	// const getParams: baseParams[] = [
// 	// 	{ key: 'empNo', value: '18-182' },
// 	// 	{ key: 'offset', value: 10 },
// 	// 	{ key: 'limit', value: 20 },
// 	// ];
// 	const getParams: getSampleParams = {
// 		empNo: '18-182',
// 		offset: 0,
// 		limit: 10,
// 	};
// 	const clickEvent1 = () => {
// 		data1.mutate({ id: 'smlee', pwd: 'smlee' });
// 	};
// 	const clickEvent2 = () => {
// 		data2.mutate(getParams);
// 		// console.log(JSON.stringify(data2));
// 	};

// 	return (
// 		<>
// 			<div>
// 				<a href="https://vitejs.dev" target="_blank" rel="noreferrer">
// 					<img src={viteLogo} className="logo" alt="Vite logo" />
// 				</a>
// 				<a href="https://react.dev" target="_blank" rel="noreferrer">
// 					<img src={reactLogo} className="logo react" alt="React logo" />
// 				</a>
// 			</div>
// 			<h1>Vite + React</h1>
// 			<div className="card">
// 				<button
// 					onClick={() => {
// 						setMyCount((count) => count + 1);
// 						console.log(import.meta.env.VITE_BASE_URL);
// 					}}
// 				>
// 					count is {myCount}
// 				</button>

// 				<button onClick={clickEvent1}>postTest</button>
// 				<button onClick={clickEvent2}>getTest</button>
// 				<p>
// 					Edit <code>src/App.tsx</code> and save to test HMR
// 				</p>
// 			</div>
// 			<p className="read-the-docs">Click on the Vite and React logos to learn more</p>
// 		</>
// 	);
// };

// export default App;
