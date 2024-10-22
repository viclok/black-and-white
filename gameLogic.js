class Game {
    constructor() {
        this.players = {};
    }

    addPlayer(id) {
        this.players[id] = { score: 0 };
    }

    removePlayer(id) {
        delete this.players[id];
    }

    updateScore(id, points) {
        if (this.players[id]) {
            this.players[id].score += points;
        }
    }

    getScores() {
        return this.players;
    }
}

module.exports = Game;
