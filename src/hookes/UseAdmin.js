import { useEffect, useState } from "react"

const useAdmin = user => {
    const [admin, setAdmin] = useState(false);
    const [adminLoading, setAdminLoading] = useState(true)

    useEffect(() => {
        const email = user?.email;
        if (email) {
            fetch(`https://limitless-depths-18541.herokuapp.com/admin/${email}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
            })
                .then(res => res.json())
                .then(data => {
                    setAdminLoading(false)
                    setAdmin(data.admin);
                })
        }
    }, [user])
    return [admin, adminLoading]
}

export default useAdmin;