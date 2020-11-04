import React, { useState } from 'react'
import { Link } from 'gatsby'
import 'flag-icon-css/css/flag-icon.min.css'
import SEO from '../components/seo'
import Layout from '../components/Layouts/Layout';
import StatOverview from '../components/StatOverview';
import DevOverview from '../components/DevOverview';

const DeveloperCommunityHome = () => {
  const [isStatOverview, setIsStatOverview] = useState(false);

  const handleToggleClick = () => {
    console.log('made it to handleToggleClick')
    setIsStatOverview(!isStatOverview);
  }

  return (
    <Layout>
      <SEO
        url="/"
        title="Developer Community Stats"
        description="A repository to encourage beginners to contribute to open source and for all contributors to view their Github stats."
        keywords={[
          `GithubStats`,
          `github`,
          `stats`,
          `developer`,
          `community`,
        ]}
      />
        <div>
        <button onClick={handleToggleClick}>{isStatOverview ? 'Stat overview' : 'Developer Overiew'} </button>
      </div>
       {isStatOverview 
        ? <StatOverview />
        : <DevOverview />}
        
    </Layout>
  )
}

export default DeveloperCommunityHome
