import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const withAuth = (WrappedComponent, permittedUser) => {
    return (props) => {
        const [isAuthorized, setIsAuthorized] = useState(false);

        useEffect(() => {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const token = userInfo ? userInfo.token : null;
            const userType = userInfo ? userInfo.userType : null;
            const userEmail = userInfo ? userInfo.email : null;

            if (token && userType === permittedUser || userType === 'admin') {
                try {
                    const decoded = jwtDecode(token);
                    const currentTime = Date.now() / 1000;

                    if (decoded.exp > currentTime) {
                        setIsAuthorized(true);
                    } else {
                        alert('Token is expired');
                    }
                } catch (err) {
                    alert('Invalid token');
                }
            } else {
                alert('Unauthorized access');
            }
        }, []);

        return isAuthorized ? <WrappedComponent {...props} /> : null;
    };
};

export default withAuth;