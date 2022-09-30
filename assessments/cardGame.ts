type Card = {
  suit: string,
  value: number
} | null

const arrShuffle = (array: any[]) => {
  let currentIndex: number = array.length;
  let randomIndex: number;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

class Deck {
  public deckOfCards: Array<Card> = [];

  constructor() {
    this.generateNewDeck();
  }

  private generateNewDeck(): void {
    const cardSuit = ["club", "diamonds", "hearts", "spades"];
    const cardValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    for (let i = 0; i < cardSuit.length; i++) {
      for (let j = 0; j < cardValue.length; j++) {
        switch (cardValue[j]) {
          case 1:
            this.deckOfCards.push({
              suit: "ace",
              value: cardValue[j]
            });
            break;
          case 11:
            this.deckOfCards.push({
              suit: "jack",
              value: cardValue[j]
            });
            break;
          case 12:
            this.deckOfCards.push({
              suit: "queen",
              value: cardValue[j]
            });
            break;
          case 12:
            this.deckOfCards.push({
              suit: "king",
              value: cardValue[j]
            });
            break;
          default:
            this.deckOfCards.push({
              suit: cardSuit[i],
              value: cardValue[j]
            });
            break;
        }
      }
    }
  }

  public shuffleDeck(): void {
    this.deckOfCards = arrShuffle(this.deckOfCards);
  }

  public drawCard(deck: Array<Card>): Card | undefined {
    const randomIndex = Math.floor(Math.random() * deck.length);

    return deck[randomIndex];
  }

}

class WarCardGame extends Deck {

  public splitDeck(): Array<Array<Card>> {
    const deck1 = this.deckOfCards.slice(0, this.deckOfCards.length / 2);
    const deck2 = this.deckOfCards.slice((this.deckOfCards.length / 2), this.deckOfCards.length);
    return [deck1, deck2];
  }

  private declareWar(deck1: Array<Card>, deck2: Array<Card>, startingCards: number): { winner: "player1" | "player2" | "tie", cardsCollected: number } | null {
    let player1Score = 0;
    let player2Score = 0;

    for (let i = startingCards; i > 0; --i) {
      const deck1CurrentCard = this.drawCard(deck1);
      const deck2CurrentCard = this.drawCard(deck2);

      console.log("Player 1 card", deck1CurrentCard);
      console.log("Player 2 card", deck2CurrentCard);

      if (deck1CurrentCard && deck2CurrentCard) {
        if (deck1CurrentCard.value === deck2CurrentCard.value) {
          continue;
        }

        if (deck1CurrentCard.value > deck2CurrentCard.value) {
          console.log("Player 1 has the bigger value");
          player1Score = player1Score + 1;
        }
        if (deck2CurrentCard.value > deck1CurrentCard.value) {
          console.log("Player 2 has the bigger value");
          player2Score = player2Score + 1;
        }
      } else {
        continue;
      }
    }

    if (player1Score > player2Score) {
      return { winner: "player1", cardsCollected: player1Score }
    } else if (player2Score > player1Score) {
      return { winner: "player2", cardsCollected: player2Score }
    } else {
      return { winner: "tie", cardsCollected: 0 }
    }

  }

  public declareWinner(deck1: Array<Card>, deck2: Array<Card>): string | null {
    const war = this.declareWar(deck1, deck2, 26);

    if(war){
      switch(war.winner){
        case "player1":
          return `Player 1 is the winner with ${war.cardsCollected} cards`;
        case "player2":
          return `Player 2 is the winner with ${war.cardsCollected} cards`;
        case "tie": 
          return "There was a tie";
        default:
          return null
      }
    }

    return null;
  }
}

(() => {
  const newWarGame = new WarCardGame();

  newWarGame.shuffleDeck();

  const splitDecks: Array<Array<Card>> = newWarGame.splitDeck();

  const randomIndex = Math.floor(Math.random() * splitDecks.length);

  const player1Deck: Array<Card> = splitDecks[randomIndex];
  const player2Deck: Array<Card> = splitDecks[randomIndex === 0 ? 1 : 0];

  const winner = newWarGame.declareWinner(player1Deck, player2Deck);

  console.log(winner);
})()

