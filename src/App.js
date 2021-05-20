import './App.css';
import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      content: null,
      number: '',
      tabledata: []
    }
  }

  changeHandler = (event) => {
    this.setState({ number: event.target.value });
  }
  readMyFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open('GET', file);
    rawFile.onreadystatechange = () => {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
          var allText = rawFile.responseText;
          this.setState({ content: allText });
          this.printDataInTable(this.state.content);
        }
      }
    };
    rawFile.send(null);
  };
  onSumitHandler = (event) => {
    event.preventDefault();
    this.readMyFile('https://raw.githubusercontent.com/invictustech/test/main/README.md');
  }

  printDataInTable(fileContent) {
    let result = this.findFrequency(fileContent, this.state.number);
    console.log(result, "Result");
    this.setState({ tabledata: result });

  };

  findFrequency = (str = '', num = 1) => {
    const strArr = str.split(' ');
    const map = {};
    strArr.forEach(word => {
      if (map.hasOwnProperty(word)) {
        map[word]++;
      } else {
        map[word] = 1;
      }
    });
    const frequencyArr = Object.keys(map).map(key => {
      return [{ occurance: map[key], wordname: key }];
    });
    frequencyArr.sort((a, b) => {
      return b[0].occurance - a[0].occurance;
    });
    return frequencyArr.slice(0, num).map(el => el[0]);
  };

  render() {
    
    return (
      <div className="App">
       
        <h1>Top N Occuring words</h1>
        <form  method="post">
          <input id="input"
            type='number' min='0' 
            required="required"
            placeholder="Type a number"
            onChange={this.changeHandler}
            
          />
          <button id="btn" type="submit" onClick={this.onSumitHandler} >Submit</button>

        </form>
        <h2>Top {this.state.number} words and their frequency of occurrence :</h2>
        <div id ="main">
          <table id="table" align="center" >
            <thead >
              <tr>
                <th>Word </th>
                <th>Frequency</th>
              </tr>
            </thead>
            <tbody>
              {this.state.tabledata && this.state.tabledata.map(word => {
                return <tr align="center" >
                  <td>{word.occurance}</td>
                  <td>{word.wordname}</td>
                </tr>
              })}
            </tbody>
          </table>
        </div>

      </div>
    );
  };
}

export default App;
