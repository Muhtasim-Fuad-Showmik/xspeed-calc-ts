import './App.css';
import ResultsContainer from './components/resultsContainer';
import InputPanel from './components/inputPanel';

const App = () => {
    const onFileChange = (files) => {
        console.log(files);
    }

    return (
        <div className="App">
            <main className="App-container">
                <ResultsContainer />
                <InputPanel 
                    onFileChange={(files) => onFileChange(files)}
                />
            </main>
        </div>
    );;
}
 
export default App;