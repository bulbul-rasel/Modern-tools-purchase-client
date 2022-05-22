import React from 'react';
import Footer from '../components/Footer';
import Products from '../pages/Products/Products';
import Banner from './Banner';
import BusinessSummery from './BusinessSummery';

const Home = () => {
    return (
        <div className=''>
            <Banner />
            <Products />
            <BusinessSummery />
            <Footer />
        </div>
    );
};

export default Home;