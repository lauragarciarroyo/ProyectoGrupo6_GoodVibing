import React, { Component } from "react";
import { useParams } from "react-router";

class Vote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: ["Me gusta"],
      newVote: "",
      votes: [],
    };
  }

  vote(key, type) {
    const votes = [...this.state.votes];
    const updatedVotes = votes.filter((item) => item.key !== key);

    if (this.isVoted(key, type)) {
      this.setState({
        votes: updatedVotes,
        newVote: "",
      });
      return;
    }

    const newVote = {
      key,
      type,
    };
    updatedVotes.push(newVote);

    this.setState({
      votes: updatedVotes,
      newVote: "",
    });
    const { id } = useParams;
    const res = fetch(
      `http://localhost:4000/api/stories/${id}/vote`,

      {
        method: "POST",
        body: JSON.stringify({ votes }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.ok) {
      const data = res.json();
      console.log(data);
    }
  }

  isVoted(key, type) {
    const votes = [...this.state.votes];
    return votes.filter((item) => item.key === key && item.type === type)
      .length;
  }

  render() {
    return (
      <div className="vote">
        <div>
          {this.state.authors.map((item) => {
            return (
              <div key={item}>
                {item}
                <button
                  onClick={() => this.vote(item, "up")}
                  className={this.isVoted(item, "up") ? "voted" : "no-voted"}
                >
                  Me gusta
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Vote;
