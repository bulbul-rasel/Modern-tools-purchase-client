import React from 'react';

const MyPortfolio = () => {
    return (
        <div className=''>
            <div class="hero min-h-screen bg-base-200">
                <div class="hero-content flex-col lg:flex-row">
                    <div class="avatar">
                        <div class="  w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src="https://i.ibb.co/T2fNDQK/217878g.jpg" />
                        </div>
                    </div>
                    <div>
                        <h1 class="text-5xl font-bold text-primary">Bulbul Ahammed</h1>
                        <h1 class="text-2xl font-bold text text-secondary">rasel.bulbul7@gmail.com</h1>
                        <h1 class=" text-xl font-bold text text-secondary">BSc in CSE at American International University-Bangladesh</h1>
                        <h1 class="text-xl font-bold text-primary">Skills:</h1>
                        <ul className='text-bold text-primary'>
                            <li>▪ReactJs</li>
                            <li>▪NodeJs</li>
                            <li>▪ExpressJs</li>
                            <li>▪mongoDb</li>
                            <li>▪Tailwind</li>
                            <li>▪Bootstrap</li>
                            <li>▪C</li>
                            <li>▪C++</li>

                        </ul>
                        <h1 class="text-xl font-bold text-primary">Projects:</h1>
                        <span className='ps-10 text-primary font-semibold justify-items-center '><a href='https://modern-tools.web.app/'> <h2 className='test-primary'>Live Link: Tools Purchase Management</h2></a></span>
                        <span className='ps-10 text-primary font-semibold justify-items-center '><a href='https://modern-telecom-client.web.app/ '> <h2 className='test-primary'>Live Link: Telecom warehouse Management</h2></a></span>
                        <span className='ps-10 text-primary font-semibold justify-items-center '><a href='https://dental-service-fa5d0.web.app/ '> <h2 className='test-primary'>Live Link: Dental Management</h2></a></span>

                    </div>
                </div>
            </div>


        </div>
    );
};

export default MyPortfolio;