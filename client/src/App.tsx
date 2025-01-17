import { Draw, Participants } from './components';

function App() {
  return (
    <div className="h-screen w-screen flex flex-col bg-gray-800">
      <h1 className="text-3xl font-bold text-center">Secret Santa</h1>
      <div className="flex md:flex-row h-[95%] pt-3 flex-col">
        <Participants></Participants>
        <Draw></Draw>
      </div>
    </div>
  );
}

export default App;
