import React from 'react';
import Nav from '../components/Nav';
import SideNav from '../components/SideNav';
import Footer from '../components/Footer';

class ProfilePage extends React.Component {
  state = {
    showSignout: false,
    // firstName: 'ayo'
  }

  render() {
    // const { showSignout, firstName } = this.state;
    const { showSignout } = this.state;
    return (
      <div>
        <header>
          <Nav showSignout={showSignout} />
        </header>
        <main className="db-body">
          <SideNav />
        </main>
        <h1>Profile Page</h1>
        <Footer />
      </div>
    );
  }
}

export default ProfilePage;
