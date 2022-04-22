import './App.css';
import { Component } from 'react';
import Demo from './components/demo';
// import { fetchData } from './components/fetch.utils';

type counterProps = {
  title?: string
}

type kitten = {
  name: string;
  email: string;
  id: number;
}
type counterState ={
  count: number,
  showDemo: boolean,
  kittens: kitten[]
}

class App extends Component <counterProps, counterState>{
  constructor(props: counterProps){
    super(props);

    this.state={
      count: 0,
      showDemo: false,
      kittens: [],
    }
  }

  static getDerivedStateFromProps(props: counterProps, state: counterState ): counterState | null {
    console.log("I am getDerivedStateFromProps")
    return false ? { ...state, count: 2  } : null
  }

  componentDidMount(): void{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(data => {
      this.setState({kittens: data})
      console.log(data)
    })
    .catch((error) => console.log(error));
  }

  shouldComponentUpdate(nextProps: counterProps, nextState: counterState): boolean{
    if (
      nextProps.title !== this.props.title || 
      nextState.count !== this.state.count || 
      nextState.showDemo !== this.state.showDemo ||
      nextState.kittens !== this.state.kittens
    ) {
      console.log(
        "I am ShouldComponentupdate with next state "
        + nextState.count+" and current state "+ this.state.count
      )
      return true;
    } else {
      return false;
    }
  }

  getSnapshotBeforeUpdate(prevProps: counterProps, prevState: counterState): counterState {
    console.log("I am getSnapShotBeforeUpdate")
    return prevState;
  }

  componentDidUpdate(
    prevProps: counterProps, prevState: counterState, snapShot: { count: number}
  ): void {
    console.log(
      `I am ComponentDidupdate with previous ${prevProps.title} ${prevState.count} 
      and current count ${this.state.count} and snapShot ${snapShot.count}`
    )
  }

  handleClickIncrement = () => {
    this.setState((prevState) => ({ 
      count: prevState.count+1
    }))
  }

  handleClickDemo = ()=> {
    this.setState((prevState) => ({ 
      showDemo: !prevState.showDemo
    }))
  }
  render() {
    return (
      <div className="App">
        <h1>TypeScript project</h1>
        <h3>{this.props.title}{this.state.count}</h3>
        <button onClick={this.handleClickIncrement}>+1</button>
        <div>
        { this.state.showDemo && <Demo />}
        <button onClick={this.handleClickDemo}>show Demo</button>
        </div>
          {this.state.kittens.map((kitten) => {
            return <h2 key={kitten.id}>{kitten.name}</h2>;
          })}
      </div>
    );
  }
}

export default App;
