import React, {Component, useState} from 'react';
import Select from "react-select";


import PropTypes from "prop-types";

class Customer extends Component {
    render() {
      
      return (
        <form>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="fname">First Name</label>
              <input type="fname" class="form-control" id="fname" placeholder="First Name"/>
            </div>
            <div class="form-group col-md-6">
              <label for="lname">Last Name</label>
              <input type="lname" class="form-control" id="lname" placeholder="Last Name"/>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="phone">Phone Number</label>
              <input type="phone" class="form-control" id="phone" placeholder="999-990-0090"/>
            </div>
            <div class="form-group col-md-4">
              <label for="email">Email</label>
              <input type="email" class="form-control" id="email" placeholder="jane@yahoo.com"/>
            </div>
            <div class="form-group col-md-4">
              <label for="instagram">Instagram</label>
              <input type="instagram" class="form-control" id="instagram" placeholder="@fit_preps"/>
            </div>
          </div>
          <div class="form-group">
            <label for="address">Street Address</label>
            <input type="text" class="form-control" id="adress" placeholder="1234 Main St"/>
          </div>
          
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="city">City</label>
              <input type="text" class="form-control" id="city"/>
            </div>
            <div class="form-group col-md-4">
              <label for="state">State</label>
              <Select id="inputState" class="form-control"
                  closeMenuOnSelect={false}
                  options={null}
                  hideSelectedOptions={false}
                  backspaceRemovesValue={false}
                  placeholder="Select a state"
                  />
             
            </div>
            <div class="form-group col-md-2">
              <label for="inputZip">Zip</label>
              <input type="text" class="form-control" id="inputZip"/>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="height">Height</label>
              <input type="height" class="form-control" id="height" placeholder="6 foot 7"/>
            </div>
            <div class="form-group col-md-6">
              <label for="weight">Weight</label>
              <input type="weight" class="form-control" id="weight" placeholder="186.9"/>
            </div>
          </div>
          <div class="form-group">
              <label for="allergies">Allergies</label>
              <textarea class="form-control" id="allergies" rows="3"></textarea>
            </div>
          <button type="submit" class="btn btn-primary">Save</button>
        </form>
      )
    }
   }
    
export default Customer
   
