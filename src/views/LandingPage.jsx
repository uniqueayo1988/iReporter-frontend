import React from 'react';
import image from '../assets/img/fraud.jpg';
import { Nav } from '../components/Nav';
import SignupView from '../components/Signup';
import LoginView from '../components/Login';
import Footer from '../components/Footer';

export class LandingPage extends React.Component {
  state = {
    toggleSignUp: true,
    showSignout: true
  }

  handleOnClick = () => {
    const { toggleSignUp } = this.state;
    this.setState({ toggleSignUp: !toggleSignUp });
  }

  render() {
    const { toggleSignUp, showSignout } = this.state;
    return (
      <div>
        <header>
          <Nav
            handleOnClick={this.handleOnClick}
            toggleLogin={toggleSignUp}
            showSignout={showSignout}
          />
          <div className="header-content">
            <div className="left-content">
              <h1>Report corruption and issues that need government intervention.</h1>
              <p className="content-para">Let us curb corruption to aid economic development.</p>
            </div>
            {toggleSignUp ? <SignupView /> : <LoginView handleOnClick={this.handleOnClick} />}
            <div className="clear" />
          </div>
        </header>
        <main>
          <section className="main-works" id="how">
            <h2 className="works">HOW IT WORKS</h2>
            <hr className="works" />
            <p className="works">Have you sighted an incidence that needs to be reported?</p>
            <div className="work-body">
              <div className="work-step">
                <div className="how-card card-bg">
                  <h3 className="subheader-how">
                    Register as a user
                    <br />
                    <span className="work-icon"><i className="fa fa-user" /></span>
                  </h3>
                  <p>
                    Fill the form to register as an iReporter and have access to your dashboard.
                     Or login to your dashboard if you are already registered.
                  </p>
                </div>
              </div>
              <div className="work-step">
                <div className="how-card card-bgMid">
                  <h3 className="subheader-how">
                    Send Red flag or Intervention report
                    <br />
                    <span className="work-icon"><i className="fa fa-send-o" /></span>
                  </h3>
                  <p>
                    Write a report on an incident linked to corruption (Red-flag)
                     or a call for a government agency to intervene e.g flooding, inferno etc
                  </p>
                </div>
              </div>
              <div className="work-step">
                <div className="how-card card-bg">
                  <h3 className="subheader-how">
                    Report is investigated and resolved
                    <br />
                    <span className="work-icon"><i className="fa fa-check-square-o" /></span>
                  </h3>
                  <p>
                    Once your report is submitted, immediate action is taken
                     to investigate and authenticate your report before it is finally resolved.
                  </p>
                </div>
              </div>
              <div className="clear" />
            </div>
          </section>
          <section className="media">
            <div className="img">
              <h3>Send us red-flag report images</h3>
              <img src={image} alt="red-flag" />
            </div>
            <div className="vdo">
              <h3>Intervention report video</h3>
              <iframe
                title="iReporter"
                width="853"
                height="480"
                src="https://www.youtube.com/embed/8jJ3lsy44Lg"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="clear" />
          </section>
        </main>
        <Footer />
      </div>
    );
  }
}

export default LandingPage;
