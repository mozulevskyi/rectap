import React, { Component } from 'react';
import './App.css';

import GuestList from './GuestList';
import Counter from './Counter';

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

  removeGuestAt = index =>
    this.setState({
      guests: [
        ...this.state.guests.slice(0, index),
        ...this.state.guests.slice(index + 1)
      ]
    });

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

  getAttendingGuests = () => 
    this.state.guests.reduce(
      (total, guest) => guest.isConfirmed ? total + 1 : total, 
    0
  );

  render() {
    const totalInvited = this.getTotalInvaited();
    const numberAttending = this.getAttendingGuests();
    const numberUnconfirmed = totalInvited - numberAttending;
    
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
        <Counter
          totalInvited={totalInvited}
          numberAttending={numberAttending}
          numberUnconfirmed={numberUnconfirmed} />
      
        <GuestList
          guests={this.state.guests}
          tuggleConfirmationAt={this.tuggleConfirmationAt}
          tuggleEditingAt={this.tuggleEditingAt}
          setNameAt={this.setNameAt}
          isFiltered={this.state.isFiltered}
          removeGuestAt={this.removeGuestAt}
          pendingGuest={this.state.pendingGuest}
        />
      
      </div>
    </div>
    );
  }
}

export default App;
