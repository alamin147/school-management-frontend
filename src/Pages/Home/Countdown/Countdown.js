import React, { Component } from 'react';

class CountdownTimer extends Component {
  constructor(props) {
    super(props);

    // Initialize the total seconds for the countdown
    const totalSeconds = 15 * 24 * 60 * 60 + 14 * 60 * 60 + 23 * 60; // 125 days, 14 hours, 23 minutes
    this.state = {
      timeRemaining: totalSeconds,
    };
  }

  componentDidMount() {
    // Start the countdown timer when the component mounts
    this.interval = setInterval(this.updateTimer, 1000);
  }

  componentWillUnmount() {
    // Clear the interval when the component unmounts to prevent memory leaks
    clearInterval(this.interval);
  }

  updateTimer = () => {
    const { timeRemaining } = this.state;

    if (timeRemaining > 0) {
      // Decrease the timeRemaining state by 1 second
      this.setState((prevState) => ({
        timeRemaining: prevState.timeRemaining - 1,
      }));
    } else {
      clearInterval(this.interval); // Stop the countdown when it reaches 0
      // You can add code to perform an action when the countdown finishes here
    }
  };

  render() {
    const { timeRemaining } = this.state;

    // Calculate days, hours, minutes, and seconds from the total seconds
    const days = Math.floor(timeRemaining / (24 * 60 * 60));
    const hours = Math.floor((timeRemaining % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((timeRemaining % (60 * 60)) / 60);
    const seconds = timeRemaining % 60;

    return (<>

      <div className='flex justify-center mt-8'>

        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              {days}
            </span>
            days
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              {hours}
            </span>
            hours
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              {minutes}
            </span>
            min
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              {seconds}
            </span>
            sec
          </div>
        </div>
      </div>
    </>
    );
  }
}

export default CountdownTimer;
