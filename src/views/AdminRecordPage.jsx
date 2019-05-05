import React from 'react';
import RecordView from '../components/RecordView';
import Nav from '../components/Nav';
import AdminSideNav from '../components/AdminSideNav';
import Footer from '../components/Footer';

class AdminRecordPage extends React.Component {
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
        <main className="db-body">
          <AdminSideNav />
          <div className="main-div">
            <h1 className="db-header">ADMIN DASHBOARD</h1>
            <hr />
            <RecordView reportUrl="user" />
            <div className="statusContainer" style={{ width: '80%', margin: 'auto', padding: '20px 0' }}>
              <br />
              <br />
              <button type="button" id="statusBtn">Status</button>
              <select id="status">
                <option value="">Update status</option>
                <option>draft</option>
                <option>resolved</option>
                <option>rejected</option>
                <option>under investigation</option>
              </select>
            </div>
          </div>
          <div className="clear" />
        </main>
        <Footer />
      </div>
    );
  }
}


export default AdminRecordPage;
