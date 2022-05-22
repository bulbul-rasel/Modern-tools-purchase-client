import React from 'react';
import BusinessInfoCard from './BusinessInfoCard';
import world from '../assets/world.png'
import user from '../assets/user.png'
import reaction from '../assets/reaction.png'
import project from '../assets/project.png'

const BusinessSummery = () => {
    return (
        <div>
            <h3 className='text-center text-secondary text-5xl font-extrabold font-sans pb-20'>Millions Business Trust us</h3>
            <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5'>
                <BusinessInfoCard bgClass='bg-primary' cardTitle="72" cardDes="Countries" img={world}></BusinessInfoCard>
                <BusinessInfoCard bgClass='bg-accent' cardTitle="535+" cardDes="Complete Project" img={project}></BusinessInfoCard>
                <BusinessInfoCard bgClass='bg-primary' cardTitle="273+" cardDes="Happy Clients" img={user}></BusinessInfoCard>
                <BusinessInfoCard bgClass='bg-accent' cardTitle="432+" cardDes="Feedbacks" img={reaction}></BusinessInfoCard>

            </div>
        </div>
    );
};

export default BusinessSummery;