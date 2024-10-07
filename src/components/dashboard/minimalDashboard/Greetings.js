import React from 'react';
import { Card } from 'reactstrap';
import greetingData from '../../../data/greetings/greetingData';


const Greetings = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    // Get the current hour
    const currentHour = new Date().getHours();

    // Determine the appropriate greeting based on the current time
    const greeting = (() => {
        if (currentHour < 12) {
            return greetingData[0]; // Good Morning
        }
        if (currentHour < 18) {
            return greetingData[1]; // Good Afternoon
        }
        if (currentHour < 22) {
            return greetingData[2]; // Good Evening
        }
        return greetingData[3]; // Good Night
    })();

    return (
        <Card className="text-center" style={{ backgroundImage: `url(${greeting.imgSrc})`, height: '150px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'  }}>
            <div className="overlay">
                <div className="p-4 text-start text-white mb-0">
                    <h5 className='heading-sm'>Welcome back! {user?.full_name}</h5>
                    <h5 className='heading-md fw-semibold'>{greeting.title}</h5>
                    <p>{greeting.quote}</p>
                </div>
            </div>
        </Card>
    );
};

export default Greetings;
