import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


const baseURL = "http://api.quotable.io/random";



export default function App(){
    const [quote,setRandomQuote] = useState('');
    const [randomColor,setRandomColor] = useState({
        color:'#'+Math.floor(Math.random()*16777215).toString(16),
    });

    const update = () => {
        axios.get(baseURL)
        .then((res)=>{
            setRandomQuote(res.data);
        });
        setRandomColor({
            color:'#'+Math.floor(Math.random()*16777215).toString(16),
        });
        
    }
    

    useEffect(update,[]);
    
    return(
        <div>
            <QuoteCard 
            quote={quote.content}
            author={quote.author}
            handleClick={update}
            textStyles={randomColor}
            />
        </div>
    )
}

function QuoteCard(props){
    return(
        <div id="quoteCard" className="card shadow p-3">
            <div className="text-center quoteText">
                <h3 className="bold lead" style={props.textStyles}>{props.quote}</h3>
            </div>
            <div className="quoteAuthor">
                <p className="float-end" style={props.textStyles}>- {props.author}</p>
            </div>
            <div className="buttons d-flex justify-content-between">
                <div className="social-buttons d-flex justify-content-between">
                    <button className="btn btn-secondary m-1">
                    <i className="fab fa-twitter"></i>
                    </button>
                    <button className="btn btn-secondary m-1">
                    <i className="fab fa-instagram"></i>
                    </button>
                </div>
                <div>
                    <button className="btn btn-secondary" onClick={props.handleClick}>Generate</button>
                </div>
            </div>
        </div>
    );
}
 

ReactDOM.render(<App/>,document.getElementById('root'))