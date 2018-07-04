import React from 'react';
import PropTypes from 'prop-types';
import Guest from './Guest';

const GuestList = props =>
  <ul>
   {props.guests.map((guest, index) =>   
    <Guest 
    key={index} 
    name={guest.name} 
    isConfirmed={guest.isConfirmed}
    isEditing={guest.isEditing}
    handleConfirmation={() => props.tuggleConfirmationAt(index)}
    handleToggleEditing={() => props.tuggleEditingAt(index)} />
   )}
</ul>;

GuestList.propTypes = {
  guests: PropTypes.array.isRequired,
  tuggleConfirmationAt: PropTypes.func.isRequired,
  tuggleEditingAt: PropTypes.func.isRequired
}

export default GuestList;