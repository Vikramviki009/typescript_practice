import { Component } from "react";

class Demo extends Component{
    componentDidMount(): void{
        console.log('Demo component mounting')
      }

      componentWillUnmount(): void{
        alert('Let me unmount')
      }
    render(){
        return(
            <div>
                <h2>Demo Component</h2>
            </div>
        )
    }
}

export default Demo;