import React from 'react';
import PropTypes from 'prop-types';

import Guest from './Guest';
import PendingGuest from './PendingGuest';

const GuestList = props =>
  <ul>
   <PendingGuest name={props.pendingGuest} />   
   {props.guests
    .filter(guests => !props.isFiltered || guests.isConfirmed)
    .map((guest, index) =>   
    <Guest 
      key={index} 
      name={guest.name} 
      isConfirmed={guest.isConfirmed}
      isEditing={guest.isEditing}
      handleConfirmation={() => props.tuggleConfirmationAt(index)}
      handleToggleEditing={() => props.tuggleEditingAt(index)}
      setName={text => props.setNameAt(text, index)} 
      handleRemove={() => props.removeGuestAt(index) } />
   )}
</ul>;

GuestList.propTypes = {
  guests: PropTypes.array.isRequired,
  tuggleConfirmationAt: PropTypes.func.isRequired,
  tuggleEditingAt: PropTypes.func.isRequired,
  setNameAt: PropTypes.func.isRequired,
  isFiltered: PropTypes.bool.isRequired,
  removeGuestAt: PropTypes.func.isRequired,
  pendingGuest: PropTypes.string.isRequired
}

export default GuestList;