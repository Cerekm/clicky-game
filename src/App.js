import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Score from "./components/Score";
import animals from "./cards.json";
import "./App.css";

class App extends Component {
  // Setting this.state.pups to the cards json array
  state = {
    animals,
    clickedAnimalIds: [],
    score: 0,
    goal: 8,
    status: ""
  };

  //shuffle the pup cards in the browser when clicked
  shuffleScoreCard = id => {
    let clickedAnimalIds = this.state.clickedAnimalIds;

    if(clickedAnimalIds.includes(id)){
      this.setState({ clickedAnimalIds: [], score: 0, status:  "Game Over! You lost." });
      return;
    }else{
      clickedAnimalIds.push(id)

      if(clickedAnimalIds.length === 8){
        this.setState({score: 8, status: "You Won!", clickedAnimalIds: []});
        console.log('You Win');
        return;
      }

      this.setState({ animals, clickedAnimalIds, score: clickedAnimalIds.length, status: " " });

      for (let i = animals.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [animals[i], animals[j]] = [animals[j], animals[i]];
      }
    }
  }

  // Map over this.state.cards and render a Card component for each card object
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Clicky Game</h1>
        </header>
        <Score total={this.state.score}
               goal={8}
               status={this.state.status}
               />
        <Wrapper>
          {this.state.animals.map(animal => (
            <Card
              shuffleScoreCard={this.shuffleScoreCard}
              id={animal.id}
              key={animal.id}
              image={animal.image}
            />
          ))}
        </Wrapper>
        
    </div>
    );
  }
}

export default App;
