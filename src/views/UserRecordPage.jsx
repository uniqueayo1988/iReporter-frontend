import React from 'react';
import RecordView from '../components/RecordView';
import { Nav } from '../components/Nav';
import SideNav from '../components/SideNav';
import Footer from '../components/Footer';

class UserRecordPage extends React.Component {
  state = {
    showSignout: false,
  }

  render() {
    const { showSignout } = this.state;
    return (
      <div>
        <header>
          <Nav showSignout={showSignout} />
        </header>
        <main>
          <SideNav />
          <div className="main-div">
            <RecordView />
          </div>
        </main>
        <div className="clear" />
        <Footer />
      </div>
    );
  }
}


export default UserRecordPage;
