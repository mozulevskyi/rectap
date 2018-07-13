import React, { Component } from 'react';
import './App.css';
import GuestList from './GuestList';

class App extends Component {
  
  state = {
    isFiltered: false,
    pendingGuest: "",
    guests: [
      {
        name: 'Picaso',
        isConfirmed: false,
        isEditing: false
      },
      {
        name: 'Avgustine',
        isConfirmed: true,
        isEditing: false
      }
    ]
  };

  tuggleGuestPropertyAt = (property, indexToChange) => 
    this.setState({
      guests: this.state.guests.map((guest, index)=> {
        if (index === indexToChange) {
          return {
            ...guest,
            [property]: !guest[property]
          };
        }
        return guest;
      })
    });

  tuggleConfirmationAt = index =>
    this.tuggleGuestPropertyAt("isConfirmed", index);

  tuggleEditingAt = index =>
    this.tuggleGuestPropertyAt("isEditing", index);

  setNameAt = (name, indexToChange) => 
    this.setState({
      guests: this.state.guests.map((guest, index)=> {
        if (index === indexToChange) {
          return {
            ...guest,
            name
          };
        }
        return guest;
      })
    });
  
  tuggleFilter =() => 
    this.setState({ isFiltered: !this.state.isFiltered });

  handleNameInput = e =>
    this.setState({ pendingGuest: e.target.value });
  
  newGuestSubmitHendler = e => {
    e.preventDefault();
    this.setState({
      guests: [
        {
          name: this.state.pendingGuest,
          isConfirmed: false,
          isEditing: false
        },
        ...this.state.guests
      ],
      pendingGuest: ""
    });
  }
  
  getTotalInvaited = () => this.state.guests.length;

  render() {
    return (
     <div className="App">
      <header>
        <h1>RSVP</h1>
        <p>A Sample React App</p>
        <form onSubmit={this.newGuestSubmitHendler}>
            <input 
              type="text"
              onChange={this.handleNameInput}
              value={this.state.pendingGuest}
              placeholder="Invite Someone" />
            <button type="submit" name="submit" value="submit">Submit</button>
        </form>
      </header>
      <div className="main">
        <div>
          <h2>Invitees</h2>
          <label>
            <input 
              type="checkbox" 
              onChange={this.tuggleFilter}
              checked={this.state.isFiltered} /> Hide those who have not responded
          </label>
        </div>
        <table className="counter">
          <tbody>
            <tr>
              <td>Attending:</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Unconfirmed:</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Total:</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
      
        <GuestList
          guests={this.state.guests}
          tuggleConfirmationAt={this.tuggleConfirmationAt}
          tuggleEditingAt={this.tuggleEditingAt}
          setNameAt={this.setNameAt}
          isFiltered={this.state.isFiltered}
        />
      
      </div>
    </div>
    );
  }
}

export default App;
