import React from 'react';
import Footer from '../components/Footer';
import Banner from './Banner';
import BusinessSummery from './BusinessSummery';

const Home = () => {
    return (
        <div className=''>
            <Banner />
            <BusinessSummery />
            <Footer />
        </div>
    );
};

export default Home;