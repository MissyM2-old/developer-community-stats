import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../Layouts/Layout';
import DeveloperCard from '../DeveloperCard'


function StatOverview() {

  
/*     console.log('StatOverview', props); */
    return (
      <section>
          <div>Number of users per country</div>
          <div>data goes here</div>
          <div>Total number of contributors</div>
          <div>data goes here</div>
          <div>Highest contributors (Top 10) based on Pr and issues worked on</div>
          <div>data goes here</div>
          <div>graph showing number of contributors per day</div>
          <div>graph goes here</div>
          <div>number of users joined per day</div>
          <div>data goes here</div>
      </section>
    )
  }

export default StatOverview

