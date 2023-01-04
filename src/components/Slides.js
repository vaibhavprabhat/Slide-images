import React from 'react';
import "../App.css"
class Slides extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSlide: 0,
      nextDisabled: false,
      prevDisabled: false,
    };

    this.prevHandler = this.prevHandler.bind(this);
    this.nextHandler = this.nextHandler.bind(this);
    this.resandler = this.resandler.bind(this);
  }

  nextHandler() {
    this.setState((prevState, props) => {
      if (prevState.currentSlide < this.props.slides.length - 1) {
        return {
          currentSlide: prevState.currentSlide + 1,
          prevDisabled: false,
        };
      } else if (prevState.currentSlide === this.props.slides.length - 1) {
        return {
          nextDisabled: true,
          prevDisabled: false,
        };
      }
    });
  }

  prevHandler() {
    this.setState((prevState, props) => {
      if (prevState.currentSlide === 0) {
        return { prevDisabled: true };
      } else if (prevState.currentSlide > 0) {
        return {
          currentSlide: prevState.currentSlide - 1,
          nextDisabled: false,
        };
      }
    });
  }

  resandler() {
    this.setState({
      currentSlide: 0,
      nextDisabled: false,
      prevDisabled: true,
    });
  }

  componentDidMount() {
    this.setState((prevState, props) => {
      if (prevState.currentSlide === 0) {
        return { prevDisabled: true };
      }
    });
  }

  render() {
    const { slides } = this.props;
    return (
      <div className="container">
        <div id="navigation">
          <div className="btn">
            <button
              data-testid="button-restart"
              onClick={this.resandler}
              data-testid="button-restart"
              disabled={this.state.currentSlide === 0}>
              Restart
            </button>
            <button
              data-testid="button-prev"
              onClick={this.prevHandler}
              data-testid="button-prev"
              disabled={this.state.currentSlide === 0}>
              Prev
            </button>
            <button
              data-testid="button-next"
              onClick={this.nextHandler}
              data-testid="button-next"
              disabled={
                this.state.currentSlide === this.props.slides.length - 1
              }>
              Next
            </button>
          </div>
        </div>

        {slides.map((slide, i) => {
          return i === this.state.currentSlide ? (
            <div id="slide" key={slide + i}>
              <div className="title">
                <h1 data-testid="title">{slide.title}</h1>
              </div>
              <div className="img-container">
                <img src={slide.thumbnailUrl} />
              </div>
            </div>
          ) : null;
        })}
      </div>
    );
  }
}

export default Slides;
